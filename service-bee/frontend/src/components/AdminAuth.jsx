import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../style/Auth.css";

const AdminAuth = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const url =
        mode === "login"
          ? "/admin/login"
          : "/admin/register";

      const payload =
        mode === "login"
          ? {
              email: formData.email,
              password: formData.password
            }
          : formData;

      const res = await api.post(url, payload);

      localStorage.setItem("token", res.data.token);

      alert(res.data.message);

      if (mode === "login") {
        navigate("/adminDashboard");
      }

    } catch (err) {

      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">

      <h2>{mode.toUpperCase()} as Admin</h2>

      <form onSubmit={handleSubmit}>

        {mode === "register" && (
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">

          {mode === "login"
            ? "Login"
            : "Register"}

        </button>

      </form>

      <h4>

        {mode === "login"
          ? "Don't have account?"
          : "Already have account?"}

      </h4>

      <button
        onClick={() =>
          setMode(
            mode === "login"
              ? "register"
              : "login"
          )
        }
      >
        {mode === "login"
          ? "Register"
          : "Login"}
      </button>

    </div>
  );
};

export default AdminAuth;