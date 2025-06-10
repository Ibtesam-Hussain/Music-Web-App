import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SidePanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token
    navigate('/'); 
  };

  const menuItems = [
    { label: 'Home', path: '/HomePage' },
    { label: 'Albums', path: '/albums' },
    { label: 'Songs', path: '/AllSongs' },
    { label: 'Artists', path: '/Artists' },
    { label: 'Playlists', path: '/Playlists' },
    { label: 'Saved', path: '/Saved' },
  ];

  return (
    <div className="hidden laptop:flex w-64 flex-col bg-black2 h-full py-8 px-4 items-center rounded-3xl space-y-4 mr-4 my-4 shadow-lg">
      <ul className="w-full space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="p-3 hover:bg-white/10 backdrop-blur-md rounded-lg transition duration-300 w-full text-center"
          >
            <Link
              to={item.path}
              className="text-white text-lg font-medium tracking-wide"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-md transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SidePanel;
