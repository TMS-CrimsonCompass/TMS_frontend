import { useState } from "react";
import Image from "next/image";

export default function TravelSearch() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-4">
      {!showDetails ? (
        <button
          onClick={() => setShowDetails(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Show Las Vegas Details
        </button>
      ) : (
        <div className="mt-4 border p-4 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold">Excalibur Hotel</h2>
          <p className="text-gray-700">3850 Las Vegas Boulevard South, Las Vegas Strip, NV 89109</p>
          <p className="font-semibold text-blue-600">Great location</p>
          <Image 
            src="/image.png" // Adjust path accordingly
            alt="Las Vegas Hotel"
            width={600}
            height={400}
            className="rounded-lg mt-2"
          />
          <p className="mt-2">Rating: <span className="font-bold">7.6 (Good)</span></p>
          <button
            onClick={() => setShowDetails(false)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Hide Details
          </button>
        </div>
      )}
    </div>
  );
}
