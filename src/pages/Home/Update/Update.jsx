import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../shared/Loading/Loading';
import updateBg from '../../../assets/update.jpg'

const Update = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axiosSecure.get(`/products/${id}`)
    .then(res => {
      reset(res.data); 
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, [id, axiosSecure, reset]);

  const onSubmit = async data => {
    delete data._id; 
    try {
      const res = await axiosSecure.patch(`/products/${id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: 'Product Updated!',
          text: 'Changes have been saved.',
          icon: 'success',
          confirmButtonColor: '#6B46C1'
        });
        navigate('/dashboard/my-products');
      }
    } catch (err) {
        console.log(err)
      Swal.fire('Error', 'Failed to update product', 'error');
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center px-4'
        style={{
            backgroundImage: `url(${updateBg})`
        }}
    >
      <div className='p-6 rounded-xl w-full max-w-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-center text-white'>Update Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <div>
            <label className='block font-medium text-sm mb-1'>Product Name</label>
            <input {...register("productName")} type="text" className='input input-bordered w-full bg-transparent' />
          </div>

          <div>
            <label className='block font-medium text-sm mb-1'>Product Image URL</label>
            <input {...register("productImage")} type="text" className='input input-bordered w-full bg-transparent' />
          </div>

          <div>
            <label className='block font-medium text-sm mb-1'>Description</label>
            <textarea {...register("description")} className='textarea textarea-bordered w-full bg-transparent' />
          </div>

          <div>
            <label className='block font-medium text-sm mb-1'>External Link</label>
            <input {...register("externalLink")} type="url" className='input input-bordered w-full bg-transparent' />
          </div>

          <button type='submit' className='btn btn-primary w-full mt-4'>Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default Update;


