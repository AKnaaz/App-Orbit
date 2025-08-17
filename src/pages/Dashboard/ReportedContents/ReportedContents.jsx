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
    <div className="w-full overflow-x-auto border border-[#FF8000] shadow-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#FF8000] text-white uppercase text-xs font-bold">
          <tr>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">View Details</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#FF8000]">
          {reportedProducts.map((product) => (
            <tr key={product._id} className="hover:bg-[#FF8000]">
              <td className="px-6 py-4 font-medium">{product.productName}</td>
              <td className="px-6 py-4">
                <Link to={`/product/${product.productId}`}>
                    <button className="btn btn-xs bg-[#FF8000] text-white rounded hover:bg-[#e77706]">
                        View Details
                    </button>
                </Link>
              </td>
              <td className="px-6 py-4">
                <button
                onClick={() => handleDelete(product.productId)} 
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
