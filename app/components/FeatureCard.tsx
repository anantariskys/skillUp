import { Link } from "@remix-run/react";
import React, { FC } from "react";

const FeatureCard:FC<{img:string, title:string ,description:string,slot?:number,link?:string}> = ({img, title ,description,slot,link='/home'}) => {
  return (
    <Link to={link}>
    <div className=" p-6 border shadow-2xl rounded-xl space-y-2">
      <div className="w-full flex flex-col py-4 text-white justify-center items-center rounded-xl bg-primary">
        <img src={img} alt={title} className="w-24 aspect-square object-contain" draggable="false" />
        <p className="font-semibold text-lg">{title}</p>
      </div>
      <p className="text-lg font-semibold">{description}</p>
      <small className="text-gray-500 font-semibold">
        {slot} Lowongan Tersedia
      </small>
    </div>
    </Link>
  );
};

export default FeatureCard;
