import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CustomerAuth from "./components/CustomerAuth";
import ServiceProviderAuth from "./components/ServiceProviderAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerAuth />} />
        <Route path="/provider" element={<ServiceProviderAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
