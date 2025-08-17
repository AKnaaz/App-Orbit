import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { FaUser, FaStar, FaBook } from 'react-icons/fa';

const UserStatistics = () => {
  // Dummy data for user stats
  const summaryCards = [
    { title: 'Posts Created', value: 45, icon: <FaBook className="h-8 w-8 text-white" />, bg: 'bg-blue-500' },
    { title: 'Followers', value: 120, icon: <FaUser className="h-8 w-8 text-white" />, bg: 'bg-green-500' },
    { title: 'Reviews Given', value: 30, icon: <FaStar className="h-8 w-8 text-white" />, bg: 'bg-yellow-500' },
  ];

  const barData = [
    { name: 'Jan', Posts: 5, Followers: 10, Reviews: 2 },
    { name: 'Feb', Posts: 8, Followers: 15, Reviews: 5 },
    { name: 'Mar', Posts: 10, Followers: 20, Reviews: 8 },
    { name: 'Apr', Posts: 12, Followers: 25, Reviews: 7 },
    { name: 'May', Posts: 10, Followers: 30, Reviews: 5 },
    { name: 'Jun', Posts: 15, Followers: 35, Reviews: 3 },
  ];

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">User Statistics Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="flex items-center p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <div className={`${card.bg} p-4 rounded-full mr-4`}>
              {card.icon}
            </div>
            <div>
              <p className="font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={barData}
          margin={{
            top: 20, right: 30, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Bar dataKey="Posts" fill="#3B82F6" />
          <Bar dataKey="Followers" fill="#22C55E" />
          <Bar dataKey="Reviews" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>

      {/* Description / Info */}
      <div className="p-5 space-y-4 mt-6">
        <p>
          <strong>Posts Created:</strong> This shows the total number of posts the user has created over time. It helps track user activity and engagement with the platform.
        </p>
        <p>
          <strong>Followers:</strong> Total followers indicate the user’s popularity and reach within the platform. More followers usually reflect active interaction and trust.
        </p>
        <p>
          <strong>Reviews Given:</strong> Represents how many reviews the user has provided on different content or products. It reflects user participation and feedback contribution.
        </p>
      </div>
    </div>
  );
};

export default UserStatistics;
