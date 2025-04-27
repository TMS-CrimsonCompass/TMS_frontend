"use client";

import { useState, useEffect } from "react";
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
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFlights = async () => {
    if (!from || !to || !date) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/flights/search?from=${from}&to=${to}&date=${date}`);
      const data = await res.json();
      setFlights(data);
      setFilteredFlights(data);
    } catch (err) {
      setError("Failed to fetch flights.");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters after fetching flights
  useEffect(() => {
    let filtered = flights;

    if (selectedAirlines.length > 0) {
      filtered = filtered.filter(f => selectedAirlines.includes(f.airline));
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter(f => f.price <= maxPrice);
    }

    setFilteredFlights(filtered);
  }, [selectedAirlines, maxPrice, flights]);

  const resetFilters = () => {
    setSelectedAirlines([]);
    setMaxPrice(undefined);
  };

  const allAirlines = Array.from(new Set(flights.map(f => f.airline)));

  return (
    <>
      <NavBar />
      <div className="mt-24 px-6 py-10 min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Search Flights</h1>

        {/* Search Inputs */}
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
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-48"
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

        {/* Filters */}
        {flights.length > 0 && (
          <div className="flex flex-col md:flex-row gap-6 items-start justify-center mt-8 mb-4">
            {/* Airline Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Airlines:</label>
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto border rounded px-3 py-2 w-60 bg-white">
                {allAirlines.map((airline) => (
                  <label key={airline} className="text-sm flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAirlines([...selectedAirlines, airline]);
                        } else {
                          setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                        }
                      }}
                    />
                    {airline}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Price: ${maxPrice || "∞"}</label>
              <input
                type="range"
                min={0}
                max={Math.max(...flights.map(f => f.price), 1000)}
                step={10}
                value={maxPrice || Math.max(...flights.map(f => f.price))}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-60 mt-2"
              />
            </div>

            {/* Reset Filters */}
            <div>
              <button
                onClick={resetFilters}
                className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Filtered Flight Cards */}
        <div className="grid gap-6 mt-6 max-w-5xl mx-auto">
          {filteredFlights.map((flight, index) => (
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

        {filteredFlights.length === 0 && !loading && !error && flights.length > 0 && (
          <p className="text-center text-gray-500 mt-8">No flights match your filters.</p>
        )}
      </div>
    </>
  );
}
