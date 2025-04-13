import { ItineraryInstance, ItineraryInstanceDetail } from "@/app/types/dto";

export function itineraryDetailToFC(
  itinerary: ItineraryInstanceDetail
): ItineraryInstance {
  return {
    id: itinerary.itineraryId,
    title: itinerary.title,
    description: itinerary.description,
    startDate: itinerary.startDate,
    endDate: itinerary.endDate,
    transportEntityId: itinerary.entityId,
    transportEntityType: itinerary.entityTypeName.toUpperCase() as
      | "BUS"
      | "FLIGHT",
    place: {
      id: itinerary.placeId,
      name: itinerary.placeName,
    },
    hotel: {
      id: itinerary.hotelId,
      name: itinerary.hotelName,
    },
  };
}

export function fcToItineraryDetail(
  instance: Partial<ItineraryInstance>
): Partial<ItineraryInstanceDetail> {
  const partialItinerary: Partial<ItineraryInstanceDetail> = {
    itineraryId: instance.id,
    title: instance.title,
    description: instance.description,
    startDate: instance.startDate,
    endDate: instance.endDate,
    placeId: instance.place?.id,
    placeName: instance.place?.name,
    hotelId: instance.hotel?.id,
    hotelName: instance.hotel?.name,
    entityTypeName:
      instance.transportEntityType === "BUS"
        ? "Bus"
        : instance.transportEntityType === "FLIGHT"
        ? "Flight"
        : undefined,
    entityId: instance.transportEntityId,
  };

  for (let [key, value] of Object.entries(partialItinerary)) {
    if (value !== undefined) continue;
    delete partialItinerary[key as keyof ItineraryInstanceDetail];
  }

  return partialItinerary;
}
