import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CustomerAuth from "./components/CustomerAuth";
import ServiceProviderAuth from "./components/ServiceProviderAuth";
import CustomerDashboard from "./components/CustomerDashboard";
import MyBookings from "./components/MyBookings";
import ProviderDashboard from "./components/ProviderDashboard";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerAuth />} />
        <Route path="/provider" element={<ServiceProviderAuth />} />
        <Route path="/customerDashboard" element={<CustomerDashboard />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/providerDashboard" element={<ProviderDashboard />} />
        <Route path="/book/:id" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
