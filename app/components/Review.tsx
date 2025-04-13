import { getSession } from "next-auth/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Review({
  forId,
  forEntity,
}: {
  forId: number;
  forEntity: "hotel" | "place";
}) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    setSubmitting(true);
    const payload = {
      entityId: forId, // replace with actual hotel/place id
      entityTypeName: forEntity, // or "place"
      rating,
      reviewText,
    };

    try {
      const session = await getSession();
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Review submitted!");
        setReviewText("");
        setRating(0);
        window.location.reload()
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {/* Write a Review Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 shadow rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`mr-2 cursor-pointer ${
                (hoverRating || rating) >= star
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{rating} / 5</span>
        </div>

        {/* Review Text Area */}
        <textarea
          className="w-full border bg-white rounded-lg p-3 text-sm"
          rows={4}
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        {/* Submit Button */}
        <div className="mt-4 text-right">
          <button
            disabled={submitting || rating === 0 || reviewText.trim() === ""}
            onClick={handleSubmitReview}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </>
  );
}
