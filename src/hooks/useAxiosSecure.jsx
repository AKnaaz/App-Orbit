import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
  });


  axiosSecure.interceptors.request.use(config => {
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // axiosSecure.interceptors.response.use(response => {
  //   return response;
  // }, error => {
  //   const status = error.response?.status;
  //   if (status === 403) {
  //     navigate("/");
  //   }
  //   else if (status === 401) {
  //     logOut()
  //     .then(() => {
  //       navigate("/")
  //     })
  //     .catch(() => { })
  //   }
  //   return Promise.reject(error);
  // });

  return axiosSecure;
};

export default useAxiosSecure;
