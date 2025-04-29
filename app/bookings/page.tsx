"use client";

import { useEffect, useState } from "react";
import NavBar from "@/app/components/NavBar";

type Flight = {
  airline: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
};

export default function BookingPage() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const [passengerName, setPassengerName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    if (storedFlight) {
      setFlight(JSON.parse(storedFlight));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!flight) return;

    const bookingData = {
      passengerName,
      age: parseInt(age),
      gender,
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      departureCity: flight.departureCity,
      arrivalCity: flight.arrivalCity,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      price: flight.price,
    };

    try {
      const response = await fetch("https://ccmain-hzcbg5c8hzh4dwfc.centralus-01.azurewebsites.net/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSubmitted(true);
        localStorage.removeItem("selectedFlight");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Something went wrong.");
    }
  };

  if (!flight) return <div className="p-6">Loading flight details...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Flight Summary</h2>
        <p>Airline: {flight.airline}</p>
        <p>Flight #: {flight.flightNumber}</p>
        <p>From: {flight.departureCity} ({flight.departureAirport})</p>
        <p>To: {flight.arrivalCity} ({flight.arrivalAirport})</p>
        <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
        <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
        <p>Duration: {flight.duration}</p>
        <p className="font-bold text-green-600">Price: ${flight.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            required
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">
          ✅ Booking confirmed for <strong>{passengerName}</strong>! 🎉
        </div>
      )}
    </div>
  );
}
