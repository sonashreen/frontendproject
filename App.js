import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]); // State for storing users
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [editId, setEditId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit or update user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
    } else {
      const newUser = {
        ...formData,
        id: users.length + 1, // Mock ID for local state
      };
      setUsers([...users, newUser]);
    }
    resetForm();
  };

  // Edit a user
  const handleEdit = (user) => {
    setFormData(user);
    setEditId(user.id);
  };

  // Delete a user
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
    });
    setEditId(null);
  };

  return (
    <div className="container">
      <h2>User Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Submit"}</button>
      </form>

      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.phone} - {user.email} -{" "}
            {user.address}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
