import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // console.log(response.data, response.data.username, response.data.email);
      const user = {
        username: response.data.user.username,
        email: response.data.user.email,
      };
      localStorage.setItem("user", JSON.stringify(user));
  
      if (response && response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        nav("/HomePage"); // Navigate to homepage
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error("Login error:", err); // Log full error for debugging
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-orange-400 px-4 mobile:px-6 laptop:px-8">
      <h1 className="text-4xl mobile:text-5xl laptop:text-6xl desktop:text-7xl font-bold mb-6 text-center text-white leading-tight">
        Welcome Back to Your Music Journey
      </h1>
      <div className="bg-black2 p-6 mobile:p-8 rounded-lg shadow-md w-full max-w-xs mobile:max-w-sm laptop:max-w-md">
        <h2 className="text-xl mobile:text-2xl font-bold mb-6 text-center text-white">
          Login to Enjoy Again
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm mobile:text-base"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm mobile:text-base"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mobile:flex-row items-center justify-between gap-4">
            <button
              className="w-full mobile:w-auto bg-pink-400 text-white py-2 px-4 rounded-lg hover:bg-purple focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-50 transition-colors"
              type="submit"
            >
              Login
            </button>
            <Link
              to="/Register"
              className="w-full mobile:w-auto text-center text-pink-400 hover:underline hover:text-purple focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-50"
            >
              Register
            </Link>
          </div>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
