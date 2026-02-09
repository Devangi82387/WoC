import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../style/Auth.css";


const ServiceProviderAuth = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    category: "",
    city: "",
    budget: "",
    mobileNo: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        mode === "login" ? "/provider/login" : "/provider/register";

      const payload =
        mode === "login"
          ? { email: formData.email, password: formData.password }
          : { ...formData };

      const res = await api.post(url, payload);
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);

      if (mode === "login") {
        navigate("/providerDashboard");
      }

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

            <select name="category" onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="budget" placeholder="Budget" onChange={handleChange} required />
            <input name="mobileNo" placeholder="Mobile No" onChange={handleChange} required />
          </>
        )}

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <button type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
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

export default ServiceProviderAuth;
