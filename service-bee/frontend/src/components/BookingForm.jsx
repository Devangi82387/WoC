import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

import"../style/BookingForm.css";

const BookingForm = () => {
  const { id } = useParams(); // providerId
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await api.get(`/provider/${id}`);
        setProvider(res.data);
      } catch {
        alert("Provider not found");
        navigate("/");
      }
    };
    fetchProvider();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/bookings", {
        providerId: id,
        description,
        address,
      });

      alert("Booking successful!");
      navigate("/mybookings");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (!provider) return <h2>Loading...</h2>;

  return (
    <div className="booking-form">
      <h2>Book {provider.name}</h2>

      <p><b>Category:</b> {provider.category?.name}</p>
      <p><b>City:</b> {provider.city}</p>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter service address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
