import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import { db } from "~/config/firebase";
import { supabase } from "~/config/supabase";
import PageLayouts from "~/layouts/PageLayouts";
import { getSession } from "~/utils/session.server";


import dsImage from '../assets/ds.png';
import NotificationCard from "~/components/NotificationCard";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uid = session.get("uid");

  if (!uid) {
    return redirect("/login");
  }

  return json({ uid });
};

const notification = () => {
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
           <NotificationCard/>
        </main>
      
      </section>
    </PageLayouts>
  );
};

export default notification;
