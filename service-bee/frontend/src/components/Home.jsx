import React, { useState } from "react";
import CustomerAuth from "./CustomerAuth";
import ServiceProviderAuth from "./ServiceProviderAuth";

const Home = () => {
  const [type, setType] = useState(""); 

  if (type === "customer") return <CustomerAuth />;
  if (type === "provider") return <ServiceProviderAuth />;

  return (
    <div className="home-container">
      <h1>Welcome! Choose your role:</h1>
      <button onClick={() => setType("customer")}>Customer</button>
      <button onClick={() => setType("provider")}>Service Provider</button>
    </div>
  );
};

export default Home;
