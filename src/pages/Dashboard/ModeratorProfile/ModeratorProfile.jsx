import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

const ModeratorProfile = () => {
  const user = {
    photo: 'https://i.postimg.cc/3rtN7PQn/moderator.webp',
    name: 'Sakib',
    email: 'sakib@moderator.com',
    phone: '+880 1987-654321',
    address: 'Dhaka, Bangladesh',
    bio: 'Sakib is a dedicated moderator who ensures fair content management, reviews user reports, and maintains community guidelines. He works closely with the admin team to create a safe and engaging platform experience for all users.',
    skills: ['Content Review', 'Community Guidelines', 'User Support', 'Problem Solving', 'Decision Making'],
    stats: [
      { label: 'Posts Reviewed', value: 210 },
      { label: 'Reports Resolved', value: 120 },
      { label: 'Warnings Issued', value: 35 },
    ],
    joined: 'March 15, 2023',
    lastActive: '5 hours ago',
    role: 'Moderator',
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 rounded-2xl shadow-xl">
      <div className="flex flex-col items-center text-center">
        {/* Profile Photo */}
        <img
          src={user.photo}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-[#FF8000] mb-4 shadow-lg"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>

        {/* Role Highlight */}
        <div className="p-3 bg-green-100 border-l-4 border-green-500 text-green-800 font-medium mb-4 w-full md:w-3/4 mx-auto rounded-lg">
          {user.role} Role: Maintains community standards and reviews reported content.
        </div>

        {/* Bio */}
        <p className="mb-8 px-4 md:px-0">{user.bio}</p>

        {/* Info Card + Social Links */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
          {/* Info Card */}
          <div className="flex-1 rounded-lg p-6 space-y-4 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center gap-3">
              <FaEnvelope className="text-blue-500" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <FaPhoneAlt className="text-green-500" />
              <span>{user.phone}</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{user.address}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex-1 flex justify-center gap-8 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <a href="https://www.facebook.com/"><FaFacebook className='text-blue-400' size={25}/></a>
            <a href="https://www.instagram.com/"><FaInstagramSquare className='text-pink-400' size={25}/></a>
            <a href="https://x.com/"><FaTwitterSquare className='text-black' size={25}/></a>
            <a href="https://www.linkedin.com/"><FaLinkedin className='text-blue-400' size={25}/></a>
          </div>
        </div>

        {/* Skills */}
        <div className="w-full mb-10">
          <h3 className="text-2xl font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {user.skills.map((skill, idx) => (
              <span key={idx} className="bg-[#FF8000] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-xl transition-all duration-300">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-3 gap-8 text-center mb-8">
          {user.stats.map((stat, idx) => (
            <div key={idx} className="rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Joined Date / Last Active */}
        <p className="text-sm">
          Joined on: {user.joined} | Last active: {user.lastActive}
        </p>
      </div>
    </div>
  );
};

export default ModeratorProfile;
