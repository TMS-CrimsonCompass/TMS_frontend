'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar, FaCar, FaSwimmer, FaUtensils, FaWifi, FaPaw, FaBath, FaDumbbell, FaWheelchair, FaSpa, FaGlassCheers, FaConciergeBell, FaTv, FaCoffee, FaSnowflake } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import exlix from '../../public/images/exlix.png';
import exlexcalibur from '../../public/images/Excalibur_Hotel_and_Casino.jpg';
import room from '../../public/images/room.png';
import sharkReef from '../../public/images/shark-reef.png'; // Add images for activities
import highRoller from '../../public/images/high-roller.png';
import madameTussauds from '../../public/images/madame-tussauds.png';
import arteMuseum from '../../public/images/arte-museum.png';
import antelopeCanyon from '../../public/images/antelope-canyon.png';
import pool from '../../public/images/pool.png';
import view from '../../public/images/view.jpg';
import restroom from '../../public/images/restroom.jpg';
import room2 from '../../public/images/room2.jpg';
import pool2 from '../../public/images/pool2.jpg';
import hotelLobby from '../../public/images/hotelLobby.jpg';
import food1 from '../../public/images/food1.jpg';


const hotelLocation = {
  lat: 36.0986,
  lng: -115.1767,
};

const nearbyPlaces = [
  { lat: 36.0980, lng: -115.1730, name: "The Luxor" },
  { lat: 36.1000, lng: -115.1800, name: "MGM Grand" },
  { lat: 36.1030, lng: -115.1850, name: "The Venetian" }
];

const amenities = [
  { icon: FaCar, text: 'On-site parking', color: 'text-blue-500' },
  { icon: FaSwimmer, text: '4 swimming pools', color: 'text-teal-500' },
  { icon: FaUtensils, text: '14 restaurants', color: 'text-red-500' },
  { icon: FaWifi, text: 'Free WiFi', color: 'text-purple-500' },
  { icon: FaPaw, text: 'Pet friendly', color: 'text-yellow-500' },
  { icon: FaBath, text: 'Private bathroom', color: 'text-pink-500' },
  { icon: FaWheelchair, text: 'Facilities for disabled guests', color: 'text-green-500' },
  { icon: FaDumbbell, text: 'Fitness center', color: 'text-orange-500' }
];

const tabs = [
  { id: 'details', label: 'Details', color: 'text-blue-600 hover:text-blue-800' },
  { id: 'reviews', label: 'Reviews', color: 'text-purple-600 hover:text-purple-800' },
  { id: 'trip-recommendations', label: 'Trip Recommendations', color: 'text-teal-600 hover:text-teal-800' },
  { id: 'facilities', label: 'Facilities', color: 'text-red-600 hover:text-red-800' },
  { id: 'policy', label: 'Policy', color: 'text-green-600 hover:text-green-800' }
];

const facilities = [
  { icon: FaSpa, text: 'Full-service spa', color: 'text-pink-500' },
  { icon: FaGlassCheers, text: 'On-site casino', color: 'text-purple-500' },
  { icon: FaConciergeBell, text: '24/7 concierge service', color: 'text-blue-500' },
  { icon: FaTv, text: 'In-room entertainment', color: 'text-red-500' },
  { icon: FaCoffee, text: 'Coffee shop', color: 'text-brown-500' },
  { icon: FaSnowflake, text: 'Air conditioning', color: 'text-teal-500' },
  { icon: FaSwimmer, text: 'Indoor and outdoor pools', color: 'text-green-500' },
  { icon: FaDumbbell, text: 'State-of-the-art gym', color: 'text-orange-500' }
];

const roomAvailability = [
  {
    type: "Standard Room",
    guests: 2,
    price: "$120 per night",
    options: ["1 King Bed", "2 Queen Beds", "Non-Smoking"],
  },
  {
    type: "Deluxe Room",
    guests: 3,
    price: "$180 per night",
    options: ["1 King Bed", "Ocean View", "Non-Smoking"],
  },
  {
    type: "Suite",
    guests: 4,
    price: "$250 per night",
    options: ["1 King Bed", "Living Room", "Balcony", "Non-Smoking"],
  },
];

const tripRecommendations = [
  {
    id: 1,
    name: 'Shark Reef Aquarium',
    image: sharkReef,
    price: 'USD 22',
    rating: '4.1',
    reviews: '1,234 reviews'
  },
  {
    id: 2,
    name: 'High Roller Wheel',
    image: highRoller,
    price: 'USD 16',
    rating: '4.3',
    reviews: '3,045 reviews'
  },
  {
    id: 3,
    name: 'Madame Tussauds Las Vegas',
    image: madameTussauds,
    price: 'USD 28',
    rating: '4.7',
    reviews: '3 reviews'
  },
  {
    id: 4,
    name: 'ARTE Museum Las Vegas',
    image: arteMuseum,
    price: 'USD 44',
    rating: '4.3',
    reviews: '123 reviews'
  },
  {
    id: 5,
    name: 'Antelope Canyon & Horseshoe Bend Tour',
    image: antelopeCanyon,
    price: 'USD 148',
    rating: '4.5',
    reviews: '699 reviews'
  }
];
const areaInfo = {
  location: "Great location - Guests loved walking around the neighborhood!",
  nearbyPlaces: [
    { name: 'CityCenter Las Vegas', distance: '0.7 mi' },
    { name: 'Shark Reef Aquarium', distance: '0.9 mi' },
    { name: 'Eiffel Tower at Paris Hotel', distance: '1 mi' },
    { name: 'Bellagio Fountains', distance: '1 mi' },
    { name: 'Bellagio Conservatory and Botanical Gardens', distance: '1.2 mi' },
    { name: 'Unlv Arboretum', distance: '2.3 mi' },
    { name: 'Town Square Playground', distance: '2.6 mi' },
    { name: 'Childrens Park at Town Square', distance: '2.6 mi' },
    { name: 'Siegfried & Roy Park', distance: '2.6 mi' },
    { name: 'Charlie Frias Park', distance: '2.6 mi' },
  ],
  restaurantsAndCafes: [
    { name: 'RestaurantOrange Julius', distance: '550 ft' },
    { name: 'RestaurantPick Up Stix', distance: '750 ft' },
    { name: 'Cafe/BarTrago Lounge', distance: '750 ft' },
  ],
  topAttractions: [
    { name: 'Mob Museum', distance: '6 mi' },
    { name: 'The Neon Museum', distance: '6 mi' },
    { name: 'Desert Breeze Park On Spring Mountain And Durango', distance: '8 mi' },
    { name: 'Wetlands Park', distance: '8 mi' },
    { name: 'Henderson Bird Viewing Preserve', distance: '10 mi' },
    { name: 'The Lion Habitat Ranch', distance: '12 mi' },
    { name: 'Flamingo Wildlife Habitat', distance: '12 mi' },
  ],
  naturalBeauty: [
    { name: 'LakeMirage Volcano', distance: '1.7 mi' },
    { name: 'PeakWhitney Mesa (584m)', distance: '7 mi' },
  ],
  publicTransit: [
    { name: 'Monorail - Mgm Grand Station', distance: '2,450 ft' },
    { name: 'Mandalay Bay', distance: '0.7 mi' },
  ],
  airports: [
    { name: 'Harry Reid International Airport', distance: '3,050 ft' },
    { name: 'North Las Vegas Airport', distance: '8 mi' },
    { name: 'Henderson Executive Airport', distance: '10 mi' },
  ]
};

export default function Page() {
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleScrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 flex justify-between items-center text-white fixed top-0 left-0 w-full shadow-md z-50">
        <h1 className="text-xl font-bold">Crimson Compass</h1>
        <div className="flex bg-white text-black p-2 rounded-lg w-1/2">
          <input
            type="text"
            placeholder="Las Vegas"
            className="flex-grow p-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
            <FaSearch />
          </button>
        </div>
        <div>
          <button className="mr-4 hover:text-blue-300 transition-colors">Register</button>
          <button className="hover:text-purple-300 transition-colors">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-80 mt-16">
        <Image src={exlix} alt="Hotel Main Image" layout="fill" objectFit="cover" className="rounded-b-lg" />
        <div className="absolute bottom-4 left-6 bg-gradient-to-r from-blue-800 to-purple-800 bg-opacity-90 text-white p-4 rounded-lg">
          <h2 className="text-3xl font-bold">Excalibur Hotel</h2>
          <p className="text-lg flex items-center">
            <FaMapMarkerAlt className="mr-2" /> 3850 Las Vegas Blvd S, Las Vegas, NV
          </p>
        </div>
      </div>





      {/* Hotel Content */}
      <div className="container mx-auto p-6">
        <Card className="bg-white p-6 rounded-lg shadow-lg">
          {/* Hotel Images Collage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="md:col-span-2">
              <Image
                src={exlexcalibur}
                alt="Hotel Main Image"
                width={600}
                height={400}
                className="rounded-lg w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleImageClick(exlexcalibur)}
              />
            </div>

            {/* Smaller Images */}
            <div className="grid grid-cols-2 gap-4">
              {[room, pool, view, restroom, room2, pool2, hotelLobby, food1].map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Hotel Image ${index + 1}`}
                    layout="responsive"
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-32 object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
              <div className="relative max-w-4xl w-full">
                <Image
                  src={selectedImage}
                  alt="Expanded Hotel Image"
                  width={800}
                  height={600}
                  className="rounded-lg w-full h-auto"
                />
                <button
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Hotel Info */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-lg font-semibold flex items-center">
                <FaStar className="text-yellow-500 mr-1" />
                7.6 – Good
              </p>
              <p className="text-sm text-gray-500">28,792 reviews</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all">
              Reserve
            </Button>
          </div>

          {/* Amenities Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <amenity.icon className={`${amenity.color} text-2xl`} />
                <span>{amenity.text}</span>
              </div>
            ))}
          </div>

          {/* Hotel Tabs (Details, Reviews, Trip Recommendations, Facilities, Policy) */}
          <div className="flex flex-wrap space-x-4 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleScrollToSection(tab.id)}
                className={`${tab.color} font-semibold mb-2 transition-colors`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Details Section */}
          <div id="details" className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-800">Hotel Overview</h3>
            <p className="text-gray-600">
              Located on the iconic Las Vegas Strip, Excalibur Hotel & Casino offers an unparalleled experience with a touch of medieval charm. Guests can enjoy world-class entertainment, vibrant nightlife, and premium facilities including:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>4 outdoor swimming pools</li>
              <li>A full-service spa with rejuvenating treatments</li>
              <li>An on-site casino featuring table games & slots</li>
              <li>14 diverse restaurants offering global cuisine</li>
              <li>A state-of-the-art fitness center</li>
            </ul>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-800">Guest Reviews</h3>
            <div className="mt-2">
              <p className="text-gray-800 font-semibold">John D. ⭐⭐⭐⭐</p>
              <p className="text-gray-600">"Great location, decent rooms, but the check-in took a while."</p>
            </div>
            <div className="mt-2">
              <p className="text-gray-800 font-semibold">Lisa M. ⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600">"Amazing experience! Loved the pool area."</p>
            </div>
          </div>

          {/* Trip Recommendations Section */}
          <div id="trip-recommendations" className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-teal-800">Trip Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {tripRecommendations.map((activity) => (
                <div key={activity.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                  <Image src={activity.image} alt={activity.name} width={200} height={150} className="rounded-lg w-full h-32 object-cover" />
                  <h4 className="text-md font-semibold mt-2">{activity.name}</h4>
                  <p className="text-sm text-gray-600">⭐ {activity.rating} ({activity.reviews})</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">{activity.price}</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full mt-2 py-1 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Section */}
          <div id="facilities" className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-800">Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <facility.icon className={`${facility.color} text-2xl`} />
                  <span>{facility.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Section */}
          <div id="policy" className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-800">Hotel Policy</h3>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>Check-in time: 3:00 PM</li>
              <li>Check-out time: 12:00 PM</li>
              <li>Pets are allowed (additional charges may apply)</li>
              <li>Cancellation policy: Free cancellation up to 24 hours before check-in</li>
            </ul>
          </div>
        </Card>
      </div>
      {/* Area Info Section */}
      <div className="container mx-auto p-6 mt-8">
        <Card className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Area Information</h3>
          <p className="mb-4">{areaInfo.location}</p>
          <h4 className="font-semibold text-lg">What's Nearby:</h4>
          <ul className="list-disc pl-5">
            {areaInfo.nearbyPlaces.map((place, idx) => (
              <li key={idx}>{place.name} - {place.distance}</li>
            ))}
          </ul>

          <h4 className="font-semibold text-lg mt-4">Restaurants & Cafes:</h4>
          <ul className="list-disc pl-5">
            {areaInfo.restaurantsAndCafes.map((place, idx) => (
              <li key={idx}>{place.name} - {place.distance}</li>
            ))}
          </ul>

          <h4 className="font-semibold text-lg mt-4">Top Attractions:</h4>
          <ul className="list-disc pl-5">
            {areaInfo.topAttractions.map((place, idx) => (
              <li key={idx}>{place.name} - {place.distance}</li>
            ))}
          </ul>

          <h4 className="font-semibold text-lg mt-4">Natural Beauty:</h4>
          <ul className="list-disc pl-5">
            {areaInfo.naturalBeauty.map((place, idx) => (
              <li key={idx}>{place.name} - {place.distance}</li>
            ))}
          </ul>

          <h4 className="font-semibold text-lg mt-4">Public Transit:</h4>
          <ul className="list-disc pl-5">
            {areaInfo.publicTransit.map((place, idx) => (
              <li key={idx}>{place.name} - {place.distance}</li>
            ))}
          </ul>

          <h4 className="font-semibold text-lg mt-4">Closest Airports:</h4>
          <ul className="list-disc pl-5">
            {areaInfo.airports.map((place, idx) => (
              <li key={idx}>{place.name} - {place.distance}</li>
            ))}
          </ul>
        </Card>
      </div>
     


      {/* Room Availability Section */}
<div id="room-availability" className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
  <h3 className="text-xl font-semibold text-yellow-800">Room Availability</h3>
  <p className="text-gray-600 mt-2">Select your preferred room type and view the details.</p>

  <table className="w-full mt-6 table-auto border-collapse">
    <thead>
      <tr className="bg-gray-200 text-left text-sm text-gray-700">
        <th className="py-2 px-4 border-b">Room Type</th>
        <th className="py-2 px-4 border-b">Number of Guests</th>
        <th className="py-2 px-4 border-b">Today's Price</th>
        <th className="py-2 px-4 border-b">Your Choices</th>
        <th className="py-2 px-4 border-b">Select Amount</th>
      </tr>
    </thead>
    <tbody>
      {roomAvailability.map((room, index) => (
        <tr key={index} className="border-b">
          <td className="py-2 px-4 text-sm text-gray-800">{room.type}</td>
          <td className="py-2 px-4 text-sm text-gray-800">{room.guests} guests</td>
          <td className="py-2 px-4 text-sm text-gray-800">{room.price}</td>
          <td className="py-2 px-4 text-sm text-gray-800">
            <ul className="list-disc ml-5">
              {room.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </td>
          <td className="py-2 px-4 text-sm text-gray-800">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Select
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}