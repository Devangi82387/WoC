import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">

      {/* Navbar */}
      <nav className="admin-navbar">
        <h2>Service Bee Admin</h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="admin-content">

        <h1>Admin Dashboard</h1>

        <div className="admin-cards">

          <div
            className="admin-card"
            onClick={() => navigate("/admin/category")}
          >
            <h3>Manage Categories</h3>
            <p>Add, update, or delete service categories</p>
          </div>

          <div
            className="admin-card"
            onClick={() => navigate("/admin/bookings")}
          >
            <h3>Customer Chats</h3>
            <p>View bookings and chat with customers</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;