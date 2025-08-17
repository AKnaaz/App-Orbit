import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading/Loading';
import { FaUser, FaStar, FaBox } from 'react-icons/fa';

const COLORS = ['#22C55E', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminStatistics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-statistics');
      return res.data;
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-error">Failed to fetch statistics.</p>;

  const { productStatusCounts, totalUsers, totalReviews } = data || {};

  const pieData = [
    ...productStatusCounts,
    { status: 'Users', count: totalUsers },
    { status: 'Reviews', count: totalReviews }
  ];

  // Summary cards info
  const summaryCards = [
    { title: 'Total Users', value: totalUsers, icon: <FaUser className="h-8 w-8 text-white" />, bg: 'bg-green-500' },
    { title: 'Total Reviews', value: totalReviews, icon: <FaStar className="h-8 w-8 text-white" />, bg: 'bg-yellow-500' },
    { title: 'Total Products', value: productStatusCounts.reduce((sum, item) => sum + item.count, 0), icon: <FaBox className="h-8 w-8 text-white" />, bg: 'bg-blue-500' },
  ];

  return (
    <div className="py-24 px-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Statistics Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="flex items-center p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <div className={`${card.bg} p-4 rounded-full mr-4`}>
              {card.icon}
            </div>
            <div>
              <p>{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ status, percent }) =>
              `${status}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      <div className='p-5 space-y-6'>
          <p>
            <strong>Total Users:</strong>
            The total users metric represents the number of registered users on the platform. It helps to understand the overall growth and adoption of the system. A higher number of users indicates better engagement and reach, reflecting the platform’s popularity. Tracking this metric over time allows administrators to identify trends, plan marketing strategies, and allocate resources efficiently. It also provides insight into user retention and activity patterns, highlighting how effectively the platform is meeting user needs. Understanding the total user count is essential for evaluating performance, attracting investors, and making informed decisions about feature development. Additionally, it can guide regional or demographic analysis to target specific audiences. Overall, this metric is a key indicator of the platform’s success and growth trajectory.</p>

        <p>
          <strong>Total Reviews:</strong>
          The total reviews metric shows the cumulative feedback provided by users on various products. It serves as a measure of user satisfaction and interaction with the platform. Higher review numbers often indicate active engagement and trust in the system. By analyzing reviews, administrators can identify popular or highly-rated products as well as items that need improvement. This information is valuable for quality control, product enhancement, and marketing campaigns. Tracking reviews over time helps to spot trends, understand customer preferences, and assess the effectiveness of new features. It also aids in maintaining transparency and credibility on the platform. Ultimately, total reviews provide critical insight into the platform’s performance from the users’ perspective.
        </p>

        <p>
          <strong>Total Products:</strong>
          The total products metric reflects the number of active products listed on the platform. It helps gauge the variety and diversity of offerings available to users. A larger product catalog suggests a richer user experience and increased opportunities for engagement. Monitoring this metric allows administrators to understand which product categories are most popular and identify trends over time. It also supports planning for promotions, discounts, and inventory management. By analyzing total products, the platform can make informed decisions regarding product expansion or removal. This metric also provides insights into user preferences and guides strategic planning. Overall, it serves as a key indicator of the platform’s content richness and growth potential.
        </p>
        
      </div>
    </div>
  );
};

export default AdminStatistics;
