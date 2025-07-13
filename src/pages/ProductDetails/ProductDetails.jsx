import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { AiTwotoneLike } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Loading from '../shared/Loading/Loading';
import detailBg from '../../assets/product.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  // fetch product
  useEffect(() => {
    axiosSecure.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id, axiosSecure]);

  // fetch reviews
  useEffect(() => {
    axiosSecure.get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id, axiosSecure]);

  // upvote handler
  const handleUpvote = async () => {
    if (!user) return navigate('/login');
    if (user.email === product.ownerEmail) return;
    if (product.voters?.includes(user.email)) return;

    try {
      const res = await axiosSecure.patch(`/products/vote/${id}`, {
        email: user.email
      });

      if (res.data.modifiedCount > 0) {
        const updated = await axiosSecure.get(`/products/${id}`);
        setProduct(updated.data);
      }
    } catch (err) {
      console.error("Upvote error:", err);
    }
  };

  // report handler
  const handleReport = async () => {
    if (!user) return navigate('/login');

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to report this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Report it!'
    });

    if (confirm.isConfirmed) {
      const reportData = {
        productId: product._id,
        productName: product.productName,
        productOwnerEmail: product.ownerEmail,
        reporterEmail: user.email,
        reporterName: user.displayName,
        reporterPhoto: user.photoURL,
        reason: 'Inappropriate Content'
      };

      try {
        const res = await axiosSecure.post('/report', reportData);
        if (res.data.success) {
          Swal.fire(
            'Reported!',
            'The product has been reported successfully.',
            'success'
          );
        }
      } catch (err) {
        Swal.fire('Error!', 'Something went wrong while reporting.', 'error');
        console.error(err);
      }
    }
  };

  // review submit handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!rating || rating < 1 || rating > 5) {
      return Swal.fire('Warning!', 'Please select a rating between 1 and 5 stars.', 'warning');
    }

    const review = {
      productId: product._id,
      reviewerName: user.displayName,
      reviewerPhoto: user.photoURL,
      description: reviewText.trim(),
      rating: parseInt(rating),
      createdAt: new Date()
    };

    try {
      const res = await axiosSecure.post('/reviews', review);
      if (res.data.insertedId || res.data.success) {
        Swal.fire('Success!', 'Your review has been submitted.', 'success');
        setReviewText('');
        setRating(0);

        // Refresh review list
        const updated = await axiosSecure.get(`/reviews/${id}`);
        setReviews(updated.data);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to submit review.', 'error');
    }
  };

  if (!product) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: `url(${detailBg})` }}>
      <div className="max-w-xl w-full space-y-10">

        {/* === PRODUCT CARD === */}
        <div className="rounded-lg shadow-lg overflow-hidden border">
            <div className="w-full h-64 flex justify-center items-center overflow-hidden">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-full object-contain"
              />
            </div>     
            <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">{product.productName}</h2>
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((tag, i) => (
                <span key={i} className="bg-pink-600 px-3 py-1 rounded-full text-sm text-white font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-gray-200">{product.description}</p>
            {product.externalLink && (
              <a href={product.externalLink} target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">
                Visit Product
              </a>
            )}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleUpvote}
                disabled={
                  !user || user.email === product.ownerEmail || product.voters?.includes(user.email)
                }
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
              >
                <AiTwotoneLike />
                {product.votes || 0} Upvotes
              </button>
              <button
                onClick={handleReport}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Report
              </button>
            </div>
          </div>
        </div>

        {/* === POST REVIEW SECTION === */}
        <div className="shadow-lg rounded-lg p-6 space-y-4 border">
          <h3 className="text-xl font-bold text-white">Post a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full border-2 border-white" />
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="w-full px-4 py-2 border rounded border-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded"
                placeholder="Please share your experience..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    onClick={() => setRating(num)}
                    className={`text-3xl cursor-pointer ${rating >= num ? 'text-orange-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="btn w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
              Submit Review
            </button>
          </form>
        </div>

        {/* === REVIEWS LIST === */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="rounded-lg p-4 shadow border">
              <div className="flex items-center gap-3 mb-2">
                <img src={review.reviewerPhoto} alt={review.reviewerName} className="w-10 h-10 rounded-full border" />
                <h4 className="font-semibold text-gray-200">{review.reviewerName}</h4>
              </div>
              <p className="text-gray-300">{review.description}</p>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num} className={`text-xl ${review.rating >= num ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
