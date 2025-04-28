"use client";

import { useRef, useState } from "react";
import { SearchResultDTO } from "../types/dto";
import useSearchHotelAndPlaces from "../hooks/useSearchHotelAndPlaces";

export default function SelectionWithSearchBar({
  searchFor,
  handleSelection,
}: {
  searchFor: "HOTEL" | "PLACE";
  handleSelection: (searchResultDTO: SearchResultDTO) => void;
}) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const isSelectedRef = useRef(false);
  const { searchResults } = useSearchHotelAndPlaces(
    query,
    setShowDropdown,
    searchFor,
    isSelectedRef
  );

  const handleSelect = (search?: SearchResultDTO) => {
    if (!search) return;
    isSelectedRef.current = true;
    setQuery(search.name);
    handleSelection(search);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 3 && setShowDropdown(true)}
        placeholder={`Search for ${
          searchFor === "HOTEL" ? "hotels" : "destinations"
        }`}
        className={`w-full border border-gray-300 outline-none px-2 py-[0.4rem] text-gray-700 text-base rounded`}
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
  );
}
