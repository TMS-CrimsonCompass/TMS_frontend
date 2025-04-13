"use client";

import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 flex justify-between items-center text-white fixed top-0 left-0 w-full shadow-md z-50">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Crimson Compass
        </h1>
        <div className="text-black p-2 w-1/2">
          <SearchBar text="WHITE" />
        </div>
        {!session && (
          <div>
            <button className="mr-4 hover:text-blue-300 transition-colors">
              Register
            </button>
            <button className="hover:text-purple-300 transition-colors">
              Sign In
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
