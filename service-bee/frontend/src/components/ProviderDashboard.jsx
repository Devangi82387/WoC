import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {jwtDecode} from "jwt-decode";

import "../style/ProviderDashboard.css";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const providerId = token ? jwtDecode(token).id : null;

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/provider");
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Failed to load bookings");
    }
  };

  const fetchProviderRating = async () => {
    if (!providerId) return;

    try {
      const res = await api.get(`/provider/${providerId}`);
      setAvgRating(res.data.averageRating || 0);
    } catch (err) {
      console.log("Failed to load rating");
    }
  };

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchBookings(), fetchProviderRating()]);
      setLoading(false);
    };
    load();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    if (!window.confirm(`Change status to "${newStatus}"?`)) return;

    try {
      await api.patch(`/bookings/${bookingId}/status`, { status: newStatus });

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );

      alert("Status updated");
    } catch (err) {
      alert("Status update failed");
    }
  };

  const goToChat = (bookingId) => {
    navigate(`/chat/${bookingId}`);
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="provider-dashboard">
      <h2>Service Provider Dashboard</h2>

      {/* ⭐ AVERAGE RATING */}
      <div className="rating-box">
        <h3>
          ⭐ Average Rating:{" "}
          <span style={{ color: "#f39c12" }}>{avgRating.toFixed(1)} / 5</span>
        </h3>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <p>
              <b>Customer:</b> {b.customer?.firstName} {b.customer?.lastName}
            </p>
            <p>
              <b>Mobile:</b> {b.customer?.mobileNo || "N/A"}
            </p>
            <p>
              <b>Category:</b> {b.category?.name}
            </p>
            <p>
              <b>Booked On:</b> {new Date(b.createdAt).toLocaleDateString()}
            </p>

            {/* Booking Status */}
            <select
              value={b.status}
              disabled={["completed", "cancelled"].includes(b.status)}
              onChange={(e) => handleStatusChange(b._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Chat Button */}
            <button onClick={() => goToChat(b._id)} style={{ marginLeft: "10px" }}>
              Chat
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProviderDashboard;