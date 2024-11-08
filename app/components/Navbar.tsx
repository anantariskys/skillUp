import LogoPutih from "../../public/logo-white.png";
import LogoBiru from "../../public/logo-blue.png";
import { FC } from "react";
import Button from "./Button";
import { Link } from "@remix-run/react";

const Navbar: FC<{ variant?: boolean ,position?: string}> = ({ variant= false,position='fixed' }) => {
  const logo = variant ? LogoBiru : LogoPutih;
  return (
    <nav className={`py-4 ${position} top-0 w-full`}>
      <main className="container flex items-center justify-between text-primary">
        <img src={logo} className="w-32" draggable='false' alt="logo" />
        <div className="hidden md:flex gap-4 items-center ">
            <p>Beranda</p>
            <p>Artikel</p>
            <p>Chatbot</p>
            <p>Profile</p>
            <Link to={'/login'}>
            <Button width="w-fit" type="button" variant="default">Mulai Gratis</Button>
            </Link>
            <p>Uzman</p>
        </div>
        
      </main>
    </nav>
  );
};

export default Navbar;
