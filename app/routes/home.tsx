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



const dashboard = () => {
  return (
    <PageLayouts>
      <SectionLayout title="Selamat datang, Uzman!">
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

export default dashboard;
