import React, { useState } from 'react';
import  Modal  from '../Components/ModalPopUp';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-500 via-green-500 to-purple overflow-hidden ">
      {/* Sliding Background Images */}
      <div className="absolute inset-0 flex opacity-40">
        <div className="flex-shrink-0 w-screen bg-cover bg-center animate-slide bg-image1"></div>
        <div className="flex-shrink-0 w-screen bg-cover bg-center animate-slide bg-image2"></div>
        <div className="flex-shrink-0 w-screen bg-cover bg-center animate-slide bg-image3"></div>
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex justify-center items-center flex-col text-white text-center z-10">
        <h1 className="text-9xl font-semibold tracking-wide mb-4">MY MUSIC WEB APP</h1>
        <p className="text-3xl mb-6">"Your one-stop destination for exploring, discovering, and enjoying music."</p>
        <button 
          onClick={toggleModal} 
          className="px-8 py-3 text-2xl border-white text-white hover:bg-yellow hover:text-black rounded-lg font-semibold transition duration-300"
        >
          Get Started
        </button>
      </div>

      {/* Modal for Login & Register */}
      {showModal && <Modal onClose={toggleModal} />}
    </div>
  );
};

export default LandingPage;
