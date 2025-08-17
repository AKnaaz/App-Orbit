import React from 'react';
import bannerImage from '../../../assets/banner3.webp'; 
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div
      className="py-24 px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between md:gap-10">
      {/* Left Text Content */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
          Empowering Developers <br />
          <span className="text-[#FF8000]">With the Best Tools</span>
        </h1>
        <p className="text-base md:text-lg mb-6">
          Discover trending web apps, AI tools, and digital products — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link to="/products">
            <button className="btn btn-outline rounded-3xl font-bold hover:bg-[#FF8000]">
              Explore Now
            </button>
          </Link>
          <Link to="/dashboard/add-product">
            <button className="btn btn-outline rounded-3xl font-bold hover:bg-[#FF8000]">
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
          className="w-[100%] shadow-xl"
        />
      </motion.div>
    </div>
  );
};

export default Banner;
