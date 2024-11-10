import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import { db } from "~/config/firebase";
import { supabase } from "~/config/supabase";
import PageLayouts from "~/layouts/PageLayouts";
import { getSession } from "~/utils/session.server";

import dsImage from "../assets/courseDS.png";
import NotificationCard from "~/components/NotificationCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import Hero from "../assets/hero2.png";
import { dummyClass } from "~/data/dummy";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uid = session.get("uid");

  if (!uid) {
    return redirect("/login");
  }

  return json({ uid });
};

const listCourse = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = useLoaderData<{ uid: string; id: number }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="animate-bounce text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <PageLayouts userData={userData}>
      <section className="container py-8 space-y-4">
        <h1 className="font-semibold text-2xl text-center">Notifikasi</h1>
        <main className="max-w-4xl mx-auto w-full p-4 grid grid-cols-1 gap-4 ">
          <div className=" w-full p-4 border-2 rounded-2xl gap-4  flex md:flex-row flex-col items-center">
            <img
              src={dsImage}
              className="max-w-40 w-full rounded-2xl "
              alt=""
            />
            <div className=" flex justify-between flex-col md:flex-row w-full items-center">
              <div className="md:space-y-4 space-y-2">
                <h1 className="text-xl font-semibold">
                  Data Analysis with Python
                </h1>
                <p>8 Pertemuan</p>
              </div>
              <Button type="button" variant="primary-outline" width="w-fit">
                {" "}
                <p className="flex gap-2 items-center">
                  Bersertifikasi{" "}
                  <Icon
                    icon={"grommet-icons:validate"}
                    className="text-primary group-hover:text-white"
                  />
                </p>
              </Button>
            </div>
          </div>
          <img src={Hero} draggable={false} alt="" />
          <div className="grid grid-cols-1 max-w-2xl w-full gap-4 mx-auto">
            {dummyClass.map((item, index) => (
                <Link to={'/course/materi'}>
              <div
                key={index}
                className="w-full hover:shadow-lg duration-300 ease-in-out hover:cursor-pointer flex md:flex-row flex-col items-center border-2 rounded-2xl p-4 gap-2"
                >
                <img src={item.img} className="max-w-20" alt="" />
                <div className="flex items-center flex-col md:flex-row justify-between w-full">
                  <h1 className="font-semibold  max-w-96 ">{item.title}</h1>
                  <div className="text-primary flex items-center  gap-1 justify-between">
                    <Icon icon={"mdi:clock"} />
                    <p>{item.duration}</p>
                  </div>
                </div>
              </div>
                  </Link>
            ))}
          </div>
        </main>
      </section>
    </PageLayouts>
  );
};

export default listCourse;
