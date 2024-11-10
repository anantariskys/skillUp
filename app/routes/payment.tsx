import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import { db } from "~/config/firebase";
import { supabase } from "~/config/supabase";
import PageLayouts from "~/layouts/PageLayouts";
import { getSession } from "~/utils/session.server";

import gopayImg from "~/assets/gopay.png";
import bcaImg from "../assets/bca.png";
import mandiriImg from "~/assets/mandiri.png";
import jagoImg from "~/assets/jago.png";
import ovoImg from "~/assets/ovo.png";
import PaymentDetails from "~/components/PaymentDetails";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uid = session.get("uid");

  if (!uid) {
    return redirect("/login");
  }

  return json({ uid });
};

const payment = () => {
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
      <main className="container py-8">
        <div className="max-w-3xl w-full mx-auto space-y-4">
          <Button onClick={handleBack} variant="default" type="button" width="w-fit">
            Kembali
          </Button>
          <main className="border rounded-2xl p-4 space-y-4 ">
            <h1 className="font-semibold">Pembayaran</h1>
            <div className="flex justify-between items-center">
              <p>Jumlah Transaksi</p>
              <p className="text-primary font-semibold">Rp. 150.000</p>
            </div>
            <hr className="border" />
            <h1 className="">Metode Pembayaran</h1>
            <div className="flex justify-between items-center">
              <label
                htmlFor="gopay"
                className="flex items-center gap-3 font-semibold"
              >
                <img
                  src={gopayImg}
                  className="w-16"
                  draggable={false}
                  alt="Gopay"
                />
                Gopay
              </label>
              <input
                type="radio"
                name="paymentMethod"
                id="gopay"
                className="w-6 h-6"
              />
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="mandiri"
                className="flex items-center gap-3 font-semibold"
              >
                <img
                  src={mandiriImg}
                  className="w-16"
                  draggable={false}
                  alt="Bank Mandiri"
                />
                Bank Mandiri
              </label>
              <input
                type="radio"
                name="paymentMethod"
                id="mandiri"
                className="w-6 h-6"
              />
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="bca"
                className="flex items-center gap-3 font-semibold"
              >
                <img
                  src={bcaImg}
                  className="w-16"
                  draggable={false}
                  alt="Bank BCA"
                />
                Bank BCA
              </label>
              <input
                type="radio"
                name="paymentMethod"
                id="bca"
                className="w-6 h-6"
              />
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="ovo"
                className="flex items-center gap-3 font-semibold"
              >
                <img
                  src={ovoImg}
                  className="w-16"
                  draggable={false}
                  alt="OVO"
                />
                OVO
              </label>
              <input
                type="radio"
                name="paymentMethod"
                id="ovo"
                className="w-6 h-6"
              />
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="jago"
                className="flex items-center gap-3 font-semibold"
              >
                <img
                  src={jagoImg}
                  className="w-16"
                  draggable={false}
                  alt="Bank Jago"
                />
                Bank Jago
              </label>
              <input
                type="radio"
                name="paymentMethod"
                id="jago"
                className="w-6 h-6"
              />
            </div>
            <PaymentDetails/>
            <div className="flex justify-end">
                <Button variant="default" width="w-fit" type="button">Bayar</Button>

            </div>
          </main>
        </div>
      </main>
    </PageLayouts>
  );
};

export default payment;
