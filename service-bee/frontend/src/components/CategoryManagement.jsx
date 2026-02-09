import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../style/CategoryManagement.css";

const CategoryManagement = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // pagination states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // search state
  const [search, setSearch] = useState("");

  const limit = 5;


  const fetchCategories = async () => {

    try {
      const res = await api.get(
        `/categories?page=${page}&limit=${limit}&search=${search}`
      );

      setCategories(res.data.categories);
      setPages(res.data.pages);

    } catch (err) {

      alert("Failed to load categories");
    }
  };


  useEffect(() => {
    fetchCategories();
  }, [page, search]);


  const handleAddCategory = async () => {
  try {

    await api.post(
      "/categories",
      { name: newCategory },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      }
    );

    setNewCategory("");
    fetchCategories();

  } catch (err) {
    alert(err.response?.data?.message || "Failed to add category");
  }
};


  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );

      fetchCategories();

    } catch {
      alert("Delete failed");
    }
  };


  const startEdit = (category) => {
    setEditId(category._id);
    setEditName(category.name);
  };


  const handleUpdate = async () => {
    try {
      await api.put(
        `/categories/${editId}`,
        { name: editName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );

      setEditId(null);
      fetchCategories();

    } catch {
      alert("Update failed");
    }
  };


  const goBack = () => {
    navigate("/adminDashboard");
  };


  return (

    <div className="category-container">

  <div className="category-header">
    <h1>Category Management</h1>
    <button className="back-btn" onClick={goBack}>
      Back to Dashboard
    </button>
  </div>

  <div className="search-box">
    <input
      type="text"
      placeholder="Search category..."
      value={search}
      onChange={(e) => {
        setPage(1);
        setSearch(e.target.value);
      }}
    />
  </div>

  <div className="add-category">
    <input
      type="text"
      placeholder="New category"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
    />

    <button onClick={handleAddCategory}>
      Add
    </button>
  </div>

  <div className="category-list">

    {categories.map((category) => (

      <div key={category._id} className="category-item">

        {editId === category._id ? (

          <>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <div className="category-actions">
              <button className="save-btn" onClick={handleUpdate}>
                Save
              </button>
            </div>
          </>

        ) : (

          <>
            <span className="category-name">
              {category.name}
            </span>

            <div className="category-actions">

              <button
                className="edit-btn"
                onClick={() => startEdit(category)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>

            </div>

          </>

        )}

      </div>

    ))}

  </div>

  <div className="pagination">

    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Prev
    </button>

    <span>
      Page {page} of {pages}
    </span>

    <button
      disabled={page === pages}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>

  </div>

</div>

  );
};

export default CategoryManagement;