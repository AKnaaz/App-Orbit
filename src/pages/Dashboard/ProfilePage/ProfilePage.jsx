import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

const ProfilePage = () => {
  const user = {
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    name: 'Parul',
    email: 'pa@rul.com',
    phone: '+880 1234-567890',
    address: 'Chittagong, Bangladesh',
    bio: 'Parul is an experienced admin who manages the platform efficiently, oversees user activity, monitors content quality, and ensures smooth operation of all services. With a keen eye for detail and strong leadership skills, she maintains the platform’s integrity and user satisfaction.',
    skills: ['Management', 'Content Moderation', 'Team Leadership', 'Customer Support', 'Analytics'],
    stats: [
      { label: 'Managed Users', value: 150 },
      { label: 'Posts Reviewed', value: 320 },
      { label: 'Reports Handled', value: 50 },
    ],
    joined: 'January 1, 2023',
    lastActive: '2 days ago',
    role: 'Admin',
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
        <h2 className="text-4xl font-bold mb-2">{user.name}</h2>

        {/* Role Highlight */}
        <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-medium mb-4 w-full md:w-3/4 mx-auto rounded-lg">
          {user.role} Role: Oversees all user activity and moderates content.
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
            <a href="https://www.facebook.com/anmoon.islam.31"><FaFacebook className='text-blue-400' size={25}/></a>
            <a href="https://www.instagram.com/?hl=en"><FaInstagramSquare className='text-pink-400' size={25}/></a>
            <a href="https://x.com/Moontahasafiq"><FaTwitterSquare className='text-black' size={25}/></a>
            <a href="https://www.linkedin.com/in/nazatakter-dev"><FaLinkedin className='text-blue-400' size={25}/></a>
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

export default ProfilePage;
