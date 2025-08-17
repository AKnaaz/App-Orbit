import React, { useEffect, useState } from 'react';
import { AiTwotoneLike } from "react-icons/ai";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Loading from '../shared/Loading/Loading';

dayjs.extend(relativeTime);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const limit = 8;
  const totalPages = Math.ceil(totalProducts / limit);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/test-products/accepted?page=${page}&limit=${limit}`)
      .then(res => {
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

   if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-10 px-4 md:px-16 min-h-screen">
      <div className="max-w-md mx-auto mb-16 border rounded">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img src={product.productImage} alt={product.productName} className="w-full h-48" />
              <div className="p-4">
                <h3
                  onClick={() => handleProductClick(product._id)}
                  className="text-xl font-bold hover:underline mb-2 cursor-pointer"
                >
                  {product.productName}
                </h3>
                <p className='text-sm'>{product.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#FF8000] text-white text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleUpvote(product)}
                    className="flex items-center gap-2 btn bg-[#FF8000] text-white rounded hover:bg-[#d17212] justify-center"
                  >
                    <AiTwotoneLike />
                    <span>{product.votes || 0} Upvotes</span>
                  </button>
                  
                  <button 
                  onClick={() => handleProductClick(product._id)} 
                  className='btn bg-[#FF8000] text-white rounded hover:bg-[#d17212]'>View Details</button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-[#FF8000] text-white' : 'bg-gray-200 text-black'}`}
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
