import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "~/components/Button";

interface Course {
  id: string;
  name: string;
  jumlah_pertemuan: number;
  harga: number;
  gambar: string;
}

const Admin: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState("");
  const [jumlahPertemuan, setJumlahPertemuan] = useState<number | "">("");
  const [harga, setHarga] = useState<number | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Fetch courses from Supabase
  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      console.error("Error fetching courses:", error);
    } else {
      setCourses(data as Course[]);
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `course_images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("course_images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const { data: publicData } = supabase.storage
      .from("course_images")
      .getPublicUrl(filePath);

    return publicData?.publicUrl || null;
  };

  // Add a new course to Supabase
  const addCourse = async () => {
    if (!imageFile) {
      alert("Please select an image file!");
      return;
    }

    const imageUrl = await uploadImage(imageFile);
    if (!imageUrl) {
      alert("Failed to upload image.");
      return;
    }

    const { error } = await supabase
      .from("courses")
      .insert([
        { name, jumlah_pertemuan: jumlahPertemuan, harga, gambar: imageUrl },
      ]);

    if (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
    } else {
      fetchCourses();
      setName("");
      setJumlahPertemuan("");
      setHarga("");
      setImageFile(null);
    }
  };

  // Update course
  const updateCourse = async () => {
    if (!editingCourse) return;

    const imageUrl = imageFile
      ? await uploadImage(imageFile)
      : editingCourse.gambar;

    const { error } = await supabase
      .from("courses")
      .update({
        name,
        jumlah_pertemuan: jumlahPertemuan,
        harga,
        gambar: imageUrl,
      })
      .eq("id", editingCourse.id);

    if (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    } else {
      fetchCourses();
      setEditingCourse(null);
      setName("");
      setJumlahPertemuan("");
      setHarga("");
      setImageFile(null);
    }
  };

  // Delete course
  const deleteCourse = async (id: string) => {
    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    } else {
      fetchCourses();
    }
  };

  // Edit course (pre-fill the form for editing)
  const editCourse = (course: Course) => {
    setEditingCourse(course);
    setName(course.name);
    setJumlahPertemuan(course.jumlah_pertemuan);
    setHarga(course.harga);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className=" mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Admin Panel
      </h1>

      <div className="bg-white max-w-md mx-auto shadow-md rounded-lg p-6 mb-8">
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Jumlah Pertemuan"
          value={jumlahPertemuan}
          onChange={(e) => setJumlahPertemuan(Number(e.target.value))}
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(Number(e.target.value))}
        />
        <input
          className="w-full p-3 mb-4"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files ? e.target.files[0] : null)
          }
        />
        <button
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={editingCourse ? updateCourse : addCourse}
        >
          {editingCourse ? "Update Course" : "Add Course"}
        </button>
      </div>

      <div>
        <section className="container">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Courses List
          </h2>
          <div className="grid grid-cols-5 gap-4 grid-rows-1 ">
            {courses.map((course) => (
                <>
                 <div className="p-4 rounded-xl border space-y-1">
                 <img
                   src={course.gambar}
                   className="bg-gray-400 w-full object-cover rounded-xl aspect-square"
                   alt={name}
                   />
                 <div className="flex justify-between items-center">
                   <small>{course.jumlah_pertemuan} Pertemuan</small>
                   <small className="flex gap-2 items-center">
                     Bersertifikasi{" "}
                     <Icon icon={"grommet-icons:validate"} className="text-primary" />
                   </small>
                 </div>
                 <p className="font-semibold line-clamp-1">
                   {name}
                 </p>
                 <p className="text-primary">Rp.{course.harga}</p>
                 <div className="flex gap-2">
                  <button
                    onClick={() => editCourse(course)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                    Delete
                  </button>
                </div>
               </div>
             
            </>
            ))}
          </div>
        </section>
        </div>
        </div>
  );
};

export default Admin;
