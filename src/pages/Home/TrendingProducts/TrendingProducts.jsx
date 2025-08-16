import React, { useEffect, useState } from 'react';
import { AiTwotoneLike } from 'react-icons/ai';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get('/products')
      .then(res => {
        const sortedByVotes = res.data
          .sort((a, b) => (b.votes || 0) - (a.votes || 0))
          .slice(0, 4);
        setProducts(sortedByVotes);
      });
  }, [axiosSecure]);

  const handleProductClick = (id) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/product/${id}`);
    }
  };

  const handleUpvote = async (product) => {
    if (!user) {
      return navigate('/login');
    }

    if (user?.email === product?.ownerEmail) return;

    if (product?.voters?.includes(user?.email)) return;

    try {
      const res = await axiosSecure.patch(`/products/vote/${product._id}`, {
        email: user.email
      });

      if (res.data.modifiedCount > 0) {
        axiosSecure.get('/products')
          .then(res => {
            const sortedByVotes = res.data
              .sort((a, b) => (b.votes || 0) - (a.votes || 0))
              .slice(0, 4);
            setProducts(sortedByVotes);
          });
      }
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  return (
    <div className="py-12 px-4 md:px-16 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-16"> Trending Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h3
                onClick={() => handleProductClick(product._id)}
                className="text-xl font-bold hover:underline mb-2 cursor-pointer"
              >
                {product.productName}
              </h3>
              <p className='text-sm'>{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleUpvote(product)}
                  disabled={user?.email === product.ownerEmail || product?.voters?.includes(user?.email)}
                  className={`flex items-center gap-2 justify-center rounded px-4 py-1 transition 
                    ${user?.email === product.ownerEmail || product?.voters?.includes(user?.email) 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' // disabled style
                      : 'bg-[#FF8000] text-white hover:bg-[#d17212]'}`
                  }
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
        ))}
      </div>

      <div className="text-center mt-24">
        <button
          onClick={() => navigate('/products')}
          className="btn bg-[#FF8000] text-white hover:scale-105 transition"
        >
        Show All Products
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;
