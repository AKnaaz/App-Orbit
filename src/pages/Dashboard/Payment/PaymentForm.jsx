import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const amount = 9.99; // USD
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (cardError) {
      setError(cardError.message);
      return;
    } else {
      setError('');
    }

    setProcessing(true);

    // Step 1: Create PaymentIntent
    const res = await axiosSecure.post('/create-subscription-payment-intent', {
      amount: amountInCents,
      email: user.email,
      name: user.displayName,
    });

    const clientSecret = res.data.clientSecret;

    // Step 2: Confirm Payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setError('');
        setProcessing(false);

        // Optional: Store subscription status in your DB
        await axiosSecure.post('/membership/confirm', {
          email: user.email,
          transactionId: result.paymentIntent.id,
          amount,
        });

        Swal.fire({
          title: 'Subscribed!',
          text: 'Your membership is now active.',
          icon: 'success',
          confirmButtonText: 'Go to Profile',
        }).then(() => {
          navigate('/dashboard/profile');
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="p-2 border rounded" />
      <button
        className="btn bg-lime-500 hover:bg-lime-600 text-white w-full"
        type="submit"
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : `Subscribe for $${amount}`}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
