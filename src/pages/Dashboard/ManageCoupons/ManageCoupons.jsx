import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';
import cardImg from '../../../assets/card.jpg'

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const { data: coupons = [], refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post('/coupons', data);
      if (res.data.insertedId) {
        Swal.fire('Added!', 'Coupon added successfully', 'success');
        reset();
        refetch();
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Failed to add coupon', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Coupon?',
      text: 'Are you sure you want to delete this coupon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/coupons/${id}`);
      if (res.data.deletedCount) {
        Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
        refetch();
      }
    }
  };

  return (
    <div className="py-20 px-4 md:px-10 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-10">Manage Coupons</h2>

      {/* Add Coupon Form */}
      <form onSubmit={handleSubmit(onSubmit)} 
      className="space-y-4 p-10 rounded-xl shadow-md mb-10"
      style={{
        backgroundImage: `url(${cardImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
     }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input {...register("code", { required: true })} className="input input-bordered rounded bg-gradient-to-r from-[#DFBD69] to-[#926F34] placeholder:text-gray-500" placeholder="Coupon Code" />

          <input {...register("expiry", { required: true })} className="input input-bordered rounded bg-gradient-to-r from-[#DFBD69] to-[#926F34] text-gray-500" type="date" />

          <input {...register("description")} className="input input-bordered rounded bg-gradient-to-r from-[#DFBD69] to-[#926F34] placeholder:text-gray-500" placeholder="Description" />

          <input {...register("discount", { required: true })} type="number" className="input input-bordered rounded bg-gradient-to-r from-[#DFBD69] to-[#926F34] placeholder:text-gray-500" placeholder="Discount Amount" />
        </div>
        <button type="submit" className="btn bg-[#FF8000] text-white w-full">Add Coupon</button>
      </form>

      {/* Coupon Table */}
      <div className="overflow-x-auto border rounded-lg border-[#FF8000] shadow-md">
        <table className="table">
          <thead className="bg-gradient-to-r from-[#FF8000] via-[#d88028] to-[#cea073] uppercase text-xs font-bold">
            <tr>
              <th>Code</th>
              <th>Expiry</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.expiry}</td>
                <td>{coupon.description}</td>
                <td>{coupon.discount}%</td>
                <td className="space-x-2">
                  {/* Update Link to separate update page */}
                  <Link
                    to={`/dashboard/update-coupon/${coupon._id}`}
                    className="btn bg-[#FF8000] text-white rounded transition-all duration-200"
                  >
                    <FaEdit></FaEdit>
                  </Link>
                  <button className="btn bg-[#FF8000] text-white rounded transition-all duration-200" onClick={() => handleDelete(coupon._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
