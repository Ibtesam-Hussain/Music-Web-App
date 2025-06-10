import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username); 
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-black px-4 py-3 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        <Link to="/HomePage" className="text-white text-2xl font-bold ml-20">
          Music Website
        </Link>
        <div className="p-4 text-white">
            {username && (
              <h1 className="text-3xl font-semibold">Welcome, {username}!</h1>
            )}
        </div>
        {/* Desktop Links */}
        <div className="hidden laptop:flex space-x-4">
          <Link to="/NewReleases" className="text-white hover:text-yellow mr-20">New Releases</Link>
        </div>

        {/* Mobile Dropdown Button */}
        <div className="laptop:hidden">
          <button onClick={toggleDropdown}>
            <FaBars className="text-white text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-black2 text-white laptop:hidden shadow-md">
          <ul className="flex flex-col space-y-2 px-4 py-3 border-t border-gray-600">
            {['Home', 'Albums', 'Songs', 'Artists', 'Playlists', 'Saved'].map(item => (
              <li key={item}>
                <Link
                  to="/"
                  className="block text-white hover:bg-white/10 p-2 rounded-md"
                  onClick={() => setDropdownOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2">
            <button className="w-full bg-red-400 hover:bg-red-600 text-white py-2 rounded-md">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
