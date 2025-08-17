import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(result => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false
        });
        navigate(from);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password!',
          confirmButtonColor: '#d33'
        });
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to <span className='text-[#FF8000]'>AppOrbit</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
              placeholder="Enter your email"
              required
            />
            {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message: "Password must contain at least one uppercase and one lowercase letter"
                }
              })}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
              placeholder="Enter your password"
              required
            />
            {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}
            {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 characters or longer</p>}
            {errors.password?.type === "pattern" && <p className='text-red-500'>{errors.password.message}</p>}

            <div className='mt-1'>
              <a className="link link-hover text-[#FF8000]" href="#">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8000] hover:bg-[#d87411] text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <Link state={{ from }} to="/register">
              <span className="text-[#FF8000] font-semibold cursor-pointer hover:underline">
                Register here
              </span>
            </Link>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
