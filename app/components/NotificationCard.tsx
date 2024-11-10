import React from "react";
import dsImage from '../assets/ds.png';
import Button from "./Button";
import { Link } from "@remix-run/react";
const NotificationCard = () => {
  return (
    <div className=" w-full p-4 border-2 rounded-2xl gap-4  flex md:flex-row flex-col items-center">
      <img src={dsImage} className="max-w-40 w-full rounded-2xl " alt="" />
      <div className=" flex md:flex-row flex-col justify-between space-y-2 w-full md:items-center">
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">Pembayaran Berhasil</h1>
          <p>Kamu bisa mulai kursus kamu sekarang!</p>
        </div>
        <Link
        to={'/course/list'}
        >

        <Button type="button" variant="default" width="w-fit">
          Mulai
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotificationCard;
