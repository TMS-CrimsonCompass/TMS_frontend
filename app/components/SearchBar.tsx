"use client";

import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounced API call
  const fetchSuggestions = debounce(async (search: string) => {
    if (!search || search.length < 3) {
      setPlaces([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(`https://ccmain-hzcbg5c8hzh4dwfc.centralus-01.azurewebsites.net/api/places/search?q=${search}`);
      const data = await res.json();
      setPlaces(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Autocomplete error:", error);
      setPlaces([]);
      setShowDropdown(false);
    }
  }, 150);

  useEffect(() => {
    fetchSuggestions(query);
    return () => fetchSuggestions.cancel();
  }, [query]);

  const handleSelect = (placeName: string) => {
    window.location.href = `/explore?query=${encodeURIComponent(placeName)}`;
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (query.trim().length >= 3) {
      window.location.href = `/explore?query=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="relative w-full flex items-center gap-2">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowDropdown(true)}
          placeholder="Search for destinations, hotels, flights..."
          className="w-full border border-gray-300 outline-none px-4 py-3 text-gray-700 text-lg rounded-md"
        />

        {showDropdown && places.length > 0 && (
         <ul className="absolute z-50 bg-white border w-full rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
         {places.map((place: any) => (
           <li
             key={place.placeId}
             onClick={() => handleSelect(place.name)}
             className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
           >
             <img
               src={place.images[0]?.imageUrl}
               alt={place.name}
               className="w-10 h-10 object-cover rounded mr-3"
             />
             <div>
               <p className="font-semibold text-black">{place.name}</p>
               <p className="text-sm text-gray-700">{place.category}</p>
             </div>
           </li>
         ))}
       </ul>
       
        )}
      </div>

      {/* 🔵 Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-5 py-3 rounded-md text-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
