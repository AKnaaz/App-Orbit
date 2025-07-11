import React from 'react';
import bgImage from '../../../assets/login.jpg';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

  const { register, handleSubmit, formState: {errors}} = useForm();
  const {signIn} = useAuth();
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = data => {
    signIn(data.email, data.password)
        .then(result => {
            console.log(result.user)
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
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password!',
            confirmButtonColor: '#d33'
          });
        });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl"
           style={{
             background: 'rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(10px)',
             WebkitBackdropFilter: 'blur(10px)',
             border: '1px solid rgba(255, 255, 255, 0.2)'
           }}>
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Login to AppOrbit
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', {
                required: true
              })}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
              required
            />
            {
                errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700
             mb-1">Password</label>
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
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your password"
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
            <div className='mt-1'><a className="link link-hover text-purple-700">Forgot password?</a></div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>

           <p className="text-sm text-center text-white mt-4">
            Don't have an account?{' '}
            <Link to="/register">
            <span className="text-purple-600 font-semibold cursor-pointer hover:underline">
              Register here
            </span>
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
