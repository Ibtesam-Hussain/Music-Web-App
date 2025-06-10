import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      // Show success message
      toast.success(response.data.message, {
        position: "top-right", 
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });

     
      // navigate("/login");
    } catch (err) {
      // Show error message
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-right", 
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      console.log(err.response?.data?.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-orange-400 px-4 mobile:px-6 laptop:px-8">
      <h1 className="text-4xl mobile:text-5xl laptop:text-6xl desktop:text-7xl font-bold mb-6 text-center text-white leading-tight">
        Start your Music Journey With Us.
      </h1>
      <div className="bg-black2 p-6 mobile:p-8 rounded-lg shadow-md w-full max-w-xs mobile:max-w-sm laptop:max-w-md">
        <h2 className="text-xl mobile:text-2xl font-bold mb-6 text-center text-white">
          REGISTER
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm mobile:text-base"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              Register
            </button>
            <Link
              to="/Login"
              className="w-full mobile:w-auto text-center text-pink-400 hover:underline hover:text-purple focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-50"
            >
              Login
            </Link>
          </div>
        </form>
        {error && <p className="text-white text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
