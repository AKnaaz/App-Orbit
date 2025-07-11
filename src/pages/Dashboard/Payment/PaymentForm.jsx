import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import cardImg from '../../../assets/card.webp'
import paymentImg from '../../../assets/payment.avif'

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { email } = useParams();
  const { user } = useAuth();
  console.log(email)
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { isPending, data: userInfo = {} } = useQuery({
    queryKey: ['user', email],
    queryFn: async() => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    }
  })

  if(isPending) {
    return <Loading></Loading>
  }

  console.log("help",userInfo)
  const amount = 9.99;
  const amountInCents = amount * 100;
  console.log(amountInCents)

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if(!card) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if(error) {
      setError(error.message);
    }
    else {
      setError('');
      console.log("Payment Method", paymentMethod);

      const res = await axiosSecure.post('/create-payment-intent', {
      amountInCents,
      email
    })
    console.log("intent", res)

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    });

    if(result.error){
      setError(result.error.message);
    } else {
      setError('');
      if(result.paymentIntent.status === 'succeeded') {
        console.log("Payment Successed!");
        console.log(result);

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
    }
  }

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
        className='space-y-4 p-20 rounded-xl shadow-xl w-full max-w-md mx-auto'
        style={{
                backgroundImage: `url(${cardImg})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
        >
          <CardElement className='p-4 border rounded'>
          </CardElement>

          <button
          type='submit'
          className='btn bg-blue-950 w-full'
          disabled={!stripe}>
            Pay ${amount} For Subscription 
          </button>
          {
            error && <p className='text-red-500'>{error}</p>
          }
        </form>
    </div>
  );
};

export default PaymentForm;