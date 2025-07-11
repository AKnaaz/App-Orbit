import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#0B1120] via-[#1E1B4B] to-[#3B0764] text-white">
      
      {/* Spinner Icon */}
      <FaCircleNotch className="animate-spin text-5xl text-purple-600 mb-4" />

      {/* Loading Text */}
      <p className="text-xl font-semibold animate-pulse">
        Loading AppOrbit...
      </p>
    </div>
  );
};

export default Loading;
