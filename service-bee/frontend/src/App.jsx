import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CustomerAuth from "./components/CustomerAuth";
import ServiceProviderAuth from "./components/ServiceProviderAuth";
import CustomerDashboard from "./components/CustomerDashboard";
import MyBookings from "./components/MyBookings";
import ProviderDashboard from "./components/ProviderDashboard";
import BookingForm from "./components/BookingForm";
import CategoryManagement from "./components/CategoryManagement";
import AdminDashboard from "./components/AdminDashboard";
import AdminAuth from "./components/AdminAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerAuth />} />
        <Route path="/provider" element={<ServiceProviderAuth />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/customerDashboard" element={<CustomerDashboard />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/providerDashboard" element={<ProviderDashboard />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/category" element={<CategoryManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
