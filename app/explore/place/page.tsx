'use client';

import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
  FaCar,
  FaSwimmer,
  FaUtensils,
  FaWifi,
  FaPaw,
  FaBath,
  FaDumbbell,
  FaWheelchair,
} from 'react-icons/fa';
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';
import exlexcalibur from '@/public/images/Excalibur_Hotel_and_Casino.jpg';
import room from '@/public/images/room.png';
import sharkReef from '@/public/images/shark-reef.png';
import highRoller from '@/public/images/high-roller.png';
import madameTussauds from '@/public/images/madame-tussauds.png';
import arteMuseum from '@/public/images/arte-museum.png';
import antelopeCanyon from '@/public/images/antelope-canyon.png';
import pool from '@/public/images/pool.png';
import view from '@/public/images/view.jpg';
import restroom from '@/public/images/restroom.jpg';
import room2 from '@/public/images/room2.jpg';
import pool2 from '@/public/images/pool2.jpg';
import hotelLobby from '@/public/images/hotelLobby.jpg';
import food1 from '@/public/images/food1.jpg';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSearchParams } from 'next/navigation';
import NavBar from '@/app/components/NavBar';
import Review from '@/app/components/Review';

const hotelLocation = {
  lat: 36.0986,
  lng: -115.1767,
};

const nearbyPlaces = [
  { lat: 36.098, lng: -115.173, name: 'The Luxor' },
  { lat: 36.1, lng: -115.18, name: 'MGM Grand' },
  { lat: 36.103, lng: -115.185, name: 'The Venetian' },
];

const dummyAmenities = [
  { icon: FaCar, text: 'On-site parking', color: 'text-blue-500' },
  { icon: FaSwimmer, text: '4 swimming pools', color: 'text-teal-500' },
  { icon: FaUtensils, text: '14 restaurants', color: 'text-red-500' },
  { icon: FaWifi, text: 'Free WiFi', color: 'text-purple-500' },
  { icon: FaPaw, text: 'Pet friendly', color: 'text-yellow-500' },
  { icon: FaBath, text: 'Private bathroom', color: 'text-pink-500' },
  {
    icon: FaWheelchair,
    text: 'Facilities for disabled guests',
    color: 'text-green-500',
  },
  { icon: FaDumbbell, text: 'Fitness center', color: 'text-orange-500' },
];

const tabs = [
  {
    id: 'details',
    label: 'Details',
    color: 'text-blue-600 hover:text-blue-800',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    color: 'text-purple-600 hover:text-purple-800',
  },
  {
    id: 'trip-recommendations',
    label: 'Hotel Recommendations',
    color: 'text-teal-600 hover:text-teal-800',
  }
];

const hotelRecommendations = [
  {
    id: 1,
    name: 'Shark Reef Aquarium',
    image: sharkReef,
    price: 'USD 22',
    rating: '4.1',
    reviews: '1,234 reviews',
  },
  {
    id: 2,
    name: 'High Roller Wheel',
    image: highRoller,
    price: 'USD 16',
    rating: '4.3',
    reviews: '3,045 reviews',
  },
  {
    id: 3,
    name: 'Madame Tussauds Las Vegas',
    image: madameTussauds,
    price: 'USD 28',
    rating: '4.7',
    reviews: '3 reviews',
  },
  {
    id: 4,
    name: 'ARTE Museum Las Vegas',
    image: arteMuseum,
    price: 'USD 44',
    rating: '4.3',
    reviews: '123 reviews',
  },
  {
    id: 5,
    name: 'Antelope Canyon & Horseshoe Bend Tour',
    image: antelopeCanyon,
    price: 'USD 148',
    rating: '4.5',
    reviews: '699 reviews',
  },
];

const areaInfo = {
  location: 'Great location - Guests loved walking around the neighborhood!',
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
    {
      name: 'Desert Breeze Park On Spring Mountain And Durango',
      distance: '8 mi',
    },
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
  ],
};

function PlacePageContent() {

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [hotel, setHotel] = useState<any>(null);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const handleScrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/places/${query}`);
        const data = await res.json();
        console.log('DATA', data);
        setHotel(data); // Set API data
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    getData();
  }, []);

  // Derived variables: if API data exists, use it; otherwise fallback to dummy values.
  const hotelName = hotel?.name || 'Excalibur Hotel';
  const hotelLocationStr =
    hotel?.location || '3850 Las Vegas Blvd S, Las Vegas, NV';
  // const mainImage =
  //   hotel?.imageUrls && hotel.imageUrls.length > 0
  //     ? hotel.imageUrls[0]
  //     : exlexcalibur;
  const mainImage = exlexcalibur;
  // const otherImages =
  //   hotel?.imageUrls && hotel.imageUrls.length > 1
  //     ? hotel.imageUrls.slice(1)
  //     : [room, pool, view, restroom, room2, pool2, hotelLobby, food1];
  const otherImages = [
    room,
    pool,
    view,
    restroom,
    room2,
    pool2,
    hotelLobby,
    food1,
  ];
  const hotelRating = hotel?.rating ? hotel.rating.toFixed(1) : '7.6';
  const hotelReviewCount = hotel?.reviews ? hotel.reviews.length : 28792;
  const mapCenter =
    hotel && hotel.latitude && hotel.longitude
      ? { lat: hotel.latitude, lng: hotel.longitude }
      : hotelLocation;

  if (hotel) {
    console.log(
      hotelName,
      hotelLocationStr,
      mainImage,
      otherImages,
      hotelRating,
      hotelReviewCount,
      mapCenter
    );
    return (
      <>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <div className='bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen'>
          <NavBar />

          {/* Hero Section */}
          <div className='relative w-full h-80 mt-16'>
            <Image
              src={mainImage}
              alt='Hotel Main Image'
              layout='fill'
              objectFit='cover'
              className='rounded-b-lg'
            />
            <div className='absolute bottom-4 left-6 bg-gradient-to-r from-blue-800 to-purple-800 bg-opacity-90 text-white p-4 rounded-lg'>
              <h2 className='text-3xl font-bold'>{hotelName}</h2>
              <p className='text-lg flex items-center'>
                <FaMapMarkerAlt className='mr-2' /> {hotelLocationStr}
              </p>
            </div>
          </div>

          {/* Hotel Content */}
          <div className='container mx-auto p-6'>
            <Card className='bg-white p-6 rounded-lg shadow-lg'>
              {/* Hotel Images Collage */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Main Image */}
                <div className='md:col-span-2'>
                  <Image
                    src={mainImage}
                    alt='Hotel Main Image'
                    width={600}
                    height={400}
                    className='rounded-lg w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform'
                    onClick={() => handleImageClick(mainImage)}
                  />
                </div>

                {/* Smaller Images */}
                <div className='grid grid-cols-2 gap-4'>
                  {otherImages.map((image, index) => (
                    <div key={index} className='relative'>
                      <Image
                        src={image}
                        alt={`Hotel Image ${index + 1}`}
                        layout='responsive'
                        width={300}
                        height={200}
                        className='rounded-lg w-full h-32 object-cover cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => handleImageClick(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Modal */}
              {selectedImage && (
                <div
                  className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'
                  onClick={closeModal}
                >
                  <div className='relative max-w-4xl w-full'>
                    <Image
                      src={selectedImage}
                      alt='Expanded Hotel Image'
                      width={800}
                      height={600}
                      className='rounded-lg w-full h-auto'
                    />
                    <button
                      className='absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors'
                      onClick={closeModal}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}

              {/* Hotel Info */}
              <div className='flex justify-start items-center mt-4'>
                <div>
                  <p className='text-lg font-semibold flex items-center'>
                    <FaStar className='text-yellow-500 mr-1' />
                    {hotelRating} – Good
                  </p>
                  <p className='text-sm text-gray-500'>
                    {hotelReviewCount} reviews
                  </p>
                </div>
              </div>

              <Review forId={hotel?.placeId} forEntity="place" />

              {/* Hotel Tabs */}
              <div className='flex flex-wrap space-x-4 mt-6'>
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
              <div
                id='details'
                className='mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition'
              >
                <h3 className='text-xl font-semibold text-blue-800'>
                  Place Overview
                </h3>
                <p className='text-gray-600'>
                  {hotel?.description ||
                    'Located on the iconic Las Vegas Strip, Excalibur Hotel & Casino offers an unparalleled experience with a touch of medieval charm. Guests can enjoy world-class entertainment, vibrant nightlife, and premium facilities including:'}
                </p>
                {!hotel?.description && (
                  <ul className='list-disc ml-5 mt-2 text-gray-700'>
                    <li>4 outdoor swimming pools</li>
                    <li>A full-service spa with rejuvenating treatments</li>
                    <li>An on-site casino featuring table games & slots</li>
                    <li>14 diverse restaurants offering global cuisine</li>
                    <li>A state-of-the-art fitness center</li>
                  </ul>
                )}
              </div>

              {/* Reviews Section */}
              <div
                id='reviews'
                className='mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition'
              >
                <h3 className='text-xl font-semibold text-purple-800'>
                  Tourist Reviews
                </h3>
                {hotel?.reviews && hotel.reviews.length > 0 ? (
                  hotel.reviews.map((review: any) => (
                    <div key={review.reviewId} className='mt-2'>
                      <p className='text-gray-800 font-semibold'>
                        {review.userName} ⭐ {review.rating}
                      </p>
                      <p className='text-gray-600'>{review.reviewText}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className='mt-2'>
                      <p className='text-gray-800 font-semibold'>
                        John D. ⭐⭐⭐⭐
                      </p>
                      <p className='text-gray-600'>
                        "Great location, decent rooms, but the check-in took a
                        while."
                      </p>
                    </div>
                    <div className='mt-2'>
                      <p className='text-gray-800 font-semibold'>
                        Lisa M. ⭐⭐⭐⭐⭐
                      </p>
                      <p className='text-gray-600'>
                        "Amazing experience! Loved the pool area."
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Hotel Recommendations Section */}
              <div
                id='trip-recommendations'
                className='mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition'
              >
                <h3 className='text-xl font-semibold text-teal-800'>
                  Hotel Recommendations
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                  {hotelRecommendations.map((activity) => (
                    <div
                      key={activity.id}
                      className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105'
                    >
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        width={200}
                        height={150}
                        className='rounded-lg w-full h-32 object-cover'
                      />
                      <h4 className='text-md font-semibold mt-2'>
                        {activity.name}
                      </h4>
                      <p className='text-sm text-gray-600'>
                        ⭐ {activity.rating} ({activity.reviews})
                      </p>
                      <p className='text-lg font-bold text-blue-600 mt-2'>
                        {activity.price}
                      </p>
                      <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full mt-2 py-1 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all'>
                        Book Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Area Info Section */}
          <div className='container mx-auto p-6 mt-8'>
            <Card className='bg-white p-6 rounded-lg shadow-lg'>
              <h3 className='text-2xl font-semibold text-blue-800 mb-4'>
                Area Information
              </h3>
              <p className='mb-4'>{areaInfo.location}</p>
              <h4 className='font-semibold text-lg'>What's Nearby:</h4>
              <ul className='list-disc pl-5'>
                {areaInfo.nearbyPlaces.map((place, idx) => (
                  <li key={idx}>
                    {place.name} - {place.distance}
                  </li>
                ))}
              </ul>

              <h4 className='font-semibold text-lg mt-4'>
                Restaurants & Cafes:
              </h4>
              <ul className='list-disc pl-5'>
                {areaInfo.restaurantsAndCafes.map((place, idx) => (
                  <li key={idx}>
                    {place.name} - {place.distance}
                  </li>
                ))}
              </ul>

              <h4 className='font-semibold text-lg mt-4'>Top Attractions:</h4>
              <ul className='list-disc pl-5'>
                {areaInfo.topAttractions.map((place, idx) => (
                  <li key={idx}>
                    {place.name} - {place.distance}
                  </li>
                ))}
              </ul>

              <h4 className='font-semibold text-lg mt-4'>Natural Beauty:</h4>
              <ul className='list-disc pl-5'>
                {areaInfo.naturalBeauty.map((place, idx) => (
                  <li key={idx}>
                    {place.name} - {place.distance}
                  </li>
                ))}
              </ul>

              <h4 className='font-semibold text-lg mt-4'>Public Transit:</h4>
              <ul className='list-disc pl-5'>
                {areaInfo.publicTransit.map((place, idx) => (
                  <li key={idx}>
                    {place.name} - {place.distance}
                  </li>
                ))}
              </ul>

              <h4 className='font-semibold text-lg mt-4'>Closest Airports:</h4>
              <ul className='list-disc pl-5'>
                {areaInfo.airports.map((place, idx) => (
                  <li key={idx}>
                    {place.name} - {place.distance}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Map Section */}
          <div className='mt-12 h-96'>
            <LoadScript googleMapsApiKey='YOUR_GOOGLE_MAPS_API_KEY'>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={15}
              >
                <Marker position={mapCenter} title={hotelName} />
                {nearbyPlaces.map((place, index) => (
                  <Marker key={index} position={place} title={place.name} />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading place information...</div>
      </div>
    }>
      <PlacePageContent />
    </Suspense>
  );
}

