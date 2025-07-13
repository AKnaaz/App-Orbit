import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReportedContents = () => {
 const axiosSecure = useAxiosSecure();

    const { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['reported-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reports');
            return res.data;
        }
    });

    
    const handleDelete = async (productId) => {
    try {
        const res = await axiosSecure.delete(`/reports/${productId.toString()}`);
        refetch();
        console.log(res.data);
    } catch (err) {
        console.error('Delete failed:', err);
    }
    };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#423d92] shadow-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gradient-to-r from-[#1e3d8d] via-[#1E1B4B] to-[#3B0764] text-white uppercase text-xs font-bold">
          <tr>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">View Details</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#423d92] text-white">
          {reportedProducts.map((product) => (
            <tr key={product._id} className="hover:bg-[#1e3d8d]">
              <td className="px-6 py-4 font-medium">{product.productName}</td>
              <td className="px-6 py-4">
                <Link to={`/product/${product.productId}`}>
                    <button className="btn btn-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        View Details
                    </button>
                </Link>
              </td>
              <td className="px-6 py-4">
                <button
                onClick={() => handleDelete(product.productId)}  // productId পাঠাচ্ছি
                className="btn btn-xs bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {reportedProducts.length === 0 && (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No reported products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedContents;
