import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Button from "~/components/Button";
import CourseCard from "~/components/CourseCard";
import { dummyCourse } from "~/data/dummy";
import PageLayouts from "~/layouts/PageLayouts";

const course = () => {
  return (
    <PageLayouts>
      <section
        className="container space-y-4
      "
      >
        <h1 className="md:text-4xl text-xl text-center font-semibold ">
          Kursus
        </h1>
        <div className="flex items-center flex-col md:flex-row justify-start gap-4">
          <div className="relative flex items-center gap-2 py-2 px-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <Icon
              icon={"material-symbols:search"}
              className=" text-gray-400 text-2xl"
            />
            <input
              type="text"
              placeholder="Cari kursus"
              className="outline-none"
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
        <div></div>
      </section>
      <section className="container grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-4 py-8">
        {
          dummyCourse.map((item) => (
            <CourseCard
              key={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              pertemuan={item.pertemuan}
            />
          ))
        }
        
      </section>
  
    </PageLayouts>
  );
};

export default course;
