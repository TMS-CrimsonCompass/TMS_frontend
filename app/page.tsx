"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import newYork from '../public/images/newyork.jpg'
import tokyo from '../public/images/tokyo.jpg'
import paris from '../public/images/paris.jpg'
import background from '../public/images/background.jpg'

export default function HomePage() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim() !== "") {
      window.location.href = `/explore?query=${search}`;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex flex-col items-center justify-center text-white text-center">
      {/* Background Image */}
      <div
  className="absolute inset-0 w-full h-full opacity-50"
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

  </div>
</section>


      
    

      {/* How It Works */}
      <section className="mt-12 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-black text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { title: "Search & Explore", desc: "Find destinations and plan your trip easily." },
            { title: "Book & Save", desc: "Book flights, hotels, and activities in one place." },
            { title: "Itinerary Planning", desc: "Create and share your perfect travel itinerary." },
          ].map((step, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-900 font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Call to Action */}
      <section className="mt-12 w-full text-center bg-blue-500 py-12 text-white">
        <h2 className="text-3xl font-semibold">Start Your Journey Now!</h2>
        <p className="mt-2 text-lg">Create an itinerary and explore amazing places.</p>
        <Link href="/auth/signup">
          <button className="mt-4 bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
            Sign Up Now
          </button>
        </Link>
      </section>
    </main>
  );
}
