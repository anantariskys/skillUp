import React from "react";
import Image from "../assets/heroImage.png";
import logo from "../../public/logo-white.png";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import Button from "~/components/Button";
const login = () => {
  return (
    <div className="relative">
      <nav className={`py-4 fixed z-10 bg-primary top-0 w-full`}>
        <main className="container flex items-center justify-between text-primary">
          <img src={logo} className="w-32" draggable="false" alt="logo" />
        </main>
      </nav>
      <main className="h-screen container  flex ">
        <section className="md:w-1/2 flex flex-col items-center justify-center">
          <form action="" className="max-w-md w-full space-y-4 ">
            <h1 className="md:text-4xl text-xl font-semibold text-center">Masuk</h1>
            <div className="flex flex-col md:space-y-1">
              <label
                htmlFor=""
                className="flex gap-1 items-center font-semibold text-lg"
              >
                <Icon icon={"ic:baseline-email"} />
                Email
              </label>
              <input
                type="text"
                className="p-2 border-2 rounded-md "
                placeholder="Masukkan alamat email Anda"
              />
            </div>
            <div className="flex flex-col md:space-y-1">
              <label
                htmlFor=""
                className="flex gap-1 items-center font-semibold text-lg"
              >
                <Icon icon={"material-symbols:lock"} />
                Kata Sandi
              </label>
              <input
                type="password"
                className="p-2 border-2 rounded-md "
                placeholder="Masukkan alamat email Anda"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <input type="checkbox" name="" id="" />
                <small>Ingat saya</small>
              </div>
              <Link to={"/login"} className="text-primary">
                Lupa kata sandi?
              </Link>
            </div>
            <Button width="w-full" type="submit" variant="default">
              Masuk
            </Button>
            <p className="text-center">
              belum punya akun?{" "}
              <Link to={"/register"} className="text-primary">
                Daftar disini
              </Link>
            </p>
          </form>
        </section>
        <img
          src={Image}
          className="w-1/2 md:block hidden p-16 object-contain"
          alt="image"
          draggable="false"
        />
      </main>
    </div>
  );
};

export default login;
