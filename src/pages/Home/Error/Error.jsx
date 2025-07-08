import React from 'react';
import { Link } from 'react-router';
import errorImage from '../../../assets/404.avif';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0B1120] via-[#1E1B4B] to-[#3B0764] text-white px-4">
      <img
        src={errorImage}
        alt="404 - Page Not Found"
        className="w-[200px] md:w-[300px] lg:w-[300px] mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-purple-700 hover:bg-purple-800  text-white px-6 py-3 rounded-lg font-semibold">
         Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
