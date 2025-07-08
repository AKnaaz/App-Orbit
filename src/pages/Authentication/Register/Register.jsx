import React from 'react';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const Register = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { createUser } = useAuth();

    const onSubmit = data => {
    console.log(data)
    createUser(data.email, data.password)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
    }

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage: `url('https://i.postimg.cc/mDW1PWLb/regi.jpg')`,
      }}
    >
      {/* Card */}
      <div className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
        
        {/* Top Image Section */}
        <div className="h-32 bg-[url('https://i.postimg.cc/mDW1PWLb/regi.jpg')] bg-cover bg-center rounded-t-lg"></div>

        {/* Form */}
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-center text-purple-800 mb-4">Register to AppOrbit!</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Name</label>
                <input
                  type="text"
                  {...register('name', {
                    required: true
                  })}
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-2 rounded border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-purple-400 
                  placeholder:text-gray-400 text-gray-800"
                 required
                />
                {
                    errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                }
            </div>

            <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Photo URL</label>
                <input
                 type="url"
                 placeholder="Photo URL"
                 className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 text-gray-800"
                 required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: true
                  })}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 text-gray-800"
                  required
                />
                {
                    errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>
                }
            </div>

            <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">Password</label>
                <input
                  type="password"
                  {...register('password' , {
                    required: true, 
                    minLength: 6,
                    pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    message: "Password must contain at least one uppercase and one lowercase letter"
                        }
                  })}
                  placeholder="Enter Your Password"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 text-gray-800"
                  required
                />
                {
                    errors.password?.type === "required" && (
                    <p className='text-red-500'>Password is required</p>
                )
                }
                {
                    errors.password?.type === "minLength" && (
                    <p className='text-red-500'>Password must be 6 characters or longer</p>
                )
                }
                {
                    errors.password?.type === "pattern" && (
                    <p className='text-red-500'>{errors.password.message}</p>
                )
                }
            </div>


            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition"
            >
              Register
            </button>

             <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{' '}
              <Link to="/login">
              <a href="#" className="text-purple-600 hover:underline">Login</a>
              </Link>
            </p>
          </form>
         <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
