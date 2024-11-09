import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/config/firebase";
import PageLayouts from "~/layouts/PageLayouts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import FeatureCard from "~/components/FeatureCard";
import SectionLayout from "~/layouts/SectionLayout";
import TestimonialaCard from "~/components/TestimonialaCard";
import CarouselContent from "../assets/carousel_content.png";
import { dataFeature, testimonial } from "~/data/dummy";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uid = session.get("uid");

  if (!uid) {
    return redirect("/login");
  }

  return json({ uid });
};
const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  const user = useLoaderData<{ uid: string }>();

  console.log(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = user?.uid;
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No such user data!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="animate-bounce text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <PageLayouts userData={userData}>
      <SectionLayout title={`Selamat datang, ${userData?.name || "Uzman"}!`}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={32}
          slidesPerView={1}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="w-full aspect-[5/2] overflow-hidden rounded md:rounded-3xl">
                <img
                  src={CarouselContent}
                  alt="content"
                  className="size-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SectionLayout>
      <SectionLayout title="Temukan apa yang kamu cari!">
        <main className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 md:gap-4 gap-2 w-full">
          {dataFeature.map((item) => (
            <FeatureCard
              key={item.title}
              img={item.img}
              title={item.title}
              description={item.description}
              slot={item.slot}
              link={item.route}
            />
          ))}
        </main>
      </SectionLayout>
      <SectionLayout title="Kata mereka tentang Skill Up!">
        <Swiper
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={32}
        >
          {testimonial.map((item) => (
            <SwiperSlide className="lg:py-8 md:py-4 py-2" key={item.name}>
              <TestimonialaCard
                nama={item.name}
                content={item.content}
                role={item.role}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SectionLayout>
    </PageLayouts>
  );
};

export default Dashboard;
