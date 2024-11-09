import LogoPutih from "../../public/logo-white.png";
import LogoBiru from "../../public/logo-blue.png";
import { FC, useState } from "react";
import Button from "./Button";
import { Link, Form } from "@remix-run/react";

const Navbar: FC<{
  variant?: boolean;
  position?: string;
  userData?: { name: string };
}> = ({ variant = false, position = "fixed", userData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const logo = variant ? LogoBiru : LogoPutih;

  return (
    <nav className={`py-4 ${position} top-0 w-full`}>
      <main className="container flex items-center justify-between text-primary">
        <Link to={'/'}>
        <img src={logo} className="w-32" draggable="false" alt="logo" />
        </Link>
        <div className="hidden md:flex gap-4 items-center ">
          <Link to={'/home'}>Beranda</Link>
          <p>Artikel</p>
          <p>Chatbot</p>
          <p>Profile</p>
          {userData ? (
            <div className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src="https://avatar.iran.liara.run/public"
                  className="w-12 aspect-square"
                  alt="User Avatar"
                />
                <p>{userData.name}</p>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                  <Form method="post" action="/api/logout">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </Form>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/home"}>
              <Button width="w-fit" type="button" variant="default">
                Mulai Gratis
              </Button>
            </Link>
          )}
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
