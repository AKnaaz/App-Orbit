import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://my-twelve-assignment-server.vercel.app`
});

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;