import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const ProductReviewQueue = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ['review-queue'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products');
      return res.data;
    }
  });

  // Sort: Pending first
  const sortedProducts = [...products].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return 0;
  });

  const handleMakeFeatured = async (id) => {
    try {
        const res = await axiosSecure.patch(`/products/feature/${id}`);
        if (res.data.modifiedCount > 0) {
        refetch();
        }
    } catch (err) {
        console.error('Error making featured:', err);
    }
 };

    const handleAccept = async (id) => {
    try {
        const res = await axiosSecure.patch(`/products/accept/${id}`);
        if (res.data.modifiedCount > 0) {
        refetch(); // product list refresh
        }
    } catch (error) {
        console.error("Error accepting product:", error);
    }
 };

    const handleReject = async (id) => {
    try {
        const res = await axiosSecure.patch(`/products/reject/${id}`);
        if (res.data.modifiedCount > 0) {
        refetch(); // Refresh product list
        }
    } catch (error) {
        console.error("Error rejecting product:", error);
    }
 };


  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#423d92] shadow-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gradient-to-r from-[#1e3d8d] via-[#1E1B4B] to-[#3B0764] text-white uppercase text-xs font-bold">
          <tr>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">View Details</th>
            <th className="px-6 py-3">Featured</th>
            <th className="px-6 py-3">Accept</th>
            <th className="px-6 py-3">Reject</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#423d92] text-white">
          {sortedProducts.map((product) => (
            <tr key={product._id} className="hover:bg-[#1e3d8d]">
              <td className="px-6 py-4 font-medium">{product.productName}</td>
              <td className="px-6 py-4 font-medium">
                <Link to={`/product/${product._id}`}>
                  <button className="btn btn-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Details
                  </button>
                </Link>
              </td>
              <td className="px-6 py-4">
                <button
                onClick={() => handleMakeFeatured(product._id)}
                disabled={product.isFeatured}
                className={`btn btn-xs text-white rounded 
                ${product.isFeatured ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                >
                    {product.isFeatured ? 'Featured' : 'Make Featured'}
                </button>
             </td>
             <td className="px-6 py-4">
                <button
                onClick={() => handleAccept(product._id)}
                disabled={product.status === 'accepted'}
                className="btn btn-xs bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {product.status === 'accepted' ? 'Accepted' : 'Accept'}
                </button>
             </td>
              <td className="px-6 py-4">
                <button
                onClick={() => handleReject(product._id)}
                disabled={product.status === 'rejected'}
                className="btn btn-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                {product.status === 'rejected' ? 'Rejected' : 'Reject'}
                </button>
              </td>
            </tr>
          ))}
          {sortedProducts.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                No products in review queue.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReviewQueue;
