"use client";
import { useSearchParams } from "next/navigation";
import NavBar from "../components/NavBar";
import ItineraryCard from "./ItineraryCard";
import IndividualItineraryPage from "./IndividualItineraryPage";
import { useEffect, useState, Suspense } from "react";
import { FaPlus } from "react-icons/fa";
import NewItineraryModal from "./NewItineraryModal";
import { getSession } from "next-auth/react";

interface MasterItinerary {
  masterItineraryId: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ItinerarySelectionPage = () => {
  const [itineraries, setItineraries] = useState<MasterItinerary[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const request = async () => {
      const session = await getSession();
      const res = await fetch("/api/user-itineraries", {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });
      const body = await res.json();
      setItineraries(body);
    };
    request();
  }, []);

  const handleAddItinerary = async (data: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    const session = await getSession();
    const res = await fetch("/api/user-itineraries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    await res.json();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="mt-16 flex justify-between items-center pt-16 px-8">
        <h1 className="text-2xl font-bold">Itineraries</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow text-lg"
        >
          <FaPlus /> Create New Itinerary
        </button>
      </div>

      <div className="flex flex-wrap justify-start items-center gap-8 p-8">
        {itineraries.map((itinerary, index) => (
          <ItineraryCard
            key={index}
            id={itinerary.masterItineraryId}
            title={itinerary.title}
            startDate={itinerary.startDate}
            endDate={itinerary.endDate}
            description={itinerary.description}
          />
        ))}
      </div>

      {showModal && (
        <NewItineraryModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddItinerary}
        />
      )}
    </div>
  );
};

const SelectedItineraryPage = ({ id }: { id: string }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="mt-16 py-4"></div>
      <IndividualItineraryPage id={id} />
    </div>
  );
};

// Component that uses useSearchParams
function ItineraryContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  
  if (query) return <SelectedItineraryPage id={query} />;
  return <ItinerarySelectionPage />;
}

// Main exported component with Suspense boundary
export default function ItineraryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-xl">Loading itineraries...</div>
    </div>}>
      <ItineraryContent />
    </Suspense>
  );
}
