import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, useActionData, Form } from '@remix-run/react';
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Image from '../assets/heroImage.png';
import logo from '../../public/logo-white.png';
import Button from '~/components/Button';
import { getSession } from '~/utils/session.server';

interface ActionData {
  error?: string;
}
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uid = session.get("uid");

  if (uid) {
    return redirect("/home");
  }

  return json({ uid });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  try {
  
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    await updateProfile(user, { displayName: name });


    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      createdAt: new Date(),
    });

    return redirect('/'); 
  } catch (error: any) {
    return { error: error.message };
  }
};

const Register: React.FC = () => {
  const actionData = useActionData<ActionData>();

  return (
    <div className="relative">
      <nav className="py-4 fixed z-10 bg-primary top-0 w-full">
        <main className="container flex items-center justify-between text-primary">
          <img src={logo} className="w-32" draggable="false" alt="logo" />
        </main>
      </nav>
      <main className="h-screen container flex md:flex-row-reverse flex-col">
        <section className="md:w-1/2 h-screen flex flex-col items-center justify-center">
          <Form method="post" className="max-w-md w-full space-y-4">
            <h1 className="md:text-4xl text-xl font-semibold text-center">Buat akun baru</h1>

            {actionData?.error && <p className="text-red-500 text-center">{actionData.error}</p>}

            <div className="flex flex-col md:space-y-1">
              <label className="flex gap-1 items-center font-semibold text-lg">
                <Icon icon="mdi:user" />
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                className="p-2 border-2 rounded-md"
                placeholder="Masukkan nama lengkap Anda"
                required
              />
            </div>
            <div className="flex flex-col md:space-y-1">
              <label className="flex gap-1 items-center font-semibold text-lg">
                <Icon icon="ic:baseline-email" />
                Email
              </label>
              <input
                type="email"
                name="email"
                className="p-2 border-2 rounded-md"
                placeholder="Masukkan alamat email Anda"
                required
              />
            </div>
            <div className="flex flex-col md:space-y-1">
              <label className="flex gap-1 items-center font-semibold text-lg">
                <Icon icon="material-symbols:lock" />
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                className="p-2 border-2 rounded-md"
                placeholder="Masukkan kata sandi anda"
                required
              />
            </div>
            <div className="flex flex-col md:space-y-1">
              <label className="flex gap-1 items-center font-semibold text-lg">
                <Icon icon="material-symbols:lock" />
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="p-2 border-2 rounded-md"
                placeholder="Konfirmasi kata sandi anda"
                required
              />
            </div>

            <Button width="w-full" type="submit" variant="default">
             Daftar
            </Button>
            <p className="text-center">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-primary">
                Masuk disini
              </Link>
            </p>
          </Form>
        </section>
        <img
          src={Image}
          className="w-1/2 p-16 md:block hidden object-contain"
          alt="image"
          draggable="false"
        />
      </main>
    </div>
  );
}

export default Register;
