"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import newYork from '../public/images/newyork.jpg'
import tokyo from '../public/images/tokyo.jpg'
import paris from '../public/images/paris.jpg'
import switzerland from '../public/images/switzerland.jpg'
import dubai from '../public/images/dubai.jpg'
import india from '../public/images/india.jpg'
import background from '../public/images/background.jpg'
import Modal from "./components/Modal";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Button from './components/ui/Button';
import Card from './components/ui/Card';



export default function HomePage() {
  const [search, setSearch] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSearch = () => {
    if (search.trim() !== "") {
      window.location.href = `/explore?query=${search}`;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* 🔹 Navbar Section */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <Link href="/" className="text-2xl font-bold text-blue-600">Tour Management</Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/flights" className="text-gray-700 hover:text-blue-600">Flights</Link>
          <Link href="/accommodations" className="text-gray-700 hover:text-blue-600">Accommodations</Link>
          <Link href="/bookings" className="text-gray-700 hover:text-blue-600">Bookings</Link>
          <Link href="/car-rentals" className="text-gray-700 hover:text-blue-600">Itinerary </Link>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="mt-4 bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => setIsSignupOpen(true)}
            className="mt-4 bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Sign Up
          </button>
          {/* Login Modal */}
          <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
            <Login onSignupClick={() => {
              setIsLoginOpen(false); // Close login modal
              setIsSignupOpen(true); // Open signup modal
            }} />
          </Modal>

          {/* Signup Modal */}
          <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
            <Signup />
          </Modal>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex flex-col items-center justify-center text-white text-center">
        {/* Background Image */}
        <div
          className="absolute inset-5 w-full h-full opacity-50"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>

        {/* Text Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-black">Plan Your Perfect Trip</h1>
          <p className="mt-4 text-lg md:text-xl text-black">Discover destinations, book stays, and create itineraries with ease.</p>
          <div className="mt-6 bg-white rounded-lg shadow-lg flex items-center px-6 py-4 w-full">
            <input
              type="text"
              placeholder="Search for destinations, hotels, flights..."
              className="w-full border-none outline-none px-3 text-gray-700 text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch} className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg">
              Search
            </button>
          </div>

        </div>
      </section>




      {/* Popular Destinations */}


      <section className="mt-12 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-black text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          {/* Paris */}
          <Link href="/explore?query=Paris">
            <div className="cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105">
              <Image
                src={paris}
                alt="Paris"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold text-gray-900 mt-3 text-center">Paris</h3>
            </div>
          </Link>

          {/* Tokyo */}
          <Link href="/explore?query=Tokyo">
            <div className="cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105">
              <Image
                src={tokyo}
                alt="Tokyo"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold text-gray-900 mt-3 text-center">Tokyo</h3>
            </div>
          </Link>

          {/* New York */}
          <Link href="/explore?query=New York">
            <div className="cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105">
              <Image
                src={newYork}  // Make sure this filename is lowercase!
                alt="New York"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold text-gray-900 mt-3 text-center">New York</h3>
            </div>
          </Link>

          <Link href="/explore?query=Switzerland">
            <div className="cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105">
              <Image
                src={switzerland}  // Make sure this filename is lowercase!
                alt="Switzerland"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold text-gray-900 mt-3 text-center">Switzerland</h3>
            </div>
          </Link>

          <Link href="/explore?query=Dubai">
            <div className="cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105">
              <Image
                src={dubai}  // Make sure this filename is lowercase!
                alt="Dubai"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold text-gray-900 mt-3 text-center">Dubai</h3>
            </div>
          </Link>

          <Link href="/explore?query=India">
            <div className="cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105">
              <Image
                src={india}  // Make sure this filename is lowercase!
                alt="India"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold text-gray-900 mt-3 text-center">India</h3>
            </div>
          </Link>

        </div>
      </section>





      {/* How It Works */}
      <section className="mt-12 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-black text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link href="/explore">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-gray-900">Search & Explore</h3>
              <p className="mt-2 text-gray-900 font-medium">Find destinations and plan your trip easily.</p>
            </div>
          </Link>
          <Link href="/book">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-gray-900">Book & Save</h3>
              <p className="mt-2 text-gray-900 font-medium">Book flights, hotels, and activities in one place.</p>
            </div>
          </Link>
          <Link href="/itinerary">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-gray-900">Itinerary Planning</h3>
              <p className="mt-2 text-gray-900 font-medium">Create and share your perfect travel itinerary.</p>
            </div>
          </Link>
        </div>
      </section>


      <section className="mt-12 w-full text-center bg-blue-500 py-12 text-white">
        <h2 className="text-3xl font-semibold">Start Your Journey Now!</h2>
        <p className="mt-2 text-lg">Create an itinerary and explore amazing places.</p>

      </section>


      {/* FAQ Button Section */}
      <section className="mt-6 w-full flex justify-center">
        <Link href="/faq">
          <button className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition">
            View FAQs
          </button>
        </Link>
      </section>
    </main>
  );
}
