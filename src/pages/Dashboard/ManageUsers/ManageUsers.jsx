import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../shared/Loading/Loading';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user');
       console.log(res.data)
      return res.data;
    }
  });

  const handleMakeAdmin = async (id) => {
  try {
    const res = await axiosSecure.patch(`/user/admin/${id}`);
    console.log(res.data)
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Role Updated!',
        text: 'User is now an Admin.',
        confirmButtonColor: '#7c3aed'
      });
      refetch();
    }
  } catch (error) {
    console.error("Failed to make admin:", error);
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong while updating role.',
      confirmButtonColor: '#ef4444'
    });
  }
};

const handleMakeModerator = async (id) => {
  try {
    const res = await axiosSecure.patch(`/user/moderator/${id}`);
    console.log(res.data)
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Role Updated!',
        text: 'User is now a moderator.',
        confirmButtonColor: '#7c3aed'
      });
      refetch();
    }
  } catch (error) {
    console.error("Failed to make moderator:", error);
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong while updating role.',
      confirmButtonColor: '#ef4444'
    });
  }
};


  if(isLoading) return <Loading></Loading>

  return (
    <div className="w-full overflow-x-auto border border-[#FF8000] shadow-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#FF8000] uppercase text-xs font-bold">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Make Moderator</th>
            <th className="px-6 py-3">Make Admin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#FF8000]">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-[#FF8000] transition">
              <td className="px-6 py-4 font-medium">{user.name || 'N/A'}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <button
                    onClick={() => handleMakeModerator(user._id)}
                    className={`btn btn-xs text-white rounded ${
                    user.role === 'moderator' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {user.role === 'moderator' ? 'Moderator' : 'Make Moderator'}
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className={`btn btn-xs text-white rounded ${
                    user.role === 'admin' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                >
                    {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                </button>
             </td>
            </tr>
          ))}
          {users.length === 0 && !isLoading && (
            <tr>
              <td colSpan="4" className="text-center text-gray-400 py-6">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
