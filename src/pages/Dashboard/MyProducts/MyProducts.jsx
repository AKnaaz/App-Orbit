import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

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
        <div className="w-full overflow-x-auto border border-[#FF8000] shadow-md">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-[#FF8000] text-white uppercase text-xs font-bold">
                <tr>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">Votes</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-[#FF8000]">
                {products.map((product) => (
                    <tr key={product._id} className="hover:bg-[#FF8000]">
                    <td className="px-6 py-4 font-medium">{product.productName}</td>
                    <td className="px-6 py-4">{product.votes || 0}</td>
                    <td className="px-6 py-4 capitalize">
                        {product.status}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                        <Link to={`/dashboard/update/${product._id}`}>
                            <button className="btn bg-[#FF8000] text-white rounded transition-all duration-200">
                            <FaEdit /> Update
                        </button>
                        </Link>
                        <button onClick={() => handleDelete(product._id)} className="btn bg-[#FF8000] text-white rounded transition-all duration-200">
                        <FaTrash /> Delete
                        </button>
                    </td>
                    </tr>
                ))}
                {products.length === 0 && (
                    <tr>
                    <td colSpan="4" className="px-6 py-4 text-center">
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