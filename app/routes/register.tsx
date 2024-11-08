import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from '@remix-run/react'
import React from 'react'
import Image from "../assets/heroImage.png";
import logo from "../../public/logo-white.png";
import Button from '~/components/Button'

const register = () => {
  return (
    <div className="relative">
      <nav className={`py-4 fixed z-10 bg-primary top-0 w-full`}>
        <main className="container flex items-center justify-between text-primary">
          <img src={logo} className="w-32" draggable="false" alt="logo" />
        </main>
      </nav>
      <main className="h-screen container  flex md:flex-row-reverse flex-col  ">
        <section className="md:w-1/2 h-screen flex flex-col items-center justify-center">
          <form action="" className="max-w-md w-full space-y-4 ">
            <h1 className="md:text-4xl text-xl font-semibold text-center">Buat akun baru</h1>
            <div className="flex flex-col md:space-y-1">
              <label
                htmlFor=""
                className="flex gap-1 items-center font-semibold text-lg"
              >
                <Icon icon={"mdi:user"} />
                Nama Lengkap
              </label>
              <input
                type="text"
                className="p-2 border-2 rounded-md "
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>
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
                placeholder="Masukkan kata sandi anda"
              />
            </div>
            <div className="flex flex-col md:space-y-1">
              <label
                htmlFor=""
                className="flex gap-1 items-center font-semibold text-lg"
              >
                <Icon icon={"material-symbols:lock"} />
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                className="p-2 border-2 rounded-md "
                placeholder="Konfirmasi kata sandi anda"
              />
            </div>
        
            <Button width="w-full" type="submit" variant="default">
              Masuk
            </Button>
            <p className="text-center">
              Sudah punya akun?{" "}
              <Link to={"/login"} className="text-primary">
                Masuk disini
              </Link>
            </p>
          </form>
        </section>
        <img
          src={Image}
          className="w-1/2 p-16 md:block hidden object-contain"
          alt="image"
          draggable="false"
        />
      </main>
    </div>
  )
}

export default register
