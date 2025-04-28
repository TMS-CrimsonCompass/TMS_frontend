import { DatePipe } from "@/utils/date-pipe";
import React, { JSX, useEffect, useState } from "react";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaHotel,
  FaCalendarAlt,
  FaAlignLeft,
  FaChevronDown,
  FaChevronUp,
  FaHeading,
  FaPlus,
  FaRoute,
  FaIdCard,
} from "react-icons/fa";
import SelectionWithSearchBar from "../components/SelectionWithSearchBar";
import { getSession } from "next-auth/react";
import {
  ItineraryInstance,
  ItineraryInstanceDetail,
  ItineraryInstanceDetailChangeRequest,
  ItineraryInstanceRequest,
  MasterItineraryDetail,
} from "../types/dto";
import {
  itineraryDetailToFC,
  fcToItineraryDetail,
} from "@/utils/itinerary-data-pipe";

type ItineraryInstanceValue = ItineraryInstance[keyof ItineraryInstance];

interface MasterItineraryDetailWithFC extends MasterItineraryDetail {
  fc: ItineraryInstance[];
}

const IndividualItineraryPage: React.FC<{ id: string }> = ({ id }) => {
  const [masterItinerary, setMasterItinerary] =
    useState<MasterItineraryDetailWithFC>();
  const [editingField, setEditingField] = useState<{
    id: number;
    field: keyof ItineraryInstance | null;
  }>({ id: -1, field: null });
  const [tempValue, setTempValue] = useState<ItineraryInstanceValue | null>(
    null
  );
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newInstance, setNewInstance] = useState<Partial<ItineraryInstance>>({
    transportEntityId: 1000,
    transportEntityType: "BUS",
  });

  useEffect(() => {
    const request = async () => {
      const session = await getSession();
      const res = await fetch(`/api/itineraries/master/${id}`, {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });
      const body: MasterItineraryDetail = await res.json();
      const fcData: MasterItineraryDetailWithFC = {
        ...body,
        fc: body.itineraries.map((itinerary) => itineraryDetailToFC(itinerary)),
      };
      setMasterItinerary(fcData);
    };
    request();
  }, []);

  const handleEdit = (
    id: number,
    field: keyof ItineraryInstance,
    currentValue: ItineraryInstanceValue
  ) => {
    setEditingField({ id, field });
    setTempValue(currentValue);
    console.log(currentValue);
  };

  const handleSave = () => {
    if (!masterItinerary) return;
    const instance = masterItinerary.fc.find((it) => it.id === editingField.id);
    const instanceDetail = masterItinerary.itineraries.find(
      (it) => it.itineraryId === editingField.id
    );
    if (!instance || editingField.field === null || !instanceDetail) {
      setEditingField({ id: -1, field: null });
      return;
    }
    if (tempValue === instance[editingField.field]) {
      setEditingField({ id: -1, field: null });
      return;
    }
    const request = async () => {
      const session = await getSession();
      const changedData = fcToItineraryDetail({
        [editingField.field as keyof ItineraryInstance]: tempValue,
      });
      const instanceChangeData: ItineraryInstanceDetail = {
        ...instanceDetail,
        ...changedData,
      };
      const correctCRData: ItineraryInstanceDetailChangeRequest = {
        ...instanceChangeData,
        entityTypeId: instanceChangeData.entityTypeName === "Bus" ? 4 : 3,
      };
      const res = await fetch(`/api/itineraries/${correctCRData.itineraryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(correctCRData),
      });
      setShowModal(false);
      window.location.reload();
    };
    request();
  };

  const invalidNewInstance =
    !newInstance.title ||
    !newInstance.description ||
    !newInstance.startDate ||
    !newInstance.endDate ||
    newInstance.hotel?.id === undefined ||
    newInstance.place?.id === undefined ||
    newInstance.transportEntityType === undefined ||
    newInstance.transportEntityId === undefined;

  const handleDeleteInstance = (id: number) => {
    const request = async () => {
      const session = await getSession();
      await fetch(`/api/itineraries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      setShowModal(false);
      window.location.reload();
    };
    request();
  };

  const handleAddInstance = () => {
    const request = async () => {
      console.log(newInstance);
      if (
        !newInstance.title ||
        !newInstance.description ||
        !newInstance.startDate ||
        !newInstance.endDate ||
        newInstance.hotel?.id === undefined ||
        newInstance.place?.id === undefined ||
        newInstance.transportEntityType === undefined ||
        newInstance.transportEntityId === undefined
      ) {
        return;
      }
      const session = await getSession();
      const instanceData: ItineraryInstanceRequest = {
        masterItineraryId: parseInt(id),
        title: newInstance.title,
        description: newInstance.description,
        startDate: newInstance.startDate,
        endDate: newInstance.endDate,
        hotelId: newInstance.hotel.id,
        placeId: newInstance.place.id,
        entityTypeId: newInstance.transportEntityType === "BUS" ? 4 : 3,
        entityId: newInstance.transportEntityId,
      };
      const res = await fetch("/api/itineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(instanceData),
      });
      setShowModal(false);
      window.location.reload();
    };
    request();
  };

  const renderEditableField = (
    instance: ItineraryInstance,
    field: keyof ItineraryInstance,
    label: string,
    icon: JSX.Element
  ) => {
    const isDate = field === "startDate" || field === "endDate";
    const isSuggest = field === "place" || field === "hotel";
    const isTransportType = field === "transportEntityType";

    const renderValue =
      typeof instance[field] === "string" || typeof instance[field] === "number"
        ? instance[field]
        : typeof instance[field] === "object"
        ? instance[field]["name"]
        : instance[field];

    return (
      <div className="flex flex-col gap-1 text-base">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-bold text-gray-600">{label}:</span>

          {editingField.id === instance.id && editingField.field === field ? (
            <>
              {isDate ? (
                <input
                  type="date"
                  value={tempValue as string}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="ml-2 px-2 py-1 border rounded"
                />
              ) : isSuggest ? (
                <div className="max-w-md">
                  <SelectionWithSearchBar
                    searchFor={field.toUpperCase() as "HOTEL" | "PLACE"}
                    handleSelection={(search) =>
                      setTempValue({ id: search.id, name: search.name })
                    }
                  />
                </div>
              ) : isTransportType ? (
                <select
                  value={tempValue as string}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="ml-2 px-2 py-1 border rounded"
                >
                  <option value="BUS">Bus</option>
                  <option value="FLIGHT">Flight</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={tempValue as string}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="ml-2 px-2 py-1 border rounded"
                  list={`suggestions-${field}`}
                />
              )}
              <button
                onClick={handleSave}
                className="ml-2 px-4 py-2 bg-blue-500 text-white text-sm rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>{renderValue}</span>
              <FaEdit
                className="ml-2 cursor-pointer text-blue-500"
                onClick={() => handleEdit(instance.id, field, instance[field])}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  if (!masterItinerary) return <></>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{masterItinerary.masterTitle}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow text-lg"
        >
          <FaPlus /> Add Instance
        </button>
      </div>

      <div className="space-y-6">
        {masterItinerary.fc.map((instance) => (
          <div key={instance.id} className="bg-white p-6 rounded-xl shadow-md">
            <div
              className="flex justify-start items-center cursor-pointer text-lg gap-8"
              onClick={() =>
                setAccordionOpen(
                  accordionOpen === instance.id ? null : instance.id
                )
              }
            >
              <h2 className="font-semibold">{instance.title}</h2>
              <div className="text-gray-500 ms-auto">
                <span>{DatePipe(instance.startDate)}</span>{" "}
                <span className="mx-2">-</span>{" "}
                <span>{DatePipe(instance.endDate)}</span>
              </div>
              {accordionOpen === instance.id ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {accordionOpen === instance.id && (
              <div className="mt-6 space-y-4 text-gray-700">
                {renderEditableField(
                  instance,
                  "title",
                  "Title",
                  <FaHeading className="text-purple-500" />
                )}
                {renderEditableField(
                  instance,
                  "description",
                  "Description",
                  <FaAlignLeft className="text-yellow-600" />
                )}
                {renderEditableField(
                  instance,
                  "startDate",
                  "Start Date",
                  <FaCalendarAlt className="text-sky-400" />
                )}
                {renderEditableField(
                  instance,
                  "endDate",
                  "End Date",
                  <FaCalendarAlt className="text-pink-400" />
                )}
                {renderEditableField(
                  instance,
                  "place",
                  "Place",
                  <FaMapMarkerAlt className="text-blue-500" />
                )}
                {renderEditableField(
                  instance,
                  "hotel",
                  "Hotel",
                  <FaHotel className="text-indigo-500" />
                )}
                {renderEditableField(
                  instance,
                  "transportEntityType",
                  "Mode of transportation",
                  <FaRoute className="text-sky-500" />
                )}
                {renderEditableField(
                  instance,
                  "transportEntityId",
                  "Transportation Mode ID",
                  <FaIdCard className="text-purple-400" />
                )}
                <div className="pt-4">
                  <button
                    onClick={() => handleDeleteInstance(instance.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 text-base">
            <h2 className="text-2xl font-semibold">
              Add New Itinerary Instance
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newInstance.title}
              onChange={(e) =>
                setNewInstance({ ...newInstance, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newInstance.description}
              onChange={(e) =>
                setNewInstance({ ...newInstance, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="date"
              value={newInstance.startDate}
              onChange={(e) =>
                setNewInstance({ ...newInstance, startDate: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="date"
              value={newInstance.endDate}
              onChange={(e) =>
                setNewInstance({ ...newInstance, endDate: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
            />
            <div>
              <SelectionWithSearchBar
                searchFor="PLACE"
                handleSelection={(search) => {
                  setNewInstance({
                    ...newInstance,
                    place: { id: search.id, name: search.name },
                  });
                }}
              />
            </div>
            <div>
              <SelectionWithSearchBar
                searchFor="HOTEL"
                handleSelection={(search) => {
                  setNewInstance({
                    ...newInstance,
                    hotel: { id: search.id, name: search.name },
                  });
                }}
              />
            </div>
            <select
              value={newInstance.transportEntityType}
              onChange={(e) =>
                setNewInstance({
                  ...newInstance,
                  transportEntityType: e.target.value as "BUS" | "FLIGHT",
                })
              }
              className="w-full px-4 py-2 border rounded"
            >
              <option value="BUS">Bus</option>
              <option value="FLIGHT">Flight</option>
            </select>
            <input
              type="transportEntityId"
              placeholder="Transportation ID"
              value={newInstance.transportEntityId}
              onChange={(e) =>
                setNewInstance({
                  ...newInstance,
                  transportEntityId:
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddInstance}
                disabled={invalidNewInstance}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualItineraryPage;
