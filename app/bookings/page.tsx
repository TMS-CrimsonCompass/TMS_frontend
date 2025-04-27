// booking.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Button from '../components/ui/Button';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaSuitcase, FaUserTie, FaUser, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from "@/app/components/NavBar";

export default function BookingPage() {
  const [hotel, setHotel] = useState<any>(null);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [roomType, setRoomType] = useState('Standard Room');
  const [price, setPrice] = useState(120);
  const [warning, setWarning] = useState('');
  const pageTopRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Track input refs

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`/api/hotels/${query}`);
        const data = await res.json();
        setHotel(data);
      } catch (error) {
        console.error('Failed to fetch hotel:', error);
      }
    };
    fetchHotel();
  }, [query]);

  const roomPricing = {
    'Standard Room': 120,
    'Deluxe Room': 180,
    'Suite': 250,
  };

  useEffect(() => {
    setPrice(roomPricing[roomType] || 120);
  }, [roomType]);

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
    return Math.max(0, diff);
  };

  const totalPrice = getNights() * price;

  const handleBooking = () => {
    const requiredInputs = inputRefs.current.filter((input) => input?.hasAttribute('required'));
    const invalidInput = requiredInputs.find((input) => !input?.value);

    if (!checkIn || !checkOut || invalidInput) {
      setWarning('Please fill in all required fields before booking.');
      if (invalidInput) {
        invalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        invalidInput.focus();
        invalidInput.classList.add('bg-red-100');
        setTimeout(() => invalidInput.classList.remove('bg-red-100'), 1000);
      } else {
        pageTopRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setWarning('');
    alert(`Booking Confirmed!\nHotel: ${hotel?.name || 'Excalibur Hotel'}\nRoom: ${roomType}\nGuests: ${guests}\nDates: ${checkIn?.toLocaleDateString()} - ${checkOut?.toLocaleDateString()}\nTotal: $${totalPrice}`);
  };

  return (
    <>
      <NavBar />
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8' ref={pageTopRef}>
        <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl space-y-10'>

          {warning && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Warning! </strong>
              <span className="block sm:inline">{warning}</span>
            </div>
          )}

          {/* Booking Summary */}
          <div>
            <h1 className='text-3xl font-bold text-center text-blue-800 mb-6'>Booking Details</h1>
            <div className='grid md:grid-cols-2 gap-6'>

              {/* Hotel Info */}
              <div>
                <Image
                  src={hotel?.imageUrls?.[0] || '/images/Excalibur_Hotel_and_Casino.jpg'}
                  alt='Hotel'
                  width={600}
                  height={400}
                  className='rounded-lg'
                />
                <h2 className='text-xl font-semibold mt-4'>{hotel?.name || 'Excalibur Hotel'}</h2>
                <p className='text-gray-600'>{hotel?.location || '3850 Las Vegas Blvd S, Las Vegas, NV'}</p>
                <p className='text-sm text-purple-600'>Rating: {hotel?.rating?.toFixed(1) || '7.6'} (Good)</p>
              </div>

              {/* Booking Form */}
              <div className='space-y-4'>
                <label className='block'>
                  <span className='flex items-center text-sm text-gray-700 mb-1'><FaCalendarAlt className='mr-2 text-blue-500' /> Check-In</span>
                  <DatePicker selected={checkIn} onChange={(date) => setCheckIn(date)} selectsStart startDate={checkIn} endDate={checkOut} className='w-full border rounded-md p-2' />
                </label>

                <label className='block'>
                  <span className='flex items-center text-sm text-gray-700 mb-1'><FaCalendarAlt className='mr-2 text-purple-500' /> Check-Out</span>
                  <DatePicker selected={checkOut} onChange={(date) => setCheckOut(date)} selectsEnd startDate={checkIn} endDate={checkOut} minDate={checkIn} className='w-full border rounded-md p-2' />
                </label>

                <label className='block'>
                  <span className='flex items-center text-sm text-gray-700 mb-1'><FaUser className='mr-2 text-teal-500' /> Number of Guests</span>
                  <input type='number' min={1} max={6} className='w-full border rounded-md p-2' value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} />
                </label>

                <label className='block'>
                  <span className='text-sm text-gray-700 mb-1'>Select Room Type</span>
                  <select className='w-full border rounded-md p-2' value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                    {Object.entries(roomPricing).map(([type, price]) => (
                      <option key={type} value={type}>{type} - ${price}/night</option>
                    ))}
                  </select>
                </label>

                <div className='border-t pt-4'>
                  <span className='flex items-center text-sm font-semibold text-gray-800 mb-2'><FaCreditCard className='mr-2 text-green-600' /> Payment</span>
                  <p className='text-gray-600 text-sm'>Total: ${totalPrice.toFixed(2)}</p>
                  <p className='text-gray-500 text-sm'>* Payment details will be collected at check-in.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h2 className='text-2xl font-bold text-blue-700 mb-4'>Enter Your Details</h2>
            <p className='text-sm text-gray-600 mb-4'>Almost done! Just fill in the <span className="text-red-500">*</span> required info</p>

            <div className='grid md:grid-cols-2 gap-4'>
              <input type='text' placeholder='First name*' className='border p-2 rounded-md w-full' required ref={(el) => (inputRefs.current[0] = el)} />
              <input type='text' placeholder='Last name*' className='border p-2 rounded-md w-full' required ref={(el) => (inputRefs.current[1] = el)} />
              <input type='email' placeholder='Email address*' className='border p-2 rounded-md w-full' required ref={(el) => (inputRefs.current[2] = el)} />
              <input type='email' placeholder='Confirmation email*' className='border p-2 rounded-md w-full' required ref={(el) => (inputRefs.current[3] = el)} />
              <input type='tel' placeholder='Phone number*' className='border p-2 rounded-md w-full' required ref={(el) => (inputRefs.current[4] = el)} />
            </div>

            <div className='grid md:grid-cols-2 gap-4 mt-4'>
              <input type='text' placeholder='Address*' className='border p-2 rounded-md w-full' required ref={(el) => (inputRefs.current[5] = el)} />
              <input type='text' placeholder='City*' className='border p-2 rounded-md w-full' required ref={(el) => (inputRefs.current[6] = el)} />
              <input type='text' placeholder='Zip Code (optional)' className='border p-2 rounded-md w-full' />
              <select className='border p-2 rounded-md w-full'>
                <option>United States</option>
              </select>
            </div>

            {/* Other optional fields */}
            <div className='mt-4 space-y-2'>
              <label className='flex items-center gap-2 text-sm'>
                <input type='checkbox' className='accent-blue-600' />
                Yes, I want free paperless confirmation (recommended)
              </label>
              <p className='text-xs text-gray-500 ml-6'>We'll text you a link to download our app</p>
            </div>

            <div className='mt-6'>
              <h3 className='text-sm font-semibold mb-2'>Who are you booking for? (optional)</h3>
              <label className='block text-sm mb-1'><input type='radio' name='guest' className='mr-2' /> I'm the main guest</label>
              <label className='block text-sm'><input type='radio' name='guest' className='mr-2' /> I'm booking for someone else</label>
            </div>

            <div className='mt-6'>
              <h3 className='text-sm font-semibold mb-2'>Are you traveling for work? (optional)</h3>
              <label className='block text-sm mb-1'><input type='radio' name='work' className='mr-2' /> Yes</label>
              <label className='block text-sm'><input type='radio' name='work' className='mr-2' /> No</label>
            </div>

            <div className='mt-6'>
              <label className='block'>
                <span className='text-sm text-gray-700 mb-1'>Special Requests</span>
                <textarea className='w-full border p-2 rounded-md' rows={3} placeholder='Any special instructions or preferences?' />
              </label>
            </div>

            <div className='mt-8'>
              <Button
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all'
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>
            </div>

            <div className='mt-4 text-xs text-gray-600'>
              <p>Good to know:</p>
              <ul className='list-disc ml-5'>
                <li>Stay flexible: You can cancel for free before <strong>May 9, 2025</strong>.</li>
                <li>Guests: 2 adults</li>
                <li>No smoking</li>
                <li>Room: {roomType}</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
