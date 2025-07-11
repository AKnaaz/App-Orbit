import React from 'react';
import bannerImage from '../../../assets/banner.jpg'; 
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div
      className="text-white py-24 px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between"
      style={{
        background: "linear-gradient(90deg, #0B1120 0%, #1E1B4B 40%, #3B0764 70%, #7C3AED 100%)"
      }}
    >
      {/* Left Text Content */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
          Empowering Developers <br />
          <span className="text-[#F472B6]">With the Best Tools</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg mb-6">
          Discover trending web apps, AI tools, and digital products — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link to="/products">
            <button className="bg-gradient-to-r from-blue-900 to-purple-800 px-6 py-3 rounded-lg font-semibold">
              Explore Now
            </button>
          </Link>
          <Link to="/dashboard/add-product">
            <button className="border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white px-6 py-3 rounded-lg font-semibold">
            Add Your Product
          </button>
          </Link>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <img
          src={bannerImage}
          alt="Tech Banner"
          className="w-[100%] max-w-md shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default Banner;
