import React, { useState } from "react";
import CustomerAuth from "./CustomerAuth";
import ServiceProviderAuth from "./ServiceProviderAuth";
import AdminAuth from "./AdminAuth";
import "../style/Home.css";   

const Home = () => {
  const [type, setType] = useState(""); 

  if (type === "customer") return <CustomerAuth />;
  if (type === "provider") return <ServiceProviderAuth />;
  if (type === "admin") return <AdminAuth />;

  return (
    <div className="home-container">

      <div className="home-card">

        <h1 className="home-title">
          Welcome to Service-bee
        </h1>

        <p className="home-subtitle">
          Choose your role to continue
        </p>

        <div className="home-buttons">

          <button 
            className="home-btn customer-btn"
            onClick={() => setType("customer")}
          >
            Customer
          </button>

          <button 
            className="home-btn provider-btn"
            onClick={() => setType("provider")}
          >
            Service Provider
          </button>

          <button 
            className="home-btn admin-btn"
            onClick={() => setType("admin")}
          >
            Admin
          </button>

        </div>

      </div>

    </div>
  );
};

export default Home;