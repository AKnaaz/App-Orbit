import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import cardImg from '../../../assets/card.webp';
import paymentImg from '../../../assets/money.jpg';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { email } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [validCoupon, setValidCoupon] = useState(null);

  const baseAmount = 9.99;

  const { isPending, data: userInfo = {} } = useQuery({
    queryKey: ['user', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    }
  });
  console.log(userInfo)

  const { data: coupons = [] } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    }
  });

  useEffect(() => {
    const match = coupons.find(c => c.code === couponCode);
    if (match) {
      setValidCoupon(match);
      setDiscount(match.discount);
    } else {
      setValidCoupon(null);
      setDiscount(0);
    }
  }, [couponCode, coupons]);

  if (isPending) {
    return <Loading />;
  }

  const discountedAmount = parseFloat((baseAmount - (baseAmount * discount) / 100).toFixed(2));
  const amountInCents = parseInt(discountedAmount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });
    console.log(paymentMethod)
    if (error) {
      setError(error.message);
      return;
    }

    setError('');
    const res = await axiosSecure.post('/create-payment-intent', {
      amountInCents,
      email
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        await axiosSecure.patch(`/user/${email}`, { isSubscribed: true });

        Swal.fire({
          icon: 'success',
          title: 'Subscription Successful!',
          text: 'You are now a premium member.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go Back'
        }).then(() => {
          navigate('/dashboard/my-profile');
        });
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: `url(${paymentImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <form onSubmit={handleSubmit}
        className='space-y-4 p-20 rounded-xl shadow-md shadow-gray-400 w-full max-w-md mx-auto'
        style={{
          backgroundImage: `url(${cardImg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        {/* Coupon Code Input */}
        <div className='flex gap-2 items-center'>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="input input-bordered w-full bg-gradient-to-r from-[#DFBD69] to-[#926F34] text-white placeholder:text-white"
          />
          <span className='text-white font-semibold'>Coupon</span>
        </div>

        {/* Card Input */}
        <CardElement className='p-4 border rounded bg-gradient-to-r from-[#DFBD69] to-[#926F34]' />

        {/* Payment Button */}
        <button
          type='submit'
          className='btn bg-blue-950 w-full'
          disabled={!stripe}
        >
          Pay ${discountedAmount} {discount > 0 && `(after ${discount}% discount)`}
        </button>

        {validCoupon === null && couponCode && (
          <p className='text-red-400 text-sm'>Invalid Coupon Code</p>
        )}

        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
