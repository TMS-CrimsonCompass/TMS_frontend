export interface SearchResultDTO {
  city: string;
  country: string;
  id: number;
  image: string;
  location: string;
  name: string;
  type: "hotel" | "place";
}

export interface ItineraryInstanceRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  placeId: number;
  hotelId: number;
  entityTypeId: number;
  entityId: number;
  masterItineraryId: number;
}

export interface MasterItineraryDetail {
  masterTitle: string;
  masterDescription: string;
  itineraries: ItineraryInstanceDetail[];
}

export interface ItineraryInstance {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  place: {
    id: number;
    name: string;
  };
  hotel: {
    id: number;
    name: string;
  };
  transportEntityType: "BUS" | "FLIGHT";
  transportEntityId: number;
}

export interface ItineraryInstanceDetail {
  itineraryId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  placeId: number;
  placeName: string;
  placeImage: string;
  hotelId: number;
  hotelName: string;
  hotelImage: string;
  entityTypeName: "Bus" | "Flight";
  entityId: number;
}

export interface ItineraryInstanceDetailChangeRequest extends Omit<ItineraryInstanceDetail, "entityTypeName"> {
  entityTypeId : number;
}