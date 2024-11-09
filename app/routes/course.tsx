import { Icon } from "@iconify/react/dist/iconify.js";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import CourseCard from "~/components/CourseCard";
import { db } from "~/config/firebase";
import { supabase } from "~/config/supabase";
import PageLayouts from "~/layouts/PageLayouts";
import { getSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uid = session.get("uid");

  if (!uid) {
    return redirect("/login");
  }

  return json({ uid });
};

const Course = () => {
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata pencarian
  const user = useLoaderData<{ uid: string }>();

  // Fetch data user dari Firestore
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

  // Fetch courses dari Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*");

        if (error) {
          throw error;
        }

        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter courses berdasarkan searchTerm
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="animate-bounce text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <PageLayouts userData={userData}>
      <section className="container space-y-4">
        <h1 className="md:text-4xl text-xl text-center font-semibold">Kursus</h1>
        <div className="flex items-center flex-col md:flex-row justify-start gap-4">
          <div className="relative flex items-center gap-2 py-2 px-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <Icon
              icon={"material-symbols:search"}
              className="text-gray-400 text-2xl"
            />
            <input
              type="text"
              placeholder="Cari kursus"
              className="outline-none"
              value={searchTerm}
              onChange={handleSearchChange} // Update searchTerm saat input berubah
            />
          </div>
          <div className="relative">
            <select className="pl-4 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none">
              <option>Paling Sesuai</option>
              <option>Terbaru</option>
              <option>Terpopuler</option>
            </select>
            <Icon
              icon={"mdi:chevron-up"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none"
            />
          </div>
        </div>
      </section>
      <section className="container py-8">
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-5 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                img={course.gambar}
                name={course.name}
                price={course.harga}
                pertemuan={course.jumlah_pertemuan}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>Kursus yg dicari tidak ada</p>
          </div>
        )}
      </section>
    </PageLayouts>
  );
};

export default Course;
