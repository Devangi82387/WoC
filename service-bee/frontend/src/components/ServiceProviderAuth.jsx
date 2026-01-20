import React, { useState } from "react";
import api from "../api/axios";
import "../Auth.css";


const ServiceProviderAuth = () => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", description: "", category: "", city: "", budget: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = mode === "login" ? "/providers/login" : "/providers/register";
      let payload = mode === "login"
        ? { email: formData.email, password: formData.password }
        : { ...formData };

      const res = await api.post(url, payload, { withCredentials: true });
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>{mode.toUpperCase()} as Service Provider</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="description" placeholder="Description" onChange={handleChange} required />
            <input name="category" placeholder="Category" onChange={handleChange} required />
            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="budget" placeholder="Budget" onChange={handleChange} required />
          </>
        )}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default ServiceProviderAuth;
