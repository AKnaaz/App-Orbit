import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../shared/Loading/Loading';

const Update = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty }
  } = useForm({
    defaultValues: {
      productName: '',
      productImage: '',
      description: '',
      externalLink: ''
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        const data = res.data;

        // Manually set form values using setValue
        setValue("productName", data.productName);
        setValue("productImage", data.productImage);
        setValue("description", data.description);
        setValue("externalLink", data.externalLink);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosSecure, setValue]);

  const onSubmit = async data => {
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
      console.log(err);
      Swal.fire('Error', 'Failed to update product', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4'>
      <div className='p-6 rounded-xl w-full max-w-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Update Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <div>       
            <label className='block font-medium text-sm mb-1'>Product Name</label>
            <input {...register("productName")} type="text" className='input input-bordered w-full'/>
          </div>

          <div>
            <label className='block font-medium text-sm mb-1'>Product Image URL</label>
            <input {...register("productImage")} type="text" className='input input-bordered w-full' />
          </div>

          <div>
            <label className='block font-medium text-sm mb-1'>Description</label>
            <textarea {...register("description")} className='textarea textarea-bordered w-full' />
          </div>

          <div>
            <label className='block font-medium text-sm mb-1'>External Link</label>
            <input {...register("externalLink")} type="url" className='input input-bordered w-full' />
          </div>

          <button
            type='submit'
            disabled={!isDirty}
            className='btn bg-[#FF8000] text-white w-full mt-4'
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
