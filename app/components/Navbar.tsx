import LogoPutih from "../../public/logo-white.png";
import LogoBiru from "../../public/logo-blue.png";
import { FC } from "react";
import Button from "./Button";

const Navbar: FC<{ variant?: boolean }> = ({ variant= false }) => {
  const logo = variant ? LogoBiru : LogoPutih;
  return (
    <nav className="py-4 fixed top-0 w-full">
      <main className="container flex items-center justify-between text-primary">
        <img src={logo} className="w-32" draggable='false' alt="logo" />
        <div className="flex gap-4 items-center ">
            <p>Beranda</p>
            <p>Artikel</p>
            <p>Chatbot</p>
            <p>Profile</p>
            <Button width="w-fit" type="button" variant="default">Mulai Gratis</Button>
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
