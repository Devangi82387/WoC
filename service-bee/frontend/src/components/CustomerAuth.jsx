import React, { useState } from "react";
import api from "../api/axios";
import "../Auth.css";


const CustomerAuth = () => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", username: "", email: "", password: "",
    mobileNo: "", age: "", gender: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = mode === "login" ? "/customers/login" : "/customers/register";
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
      <h2>{mode.toUpperCase()} as Customer</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
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
      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default CustomerAuth;
