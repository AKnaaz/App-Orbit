import React, { useEffect, useState } from 'react';
import { AiTwotoneLike } from "react-icons/ai";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const limit = 6;
  const totalPages = Math.ceil(totalProducts / limit);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/test-products/accepted?page=${page}&limit=${limit}`)
      .then(res => {
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
      });
  }, [axiosSecure, page]);

  const handleProductClick = (id) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/product/${id}`);
    }
  };

  const handleUpvote = async (product) => {
    if (!user) return navigate('/login');
    if (user.email === product.ownerEmail) return;
    if (product.voters.includes(user.email)) return;

    try {
      const res = await axiosSecure.patch(`/products/vote/${product._id}`, {
        email: user.email
      });

      if (res.data.modifiedCount > 0) {
        const updated = await axiosSecure.get(`/test-products/accepted?page=${page}&limit=${limit}`);
        setProducts(updated.data.products);
      }
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 px-4 md:px-10 min-h-screen"
      style={{
        background: "linear-gradient(90deg, #0B1120 0%, #1E1B4B 40%, #3B0764 70%, #7C3AED 100%)"
      }}
    >
      <div className="max-w-md mx-auto mb-16 border rounded">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="rounded-lg shadow-lg overflow-hidden border hover:shadow-2xl transition duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img src={product.productImage} alt={product.productName} className="w-full h-48 bg-black" />
              <div className="p-4">
                <h3
                  onClick={() => handleProductClick(product._id)}
                  className="text-xl font-bold text-white hover:underline mb-2"
                >
                  {product.productName}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="bg-white text-pink-500 px-2 py-1 rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleUpvote(product)}
                    className="flex items-center gap-2 px-4 py-1 bg-pink-600 text-white rounded hover:bg-pink-800 justify-center"
                  >
                    <AiTwotoneLike />
                    <span>{product.votes || 0} Upvotes</span>
                  </button>
                  <p className="text-sm text-gray-300 font-bold">
                    {dayjs(product.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-purple-700 text-white' : 'bg-gray-200 text-black'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
