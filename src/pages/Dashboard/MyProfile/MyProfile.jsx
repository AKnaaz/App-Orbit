import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { AiOutlineCrown } from 'react-icons/ai';
import profileBg from '../../../assets/bridge.jpg'; // তোমার পছন্দের bg
import useSubscription from '../../../hooks/useSubscription';
import axios from 'axios';
import { useNavigate } from 'react-router';

const MyProfile = () => {
  const { user } = useAuth();
  console.log("come bhai",user)
  const { isSubscribed } = useSubscription(); // return true/false
  const subscriptionPrice = '$9.99';

//   const [loading, setLoading] = useState(false);
  const [subscribedLocally, setSubscribedLocally] = useState(false);

  const navigate = useNavigate();

  const handleSubscribeClick = async () => {
    // setSubscribedLocally(true);
    // এখানে তুমি রিডাইরেক্ট বা মডাল খুলতেও পারো
    // try {
    //   setLoading(true);
    //   const response = await axios.post('http://localhost:3000/api/payment/create-checkout-session', {
    //     email: user?.email,
    //     userId: user?.uid,
    //   });
    //   if (response.data.url) {
    //     window.location.href = response.data.url; // Stripe Checkout এ রিডাইরেক্ট
    //   }
    // } catch (error) {
    //   console.error('Subscription error:', error);
    //   setLoading(false);
    // }
    navigate('/dashboard/payment');

  };

  const showVerified = isSubscribed || subscribedLocally;

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

        {showVerified ? (
          <div className="mt-6 flex items-center justify-center gap-2 bg-green-600 px-4 py-2 rounded-full text-white font-semibold mx-auto w-max">
            <FaCheckCircle />
            Status: Verified
          </div>
        ) : (
          <button
            onClick={handleSubscribeClick}
            className="mt-6 btn btn-wide bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold rounded-3xl"
            // disabled={loading}
          >
            <AiOutlineCrown className="text-xl mr-1" />
            {/* {loading ? 'Redirecting...' : `Subscribe for ${subscriptionPrice}`} */}
            Subscribe for {subscriptionPrice}
          </button>
        )}

        {/* {
          isSubscribed ? (
            <div className="mt-6 flex items-center justify-center gap-2 text-green-400 font-semibold text-lg">
              <FaCheckCircle />
              Status: Verified
            </div>
          ) : (
            <button
              className="mt-6 btn btn-wide bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold rounded-3xl"
            >
              <AiOutlineCrown className="text-xl mr-1" />
              Subscribe for {subscriptionPrice}
            </button>
          )
        } */}

        {/* {
            !isSubscribed && (
                <button
                    className="mt-6 btn btn-wide bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold rounded-3xl"
                    >
                    <AiOutlineCrown className="text-xl mr-1" />
                    Subscribe for {subscriptionPrice}
                </button>
            )
        } */}
      </div>
    </div>
  );
};

export default MyProfile;
