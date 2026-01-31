import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingValue, setRatingValue] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/customer");
        setBookings(res.data);
      } catch (err) {
        alert("Please login again");
        navigate("/customer");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const submitRating = async (bookingId) => {
    try {
      await api.post("/ratings", {
        booking: bookingId,
        rating: ratingValue[bookingId]
      });

      alert("Rating submitted successfully");

      // Refresh bookings
      const res = await api.get("/bookings/customer");
      setBookings(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Rating failed");
    }
  };

  if (loading) return <h2>Loading bookings...</h2>;

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div key={b._id} className="booking-card">
          <h3>{b.serviceProvider.name}</h3>

          <p><b>Category:</b> {b.category.name}</p>
          <p><b>City:</b> {b.serviceProvider.city}</p>
          <p><b>Address:</b> {b.address}</p>
          <p><b>Description:</b> {b.description || "—"}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={`status ${b.status}`}>
              {b.status.toUpperCase()}
            </span>
          </p>

          {/* Rating section */}
          {b.status === "completed" && !b.ratingGiven && (
            <div className="rating-box">
              <select
                onChange={(e) =>
                  setRatingValue({
                    ...ratingValue,
                    [b._id]: Number(e.target.value)
                  })
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Rate service
                </option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} ⭐
                  </option>
                ))}
              </select>

              <button
                disabled={!ratingValue[b._id]}
                onClick={() => submitRating(b._id)}
              >
                Submit Rating
              </button>
            </div>
          )}

          {b.ratingGiven && (
            <p className="rated">
              ⭐ You rated: {b.ratingValue}/5
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
