import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // উদাহরণ: http://localhost:3000
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, accessToken, logOut } = useAuth();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor (optional)
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, navigate, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
