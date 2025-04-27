import { RefObject, useEffect, useState } from "react";
import { SearchResultDTO } from "../types/dto";
import debounce from "lodash.debounce";

type DropDownControl = (toShowDropDown: boolean) => void;

export default function useSearchHotelAndPlaces(
  query: string,
  setShowDropdown: DropDownControl = () => {},
  queryType: "HOTEL" | "PLACE" | "BOTH" = "BOTH",
  isSelectedRef?: RefObject<Boolean>
) {
  const [searchResults, setSearchResults] = useState<SearchResultDTO[]>([]);
  // Debounced API call
  const fetchSuggestions = debounce(async (search: string) => {
    if (!search || search.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    if(isSelectedRef?.current){
      isSelectedRef.current = false;
      return;
    }

    try {
      const bothQueryURL = `/api/search/autocomplete?query=${search}`;
      const hotelSearchURL = `/api/search/hotels/autocomplete?query=${search}`;
      const placeSearchURL = `/api/search/places/autocomplete?query=${search}`;
      const res = await fetch(
        queryType === "HOTEL"
          ? hotelSearchURL
          : queryType === "PLACE"
          ? placeSearchURL
          : bothQueryURL
      );
      const data = await res.json();
      console.log(data)
      setSearchResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Autocomplete error:", error);
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, 150);

  useEffect(() => {
    fetchSuggestions(query);
    return () => fetchSuggestions.cancel();
  }, [query]);

  return { searchResults };
}
