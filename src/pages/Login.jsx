import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/output.css"; // Tailwind Output CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // New state for success message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setSuccess("Login Successful! Redirecting...");
        setTimeout(() => {
          navigate("/users"); // Redirect to the Users page after a short delay
        }, 2000);
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <Card
        className="shadow-lg rounded-lg"
        style={{ width: "400px", padding: "20px", backgroundColor: "#f8f9fa" }}
      >
        <CardContent>
          <Typography
            variant="h4"
            className="text-center mb-4 font-bold"
            style={{
              backgroundColor: "#343a40",
              color: "#f8f9fa",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            EmployWise Login
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography color="error" className="mb-2">
              {error}
            </Typography>
          )}

          {/* Success Message */}
          {success && (
            <Typography
              color="primary"
              className="mb-2 text-center font-bold"
              style={{
                fontSize: "1rem",
                color: "green",
              }}
            >
              {success}
            </Typography>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#6c757d", color: "#f8f9fa" }}
              fullWidth
              className="mt-4"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
