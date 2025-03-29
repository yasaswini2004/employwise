// src/pages/EditUser.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Authentication Validation
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    } else {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://reqres.in/api/users/${id}`
      );
      setUser(response.data.data);
    } catch (error) {
      setMessage("Error fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `https://reqres.in/api/users/${id}`,
        user
      );
      setMessage("User updated successfully!");

      navigate("/users", { state: { updatedUser: { id, ...user } } });
    } catch (error) {
      setMessage("Error updating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-4">Edit User</h2>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
          {message && <Alert severity="info">{message}</Alert>}
          <TextField
            label="First Name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            fullWidth
          >
            Update User
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditUser;
