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
        <main className="max-w-3xl mx-auto w-full p-4  space-y-4 border-2 rounded-2xl ">
          <h1 className="text-2xl font-semibold text-center">Pertemuan 1</h1>
          <h5 className="text-lg font-semibold text-center">
            Pengenalan Python untuk Analisis Data
          </h5>
          <iframe
            src="https://www.youtube.com/embed/tfruzm-HK1Q?si=u45YeAW5V9WDLCjH"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
            className="w-full aspect-video rounded-2xl"
          ></iframe>
          <p>
            Untuk mendukung kerja dengan Python, kita akan menggunakan Jupyter
            Notebook, yaitu alat interaktif yang memungkinkan pengguna untuk
            menulis dan menjalankan kode dengan mudah, serta mencatat hasil
            analisis secara langsung. Selain itu, Integrated Development
            Environments (IDE) lainnya, seperti PyCharm dan Visual Studio Code,
            juga bisa digunakan jika dibutuhkan fitur-fitur tambahan untuk
            proyek yang lebih besar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4">
            <div className="space-y-2 p-4">
              <p className="w-fit bg-[#B2C8FF] py-2 px-4 rounded-2xl">
                my_list = [1, 2, 3]
              </p>
              <p className="text-sm">
                Di Python, terdapat beberapa tipe data dasar yang perlu dipahami
                dalam analisis data. List adalah tipe data yang dapat menyimpan
                beberapa nilai dalam urutan tertentu dan dapat diubah (mutable),
                misalnya
              </p>
            </div>
            <div className="space-y-2 p-4">
              <p className="w-fit bg-[#B2C8FF] py-2 px-4 rounded-2xl">
                my_dict = {"{"}'a': 1, 'b': 2{"}"}
              </p>
              <p className="text-sm">
                Dictionary adalah tipe data yang menyimpan data dalam bentuk
                pasangan kunci-nilai, seperti
              </p>
            </div>
            <div className="space-y-2 p-4">
              <p className="w-fit bg-[#B2C8FF] py-2 px-4 rounded-2xl">
                my_tuple = (1, 2, 3)
              </p>
              <p className="text-sm">
                Tuple mirip dengan list namun tidak dapat diubah (immutable),
                contohnya
              </p>
            </div>
            <div className="space-y-2 p-4">
              <p className="w-fit bg-[#B2C8FF] py-2 px-4 rounded-2xl">
                my_set = {"{"}1, 2, 3{"}"}
              </p>
              <p className="text-sm">
                Set adalah koleksi yang tidak berurutan dan tidak memiliki
                elemen duplikat, misalnya
              </p>
            </div>
          </div>
        </main>
        <div className="flex justify-center">
          <Button type="submit" variant="default" width="w-fit">
            Selesai
          </Button>
        </div>
      </section>
    </PageLayouts>
  );
};

export default listCourse;
