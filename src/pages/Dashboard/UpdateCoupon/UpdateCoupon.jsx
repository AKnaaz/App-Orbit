import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading/Loading';
import img from '../../../assets/updateCoupon.jpg';

const UpdateCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      code: '',
      expiry: '',
      description: '',
      discount: '',
    },
  });

  const { data: coupon, isLoading } = useQuery({
    queryKey: ['coupon', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/coupons/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (coupon) {
      reset({
        code: coupon.code,
        expiry: coupon.expiry?.split('T')[0],
        description: coupon.description,
        discount: coupon.discount,
      });
    }
  }, [coupon, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.put(`/coupons/${id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Coupon updated successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/dashboard/manage-coupons');
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Failed to update coupon.', 'error');
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
    style={{ backgroundImage: `url(${img})` }}
    >
      <div className='w-full max-w-3xl p-8 rounded-2xl shadow-2xl'>
        <h2 className="text-2xl font-bold mb-6 text-center">Update Coupon</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('code', { required: true })}
            placeholder="Coupon Code"
            className="input input-bordered w-full bg-transparent"
          />
          <input
            type="date"
            {...register('expiry', { required: true })}
            className="input input-bordered w-full bg-transparent"
          />
          <textarea
            {...register('description')}
            placeholder="Description"
            className="textarea textarea-bordered w-full bg-transparent"
          />
          <input
            type="number"
            {...register('discount', { required: true })}
            placeholder="Discount Amount"
            className="input input-bordered w-full bg-transparent"
            step="0.01"
          />
          <button type="submit" className="btn bg-gradient-to-l from-gray-700 to-gray-500 rounded-3xl text-white w-full">
            Update Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoupon;
