import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../style/Auth.css";

const CustomerAuth = () => {
  const navigate = useNavigate(); 
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", username: "", email: "", password: "",
    mobileNo: "", age: "", gender: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = mode === "login" ? "/customer/login" : "/customer/register";
      let payload = mode === "login"
        ? { email: formData.email, password: formData.password }
        : { ...formData };

      const res = await api.post(url, payload, { withCredentials: true });
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);

      if (mode === "login") {
      navigate("/customerDashboard");
    }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>{mode.toUpperCase()} as Customer</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
          <h2>Create an account</h2>
            <input name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="mobileNo" placeholder="Mobile No" onChange={handleChange} required />
            <input name="age" placeholder="Age" onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </>
        )}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>

      <h4 style={{ marginTop: "1rem" }}>
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}
      </h4>

      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default CustomerAuth;
