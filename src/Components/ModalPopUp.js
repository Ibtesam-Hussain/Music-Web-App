import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-600 via-gray-400 to-gray-900 text-white p-8 rounded-2xl shadow-2xl transform transition-all duration-500 scale-95 hover:scale-100 max-w-2xl"
      >
        <h2 className="text-5xl font-bold text-center mb-6 tracking-wide">
          🎵 Welcome to <span className="text-purple">My Music Web</span>!
        </h2>
        <p className="text-center text-black mb-8">
          Dive into your personalized music universe.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/Login">
            <button className="px-6 py-2 bg-indigo-500 hover:bg-pink-400 text-white rounded-full transition duration-300 shadow-md">
              Login
            </button>
          </Link>
          <Link to="/Register">
            <button className="px-6 py-2 bg-pink-500 hover:bg-pink-400 text-white rounded-full transition duration-300 shadow-md">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
