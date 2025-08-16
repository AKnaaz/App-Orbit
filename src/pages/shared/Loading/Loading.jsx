import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      
      {/* Spinner Icon */}
      <FaCircleNotch className="animate-spin text-5xl text-[#FF8000] mb-4" />

      {/* Loading Text */}
      <p className="text-xl font-semibold animate-pulse">
        Loading AppOrbit...
      </p>
    </div>
  );
};

export default Loading;
