// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/output.css"; // Tailwind Output CSS

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if on login page
  const isLoginPage = location.pathname === "/";

  // Logout Handling
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("users"); // Clear users data if stored
    navigate("/");
    window.location.reload(); // Force reload to clear state
  };

  return (
    <AppBar
      position="static"
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-md"
    >
      <Toolbar className="flex justify-between items-center px-8 py-4">
        {/* Logo Section */}
        <Typography
          variant="h5"
          className="text-white font-extrabold tracking-wide"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.8rem",
            marginRight: "93rem",
          }}
          
        >
          EmployWise
        </Typography>

        {/* Navigation Links and Actions */}
        {!isLoginPage && (
          <Box className="flex items-center space-x-8">
            <Link
              to="/users"
              className="text-white no-underline hover:underline hover:text-gray-300 text-lg font-bold transition-all duration-300"
              style={{
                fontSize: "1.25rem",
                marginRight: "2rem",
              }}
            >
              Users
            </Link>
            <Button
              variant="contained"
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-6 py-2 transition-all duration-300"
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
