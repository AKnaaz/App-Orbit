import axios from 'axios';
import useAuth from './useAuth';

const useAxiosSecure = () => {
  const { user } = useAuth();

  const axiosSecure = axios.create({
    baseURL: `https://my-twelve-assignment-server.vercel.app`
  });


  axiosSecure.interceptors.request.use(config => {
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;
