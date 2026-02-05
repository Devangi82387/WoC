import React, { useState } from "react";
import CustomerAuth from "./CustomerAuth";
import ServiceProviderAuth from "./ServiceProviderAuth";
import AdminAuth from "./AdminAuth";

const Home = () => {
  const [type, setType] = useState(""); 

  if (type === "customer") return <CustomerAuth />;
  if (type === "provider") return <ServiceProviderAuth />;
  if (type === "admin") return <AdminAuth />;

  return (
    <div className="home-container">
      <h1>Welcome! Choose your role:</h1>
      <button onClick={() => setType("customer")}>Customer</button>
      <button onClick={() => setType("provider")}>Service Provider</button>
      <button onClick={() => setType("admin")}>Admin</button>
    </div>
  );
};

export default Home;
