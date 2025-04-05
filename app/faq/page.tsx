"use client";

import { useState } from "react";

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is the Tour Management System?",
        answer:
          "The Tour Management System helps users plan, book, and manage their trips in one place, including destinations, accommodations, and itinerary sharing.",
      },
      {
        question: "Do I need to create an account to use the platform?",
        answer:
          "No, you can explore destinations without logging in. However, to book trips and save itineraries, you need to sign up.",
      },
      {
        question: "Is the Tour Management System free to use?",
        answer:
          "Yes, browsing and planning trips are free. However, booking flights, hotels, or other services will have costs associated with third-party providers.",
      },
    ],
  },
  {
    category: "Search & Explore",
    questions: [
      {
        question: "How do I search for destinations?",
        answer:
          "You can enter a location in the search bar on the homepage. Our autocomplete feature will suggest popular destinations.",
      },
      {
        question: "Can I see recommendations for places to visit?",
        answer:
          "Yes, based on your past searches and ratings, we recommend top destinations and attractions.",
      },
      {
        question: "How do I save a place for my itinerary?",
        answer:
          "Click the 'Add to Itinerary' button on the destination page to save it to your trip plan.",
      },
    ],
  },
  {
    category: "Booking & Payments",
    questions: [
      {
        question: "How can I book accommodations through the platform?",
        answer:
          "After searching for a destination, go to the 'Hotels' section and apply filters like price, rating, or amenities before booking.",
      },
      {
        question: "Do I need to pay in advance for hotel bookings?",
        answer:
          "It depends on the provider. Some hotels allow free cancellation, while others may require prepayment.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We support credit/debit cards, PayPal, and other secure online payment methods.",
      },
    ],
  },
  {
    category: "Itinerary Management",
    questions: [
      {
        question: "How do I create my travel itinerary?",
        answer:
          "You can add destinations, hotels, and activities to your itinerary. The system will generate a schedule for you.",
      },
      {
        question: "Can I share my itinerary with others?",
        answer:
          "Yes! You can generate a public link to share your itinerary with friends and family.",
      },
      {
        question: "Can others edit my itinerary?",
        answer:
          "No, others can only view your itinerary. They can leave comments, but only the creator can make edits.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      
      {faqData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">{section.category}</h2>
          <div className="space-y-4">
            {section.questions.map((faq, index) => {
              const isOpen = openIndex === sectionIndex * 10 + index;
              return (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <button
                    className="w-full text-left font-medium text-lg flex justify-between items-center"
                    onClick={() => toggleFAQ(sectionIndex * 10 + index)}
                  >
                    {faq.question}
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && <p className="mt-2 text-gray-700">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
