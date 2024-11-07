import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen">
      <Navbar variant/>
    
    </div>
  );
}


