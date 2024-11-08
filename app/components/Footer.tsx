import React from "react";
import Button from "./Button";
import Logo from '../../public/logo-white.png';
const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-14">
      <main className="container space-y-4">
        <img src={Logo} className="w-44" alt="logo" />
        <section className="flex md:flex-row flex-col justify-between">
          <div className="max-w-sm">
            <p>
              Skill UP adalah platform pengembangan diri global yang
              memungkinkan siapa saja untuk belajar, berbagi, menemukan, dan
              mengikuti kursus atau acara yang memperkaya pengetahuan dan
              keterampilan mereka.
            </p>
          </div>
          <div className="flex md:flex-row flex-col gap-4 md:gap-8 lg:gap-16">
            <div className="space-y-2">
              <h5 className="font-semibold text-xl">Layanan</h5>
              <div className="">
                <p>Loker</p>
                <p>Mentoring</p>
                <p>Kursus</p>
                <p>Magang</p>
                <p>Beasiswa</p>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-xl">Skill Up</h5>
              <div className="">
                <p>Tentang Kami</p>
                <p>Profile</p>
                <p>Kontak Kami</p>
                <p>Bantuan</p>
                <p>Kebijakan Privasi</p>
              </div>
            </div>
            <div className="space-y-2 max-w-sm">
              <h5 className="font-semibold text-xl">Tetap ikuti perkembangannya</h5>
              <div className=" space-y-4">
                <p className="text-balance">Bergabunglah dengan milis kami untuk mendapatkan informasi terbaru tentang kursus dan acara pengembangan diri kami.</p>
                <form className="bg-white p-2 rounded-lg flex md:flex-row flex-col gap-2">
                  <input type="text" placeholder="enter your email address" className="text-black px-2" name="" id="" />
                  <button className="bg-primary text-white px-4 rounded-lg  py-2">Subcribe Now</button>


                </form>
       
              </div>
            </div>
            <div>
              
            </div>
          </div>
        </section>
        <section className="flex justify-center border-t py-4" >
          <small className="mx-auto">Copyright © 2024 Skill Up</small>
        </section>
      </main>
    </footer>
  );
};

export default Footer;
