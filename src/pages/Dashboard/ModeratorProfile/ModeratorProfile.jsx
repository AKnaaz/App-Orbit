import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { FaCheckCircle, FaEnvelope, FaFacebook, FaInstagramSquare, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitterSquare, FaUserCircle } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { AiOutlineCrown } from 'react-icons/ai';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading/Loading';

const ProfilePage = () => {
  const { user } = useAuth();
  console.log("come bhai",user)
  const axiosSecure = useAxiosSecure();


  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    }
  });


  if(isLoading) {
    return <Loading></Loading>
  };

  const users = {
    phone: '+880 1234-567890',
    address: 'Chittagong, Bangladesh',
    bio: `${user?.displayName || "Anonymous User"} is a dedicated moderator who ensures fair content management, reviews user reports, and maintains community guidelines. He works closely with the admin team to create a safe and engaging platform experience for all users.`,
  };

  return (
    <div
      className="max-w-4xl mx-auto mt-16 p-8 rounded-2xl shadow-xl">
      <div className="flex flex-col items-center text-center">
        <img
          src={user?.photoURL || 'https://i.ibb.co/Tm0zmRM/user.png'}
          alt="User"
          className="w-36 h-36 rounded-full object-cover border-4 border-[#FF8000] mb-4 shadow-lg"
        />
        <h2 className="text-2xl font-bold mb-2">{user?.displayName || 'Anonymous User'}</h2>

        {/* Bio */}
        <p className="mb-8 px-4 md:px-0">{users.bio}</p>

        {/* Info Card + Social Links */}
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
                  {/* Info Card */}
                  <div className="flex-1 rounded-lg p-6 space-y-4 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center gap-3">
                      <FaEnvelope className="text-blue-500" />
                      <span>{user?.email}</span>
                    </div>
        
                    <div className="flex items-center justify-center gap-3">
                      <FaPhoneAlt className="text-green-500" />
                      <span>{users.phone}</span>
                    </div>
        
                    <div className="flex items-center justify-center gap-3">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>{users.address}</span>
                    </div>
                  </div>
        
                  {/* Social Links */}
                  <div className="flex-1 flex justify-center gap-8 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <a href="https://www.facebook.com/anmoon.islam.31"><FaFacebook className='text-blue-400' size={25}/></a>
                    <a href="https://www.instagram.com/?hl=en"><FaInstagramSquare className='text-pink-400' size={25}/></a>
                    <a href="https://x.com/Moontahasafiq"><FaTwitterSquare className='text-black' size={25}/></a>
                    <a href="https://www.linkedin.com/in/nazatakter-dev"><FaLinkedin className='text-blue-400' size={25}/></a>
                  </div>
                </div>
      </div>
    </div>
  );
};

export default ProfilePage;
