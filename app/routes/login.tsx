import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Form, Link, useNavigate } from "@remix-run/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/config/firebase"; 
import Button from "~/components/Button";
import logo from "../../public/logo-white.png";
import Image from "../assets/heroImage.png";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { getSession, commitSession } from "~/utils/session.server";

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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    console.log(email, password);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const session = await getSession(request.headers.get("Cookie"));
    session.set("uid", uid);

    return redirect("/home", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return json({ error: "Login failed, please check your email and password." }, { status: 401 });
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="relative">
      <nav className="py-4 fixed z-10 bg-primary top-0 w-full">
        <main className="container flex items-center justify-between text-primary">
          <img src={logo} className="w-32" draggable="false" alt="logo" />
        </main>
      </nav>
      <main className="h-screen container flex">
        <section className="md:w-1/2 flex flex-col mx-auto items-center justify-center">
          <Form method="post" action="/login" className="max-w-md w-full space-y-4">
            <h1 className="md:text-4xl text-xl font-semibold text-center">Log In</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex flex-col md:space-y-1">
              <label className="flex gap-1 items-center font-semibold text-lg">
                <Icon icon="ic:baseline-email" />
                Email
              </label>
              <input
                type="email"
                name="email"
                className="p-2 border-2 rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col md:space-y-1">
              <label className="flex gap-1 items-center font-semibold text-lg">
                <Icon icon="material-symbols:lock" />
                Password
              </label>
              <input
                type="password"
                name="password"
                className="p-2 border-2 rounded-md"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <input type="checkbox" name="remember" id="remember" />
                <small>Remember me</small>
              </div>
              <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
            </div>
            <Button width="w-full" type="submit" variant="default">Log In</Button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">Register here</Link>
            </p>
          </Form>
        </section>
        <img src={Image} className="w-1/2 md:block hidden p-16 object-contain" alt="image" draggable="false" />
      </main>
    </div>
  );
};

export default Login;
