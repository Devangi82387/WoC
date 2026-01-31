import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/customer/me");
        setUser(res.data);
      } catch (err) {
        navigate("/customer");
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const loadData = async () => {
      const catRes = await api.get("/categories");
      setCategories(catRes.data);

      const provRes = await api.get("/provider");
      setProviders(provRes.data);

      const uniqueCities = [...new Set(provRes.data.map(p => p.city))];
      setCities(uniqueCities);
    };
    loadData();
  }, []);

  const filteredProviders = providers.filter(p => {
    return (
      (city ? p.city === city : true) &&
      (category ? p.category?._id === category : true)
    );
  });

  const logout = () => {
  localStorage.removeItem("token");

  alert("Logged out successfully!");

  setTimeout(() => {
    navigate("/customer");
    }, 300);
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2>Service Bee</h2>
        
      </nav>

      <div className="dashboard-body">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h3>My Profile</h3>
          <p><b>Name:</b> {user.firstName} {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Mobile:</b> {user.mobileNo}</p>

          <button onClick={() => navigate("/mybookings")}>
            My Bookings
          </button>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">
          <div className="filters">
            <select onChange={e => setCity(e.target.value)}>
              <option value="">All Cities</option>
              {cities.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>

            <select onChange={e => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="providers">
            {filteredProviders.map(p => (
              <div key={p._id} className="provider-card">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p><b>City:</b> {p.city}</p>
                <p><b>Rating:</b> {p.averageRating || 0} ⭐</p>
                <button onClick={() => navigate(`/book/${p._id}`)}>
                  Book Service
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
