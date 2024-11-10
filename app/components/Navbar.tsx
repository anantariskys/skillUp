import LogoPutih from "../../public/logo-white.png";
import LogoBiru from "../../public/logo-blue.png";
import { FC, useState } from "react";
import Button from "./Button";
import { Link, Form } from "@remix-run/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar: FC<{
  variant?: boolean;
  position?: string;
  userData?: { name: string };
}> = ({ variant = false, position = "fixed", userData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const logo = variant ? LogoBiru : LogoPutih;

  return (
    <nav className={`py-4 top-0 w-full ${position}`}>
      <main className="container flex items-center justify-between text-primary">
        <Link to={'/'}>
          <img src={logo} className="w-32" draggable="false" alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to={'/home'}>Beranda</Link>
          <p>Artikel</p>
          <p>Chatbot</p>
          <p>Profile</p>
          {userData ? (
            <>
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
              <Link to={'/notification'}>
                <div className="p-1 rounded-full border">
                  <Icon icon={'mingcute:notification-line'} className="text-2xl text-primary" />
                </div>
              </Link>
            </>
          ) : (
            <Link to={"/home"}>
              <Button width="w-fit" type="button" variant="default">
                Mulai Gratis
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          <Icon icon={menuOpen ? 'mingcute:close-line' : 'mingcute:menu-line'} className="text-3xl" />
        </button>
      </main>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col items-start p-4 gap-4">
            <Link to={'/home'} onClick={toggleMenu}>Beranda</Link>
            <p onClick={toggleMenu}>Artikel</p>
            <p onClick={toggleMenu}>Chatbot</p>
            <p onClick={toggleMenu}>Profile</p>
            {userData ? (
              <>
                <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropdown}>
                  <img
                    src="https://avatar.iran.liara.run/public"
                    className="w-10 aspect-square"
                    alt="User Avatar"
                  />
                  <p>{userData.name}</p>
                </div>
                {dropdownOpen && (
                  <div className="mt-2 w-full bg-white border rounded shadow-lg">
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
                <Link to={'/notification'}>
                  <div className="p-1 rounded-full border">
                    <Icon icon={'mingcute:notification-line'} className="text-2xl text-primary" />
                  </div>
                </Link>
              </>
            ) : (
              <Link to={"/home"} onClick={toggleMenu}>
                <Button width="w-full" type="button" variant="default">
                  Mulai Gratis
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
