import { DatePipe } from "@/utils/date-pipe";
import { useRouter } from "next/navigation";

type ItineraryCardProps = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  title,
  description,
  startDate,
  endDate,
}) => {
  const router = useRouter();
  return (
    <div
      className="bg-white cursor-pointer shadow-md rounded-2xl p-6 w-full max-w-sm border border-gray-200"
      onClick={() => router.push(`/itinerary?query=${id}`)}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Start Date:</span> {DatePipe(startDate)}
        </div>
        <div>
          <span className="font-medium">End Date:</span> {DatePipe(endDate)}
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
