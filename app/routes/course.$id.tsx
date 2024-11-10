import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import { db } from "~/config/firebase";
import { supabase } from "~/config/supabase";
import PageLayouts from "~/layouts/PageLayouts";
import { getSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uid = session.get("uid");
  const id = params.id;

  if (!uid) {
    return redirect("/login");
  }

  return json({ uid, id });
};

const course = () => {
  const [userData, setUserData] = useState<any>(null);
  const [course, setCourse] = useState<any>();
  const [loading, setLoading] = useState(true);
  const user = useLoaderData<{ uid: string; id: number }>();

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("id", user.id);

        if (error) {
          throw error;
        }
        console.log(data[0]);

        setCourse(data[0]);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
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
      <section className="container py-8">
        <img
          src={course?.gambar}
          className="max-w-2xl mx-auto aspect-video rounded-t-2xl object-cover w-full bg-gray-300"
          draggable="false"
          alt=""
        />
        <article className="max-w-3xl w-full mx-auto border rounded-2xl p-4 space-y-4 ">
          <div className="flex md:flex-row flex-col-reverse space-y-2 justify-between">
            <main className="max-w-xl w-full space-y-4">
              <p className="font-semibold">
                Peserta pelatihan mampu membuat Data Analys menggunakan Adobe
                Photoshop menunjukkan minimal 60 persen dengan menunjukkan
                penguasaan materi pada saat unjuk keterampilan Deskripsi Peserta
                Aktivitas Penyelenggaran
              </p>
              <h2 className="font-semibold">Penjelasan</h2>

              <p className="text-gray-500 text-sm">
                Peserta pelatihan mampu membuat Data Analys menggunakan Adobe
                Photoshop menunjukkan minimal 60 persen dengan menunjukkan
                penguasaan materi pada saat unjuk keterampilan Deskripsi Peserta
                Aktivitas Penyelenggaran
              </p>
            </main>
            <div className="flex justify-end gap-2 ">
              <Button variant="default" width="w-fit" type="button">
                {course?.jumlah_pertemuan} Pertemuan
              </Button>
            </div>
          </div>
          <div className="space-y-4 flex flex-col">
            <Link to={"/payment"}>
              <Button type="button" width="w-full" variant="default">
                Ikuti Kursus + Sertifikasi
              </Button>
            </Link>
            <Link to={"/payment"}>
              <Button type="button" width="w-full" variant="primary-outline">
                Ikuti Kursus + Sertifikasi
              </Button>
            </Link>
          </div>
        </article>
      </section>
    </PageLayouts>
  );
};

export default course;
