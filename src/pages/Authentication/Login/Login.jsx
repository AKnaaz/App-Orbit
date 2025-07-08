import React from 'react';
import bgImage from '../../../assets/login.png'; // পেছনের image এখানে দাও
import { Link } from 'react-router';

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl"
           style={{
             background: 'rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(10px)',
             WebkitBackdropFilter: 'blur(10px)',
             border: '1px solid rgba(255, 255, 255, 0.2)'
           }}>
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login to AppOrbit
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-white mt-4">
          Don't have an account?{' '}
          <Link to="/register">
           <span className="text-purple-500 font-semibold cursor-pointer hover:underline">
            Register here
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
