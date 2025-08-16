import React, { useEffect, useState } from 'react';
import { AiTwotoneLike } from "react-icons/ai";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Loading from '../../shared/Loading/Loading';


dayjs.extend(relativeTime);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  console.log(navigate)
  const { user } = useAuth();

  useEffect(() => {
  axiosSecure.get('/products?featured=true')
    .then(res => {
      const sorted = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
      setProducts(sorted);
      setLoading(false);
    })
    .catch(() => setLoading(false));
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

    if (user?.email === product?.ownerEmail) {
      return; 
    }

    if (product?.voters?.includes(user?.email)) {
      return; 
    }

    try {
      const res = await axiosSecure.patch(`/products/vote/${product._id}`, {
        email: user.email
      });

      if (res.data.modifiedCount > 0) {
        axiosSecure.get('/products')
          .then(res => {
            const sorted = res.data
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 4);
            setProducts(sorted);
          });
      }
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-12 px-4 md:px-16 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-16">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <img src={product.productImage} alt={product.productName} className="w-full h-48" />
            <div className="p-4">
                <h3
                  onClick={() => handleProductClick(product._id)}
                  className="text-xl font-bold hover:underline mb-2">
                  {product.productName}
                </h3>
                <p>{product.description}</p>
              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => handleUpvote(product)}
                  disabled={false}
                  className="flex items-center gap-2 px-4 py-1 bg-[#FF8000] text-white rounded hover:bg-[#d17212] justify-center"
                >
                  <AiTwotoneLike />
                  <span>{product.votes || 0} Upvotes</span>
                </button>

                <p className="text-sm font-bold">
                 {dayjs(product.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
