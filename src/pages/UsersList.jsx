// src/pages/UsersList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { Edit, Delete, ChevronLeft, ChevronRight } from "@mui/icons-material";

const UsersList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [deletedUserIds, setDeletedUserIds] = useState(
    JSON.parse(localStorage.getItem("deletedUserIds")) || []
  );

  const [updatedUsers, setUpdatedUsers] = useState(
    JSON.parse(localStorage.getItem("updatedUsers")) || {}
  );

  // Centralized token validation
  const validateAuth = () => {
    const token = localStorage.getItem("authToken");
    // If no token, redirect to login
    if (!token) {
      navigate("/");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!validateAuth()) return; // Validate on mount

    if (location.state?.updatedUser) {
      const updatedUser = location.state.updatedUser;
      setUpdatedUsers((prev) => {
        const newUsers = { ...prev, [updatedUser.id]: updatedUser };
        localStorage.setItem("updatedUsers", JSON.stringify(newUsers));
        return newUsers;
      });
      fetchUsers(page);
      setMessage("User updated successfully!");
    } else {
      fetchUsers(page);
    }
  }, [page, location.state]);

  const fetchUsers = async (currentPage) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );

      let fetchedUsers = response.data.data;
      fetchedUsers = fetchedUsers.filter(
        (user) => !deletedUserIds.includes(user.id)
      );

      fetchedUsers = fetchedUsers.map((user) =>
        updatedUsers[user.id] ? updatedUsers[user.id] : user
      );

      setUsers(fetchedUsers);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    if (!validateAuth()) return;
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = async (id) => {
    if (!validateAuth()) return;

    try {
      setLoading(true);
      await axios.delete(`https://reqres.in/api/users/${id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      const updatedDeletedIds = [...deletedUserIds, id];
      setDeletedUserIds(updatedDeletedIds);
      localStorage.setItem("deletedUserIds", JSON.stringify(updatedDeletedIds));

      const updatedUsersCopy = { ...updatedUsers };
      delete updatedUsersCopy[id];
      setUpdatedUsers(updatedUsersCopy);
      localStorage.setItem("updatedUsers", JSON.stringify(updatedUsersCopy));

      setMessage("User deleted successfully!");
    } catch (error) {
      setMessage("Error deleting user.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (!validateAuth()) return;
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (!validateAuth()) return;
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-4">User List</h2>
      {message && <Alert severity="info">{message}</Alert>}
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded shadow-md">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl text-center">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-500 text-center">{user.email}</p>
                <div className="mt-4 flex gap-2 justify-center">
                  <Tooltip title="Edit User">
                    <IconButton onClick={() => handleEdit(user.id)} color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton onClick={() => handleDelete(user.id)} color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <IconButton onClick={handlePreviousPage} disabled={page === 1}>
              <ChevronLeft />
            </IconButton>
            <Typography>
              Page {page} of {totalPages}
            </Typography>
            <IconButton onClick={handleNextPage} disabled={page === totalPages}>
              <ChevronRight />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
