"use client";

import { useState } from "react";
import { SearchResultDTO } from "../types/dto";
import useSearchHotelAndPlaces from "../hooks/useSearchHotelAndPlaces";

export default function SearchBar({ text }: { text?: "DEFAULT" | "WHITE" }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { searchResults } = useSearchHotelAndPlaces(query, setShowDropdown);

  const handleSelect = (search?: SearchResultDTO) => {
    if (!search) return;
    window.location.href = `/explore/${search.type}?query=${encodeURIComponent(
      search.id
    )}`;
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full flex items-center gap-2">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowDropdown(true)}
          placeholder="Search for destinations and hotels"
          className={`w-full border border-gray-300 outline-none px-4 py-3 ${
            text === "WHITE" ? "text-white" : "text-gray-700"
          } text-lg rounded-md`}
        />

        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute z-50 bg-white border w-full rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
            {searchResults.map((search) => (
              <li
                key={search.id}
                onClick={() => handleSelect(search)}
                className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={search.image}
                  alt={search.name}
                  className="w-10 h-10 object-cover rounded mr-3"
                />
                <div>
                  <p className="font-semibold text-black">{search.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔵 Search Button */}
      <button
        onClick={() => handleSelect(searchResults[0])}
        className="bg-blue-600 text-white px-5 py-3 rounded-md text-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
