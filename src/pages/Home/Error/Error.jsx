import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#FF8000]">
      <h1 className="text-6xl md:text-9xl font-bold mb-4 text-white">404</h1>
      <h1 className="text-2xl md:text-5xl font-bold mb-4 text-white">Oops! Page Not Found</h1>
      <p className="text-base md:text-xl mb-6 text-white">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-[#FF8000] hover:bg-[#da720a]  text-white btn rounded-lg font-semibold">
         Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
