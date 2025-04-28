"use client";

import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import AuthModal from "./auth/AuthModal";
import { useState } from "react";

export default function NavBar() {
  const { data: session } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // <- Get current route

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 flex justify-between items-center text-white fixed top-0 left-0 w-full shadow-md z-50">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Crimson Compass
        </h1>

        <div className="hidden md:flex space-x-6">
          <Link href="/flights" className="text-white-700 hover:text-blue-600">Flights</Link>
          <Link href="/accommodations" className="text-white-700 hover:text-blue-600">Accommodations</Link>
          <Link href="/bookings" className="text-white-700 hover:text-blue-600">Bookings</Link>
          <Link href="/itinerary" className="text-white-700 hover:text-blue-600">Itinerary</Link>
        </div>

        {/* Only show SearchBar if NOT on the homepage */}
        {pathname !== "/" && (
          <div className="text-black p-2 w-1/2">
            <SearchBar text="WHITE" />
          </div>
        )}

        <div className="space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">{session.user?.name || session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="mt-4 bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          )}
        </div>

        <AuthModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} initialView="login" />
      </nav>
    </>
  );
}
