import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaCheckCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineCrown } from 'react-icons/ai';
import bgImage from '../../assets/bridge.jpg'; // ⬅️ নিজের image path দাও

const MyProfile = () => {
  const { user } = useAuth();
  const isSubscribed = user?.isSubscribed; // dynamic data if available
  const subscriptionAmount = 999;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="w-full max-w-md p-8 rounded-xl shadow-2xl text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg object-cover"
            src={user?.photoURL || 'https://i.ibb.co/2kR3j1M/default-avatar.jpg'}
            alt="User Avatar"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <BsPersonFill /> {user?.displayName || 'Anonymous'}
        </h2>
        <p className="text-white flex items-center justify-center gap-1 mb-4">
          <MdEmail /> {user?.email}
        </p>

        {/* Subscription Status */}
        {isSubscribed ? (
          <div className="mt-2 flex items-center justify-center gap-2 text-green-300 font-semibold">
            <FaCheckCircle className="text-xl" />
            Status: Verified
          </div>
        ) : (
          <div className="mt-6">
            <button className="btn bg-gradient-to-r from-gray-70000 to-gray-500 text-white font-bold px-6 rounded-full">
              <AiOutlineCrown className="text-xl mr-1" />
              Subscribe for ${subscriptionAmount}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
