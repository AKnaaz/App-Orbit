import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading/Loading';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { email } = useParams();
  console.log(email)
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();

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
    }

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
          name: 'Nazat Akter'
        }
      }
    });

    if(result.error){
      console.log(result.error.message)
    } else {
      if(result.paymentIntent.status === 'succeeded') {
        console.log("Payment Successed!")
        console.log(result)
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}
      className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'
      >
        <CardElement className='p-2 border rounded'>
        </CardElement>

        <button
         type='submit'
         className='btn btn-primary w-full'
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