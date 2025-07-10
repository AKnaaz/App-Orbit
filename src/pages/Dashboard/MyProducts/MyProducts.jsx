import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: products=[], refetch } = useQuery({
        queryKey: ['my-product', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/products?email=${user.email}`);
            return res.data;
        }
    });
    console.log(products)

    const handleDelete = async (id) => {
        const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this product?',
                icon: 'warning',
                showCancelButton: true,                        confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
                });
                if(result.isConfirmed){
                    try {
                        axiosSecure.delete(`/products/${id}`)
                        .then(res => {
                        console.log(res.data)
                        if(res.data.deletedCount){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Product has been deleted",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            });
                        }
                        refetch();
                    });
                } catch (err) {
                    Swal.fire("Error", err.message || "Failed to delete product", "error")
                };
            } 
    }
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-[#423d92] shadow-md">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-[#1e3d8d] via-[#1E1B4B] to-[#3B0764] text-white uppercase text-xs font-bold">
                <tr>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">Votes</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-[#423d92] text-white">
                {products.map((product) => (
                    <tr key={product._id} className="hover:bg-[#1e3d8d]">
                    <td className="px-6 py-4 font-medium">{product.productName}</td>
                    <td className="px-6 py-4">0</td>
                    <td className="px-6 py-4 capitalize">
                        {product.status || 'Pending'}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                        <button className="btn bg-[#292466] text-white rounded transition-all duration-200">
                        <FaEdit /> Update
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="btn bg-[#292466] text-white rounded transition-all duration-200">
                        <FaTrash /> Delete
                        </button>
                    </td>
                    </tr>
                ))}
                {products.length === 0 && (
                    <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No products found.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;