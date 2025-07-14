import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p className="text-error">Failed to fetch statistics.</p>;

  const { productStatusCounts, totalUsers, totalReviews } = data || {};

  const pieData = [
    ...productStatusCounts,
    { status: 'Users', count: totalUsers },
    { status: 'Reviews', count: totalReviews }
  ];

  return (
    <div className="bg-base-100 py-24 px-4 rounded-lg shadow border border-base-300"
      style={{
        background: "linear-gradient(90deg, #0B1120 0%, #1E1B4B 40%, #3B0764 70%, #7C3AED 100%)"
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center py-10 text-purple-600"> Admin Statistics Overview</h2>
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
    </div>
  );
};

export default AdminStatistics;
