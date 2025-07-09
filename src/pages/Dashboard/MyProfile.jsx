import React from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import profileBg from '../../assets/bridge.jpg'; // তোমার পছন্দমত BG
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa';
import { AiOutlineCrown } from 'react-icons/ai';
import { IoMail } from 'react-icons/io5';

const MyProfile = () => {
  const { user } = useAuth();

  const isSubscribed = false; // এটা ডাটাবেজ থেকে আনবা
  const subscriptionPrice = '$9.99';

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage: `url(${profileBg})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-2xl p-8 rounded-xl shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={user?.photoURL || 'https://i.ibb.co/Tm0zmRM/user.png'}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-md"
          />
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaUserCircle className="text-white text-3xl" />
            {user?.displayName || "Anonymous User"}</h2>
          <p className="text-white text-opacity-80 flex items-center gap-2">
            <IoMail className="text-white text-3xl" size={20}/>
            {user?.email}</p>

          {
            isSubscribed ? (
              <div className="mt-4 flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full text-white font-semibold">
                <FaCheckCircle />
                Verified Member
              </div>
            ) : (
               <div className="mt-6">
            <button className="btn bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold px-6 rounded-full">
              <AiOutlineCrown className="text-xl mr-1" />
              Subscribe for ${subscriptionPrice}
            </button>
          </div>
            )
          }
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
