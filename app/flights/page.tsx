"use client";

import { useState } from "react";
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

export default function FlightsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFlights = async () => {
    if (!from || !to) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/flights/search?from=${from}&to=${to}`);
      const data = await res.json();
      setFlights(data);
    } catch (err) {
      setError("Failed to fetch flights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar /> {/* ✅ This makes your page consistent with the home page */}
      <div className="mt-24 px-6 py-10 min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Search Flights</h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="From (City)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-64"
          />
          <input
            type="text"
            placeholder="To (City)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-64"
          />
          <button
            onClick={searchFlights}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading && <p className="text-center text-gray-700">Loading...</p>}

        <div className="grid gap-6 mt-6 max-w-5xl mx-auto">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="bg-white rounded shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {flight.airline} Flight {flight.flightNumber}
              </h2>
              <p className="text-gray-700">
                <strong>From:</strong> {flight.departureCity} ({flight.departureAirport})<br />
                <strong>To:</strong> {flight.arrivalCity} ({flight.arrivalAirport})<br />
                <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}<br />
                <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}<br />
                <strong>Duration:</strong> {flight.duration}<br />
                <strong>Seats Available:</strong> {flight.availableSeats}
              </p>
              <p className="mt-2 font-bold text-green-600 text-lg">${flight.price}</p>
            </div>
          ))}
        </div>

        {flights.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500 mt-8">No flights found for your search.</p>
        )}
      </div>
    </>
  );
}