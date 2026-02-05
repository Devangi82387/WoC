import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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
    if (!newCategory) return;

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

    } catch {
      alert("Failed to add category");
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

    <div style={{ padding: "20px" }}>

      <h1>Category Management</h1>


      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />


      <div>
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

      <ul>

        {categories.map((category) => (

          <li key={category._id}>

            {editId === category._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <button onClick={handleUpdate}>
                  Save
                </button>
              </>

            ) : (

              <>
                {category.name}

                <button onClick={() => startEdit(category)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(category._id)}>
                  Delete
                </button>
              </>

            )}

          </li>

        ))}

      </ul>

      <div style={{ marginTop: "20px" }}>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>


        <span style={{ margin: "10px" }}>
          Page {page} of {pages}
        </span>


        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>


      <button onClick={goBack}>
        Back to Dashboard
      </button>

    </div>

  );
};

export default CategoryManagement;