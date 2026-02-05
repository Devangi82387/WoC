import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    navigate("/");
  };

  const goToCategory = () => {

    navigate("/admin/category");
  };

  const goToChat = () => {

    navigate("/admin/chat");
  };

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <button onClick={goToCategory}>
        Change Category
      </button>

      <button onClick={goToChat}>
        Chat with Customer
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
};

export default AdminDashboard;