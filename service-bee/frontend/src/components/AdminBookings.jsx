import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import "../style/AdminBookings.css";

const AdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/all"); // Admin sees all bookings
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        alert("Please login again");
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <h2>Loading bookings...</h2>;

  return (
    <div className="admin-bookings-container">

  <div className="admin-bookings-header">
    <h2>All Bookings</h2>

    <button
      className="back-btn"
      onClick={() => navigate("/adminDashboard")}
    >
      Back
    </button>
  </div>

  {bookings.length === 0 ? (

    <p className="empty-msg">No bookings found</p>

  ) : (

    <div className="bookings-grid">

      {bookings.map((b) => (

        <div key={b._id} className="booking-card">

          <h3>
            {b.customer?.firstName || "No customer"}
          </h3>

          <p>
            <b>Service Provider:</b>{" "}
            {b.serviceProvider?.name || "No provider"}
          </p>

          <p>
            <b>Category:</b>{" "}
            {b.category?.name || "No category"}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span className={`status ${b.status}`}>
              {b.status?.toUpperCase()}
            </span>
          </p>

          <button
            className="chat-btn"
            onClick={() => navigate(`/chat/${b._id}`)}
          >
            Open Chat
          </button>

        </div>

      ))}

    </div>

  )}

</div>
  );
};

export default AdminBookings;