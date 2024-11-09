import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import HeroImage from '../assets/hero.png';
import Button from "~/components/Button";
import Roket from '../assets/rocket.png';
import Lampu from '../assets/lamp.png';
export const meta: MetaFunction = () => {
  return [
    { title: "SkillUp!" },
  ];
};


export default function Index() {
  return (
    <div className="md:h-screen md:py-0 py-10 ">
      <Navbar variant/>
      <main className="container h-full w-full flex md:flex-row flex-col-reverse items-center justify-between ">
        <div className="md:w-1/2 space-y-5">
          <h3 className="text-primary font-semibold text-2xl">Tingkatkan Karier dan Keahlian Kamu!</h3>
          <h1 className="text-6xl font-bold">Skill Up!</h1>
          <p className="text-xl">Kami hadir sebagai platform lengkap untuk mengembangkan diri dan meraih kesempatan baru. </p>
          <div className="flex gap-4">
            <Button width="w-fit" type="button" variant="default">Play Store</Button>
            <Button width="w-fit" type="button" variant="primary-outline">Goggle Play</Button>
          </div>
          <div className="flex md:flex-row flex-col gap-4 ">
            <div className="flex bg-[#F3F0F0] p-2 items-center rounded-xl">
              <img src={Lampu} className="w-32 object-contain" alt="" />
              <div>
                <h3 className=" font-semibold">Solusi Karir</h3>
                <p className="text-sm">Temukan pekerjaan dan kesempatan yang sesuai dengan minat dan keahlian Anda.</p>
              </div>
            </div>
            <div className="flex bg-[#4073F8] bg-opacity-15 p-2 items-center rounded-xl">
              <img src={Roket} className="w-32 object-contain p-5" alt="" />
              <div>
                <h3 className=" font-semibold">Pengembangan diri</h3>
                <p className="text-sm">Ikuti kursus dan program yang dirancang untuk meningkatkan kompetensi Anda.</p>
              </div>
            </div>
          </div>

        </div>
        <div className="md:w-1/2   ">
        <img src={HeroImage} className="w-full "  alt="hero-img" draggable='false' />

        </div>

      </main>
    
    </div>
  );
}


