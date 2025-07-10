import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment;
