import axios from 'axios';
import store from '../store/store'; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7300/',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth.userToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;