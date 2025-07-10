import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { AiOutlineCrown } from 'react-icons/ai';
import profileBg from '../../../assets/bridge.jpg';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyProfile = () => {
  const { user } = useAuth();
  console.log("come bhai",user)
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const subscriptionPrice = '$9.99';


  const handleSubscribe = async(email) => {
     try {
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        isSubscribed: false, 
      };

      const res = await axiosSecure.post('/user', userInfo); 
      console.log(res.data);

      navigate(`/dashboard/payment/${email}`);
    } catch (error) {
      console.error('Error subscribing user:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${profileBg})`
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white border-opacity-20 text-center"
       style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }}
      >
        <img
          src={user?.photoURL || 'https://i.ibb.co/Tm0zmRM/user.png'}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300 shadow"
        />
        <h2 className="text-xl font-bold text-white mt-4 flex items-center justify-center gap-2">
          <FaUserCircle className="text-white text-2xl" />
          {user?.displayName || 'Anonymous User'}
        </h2>
        <p className="text-white text-opacity-80 flex items-center justify-center gap-2 mt-1">
          <IoMail className="text-white" />
          {user?.email}
        </p>
        <button
            onClick={() => handleSubscribe(user.email)}
            className="mt-6 btn btn-wide bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold rounded-3xl"
          >
            <AiOutlineCrown className="text-xl mr-1" />
            Subscribe for {subscriptionPrice}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
