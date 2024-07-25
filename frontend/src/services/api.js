import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`, // Set your base URL here
  withCredentials: true, // Enable cookies to be sent
});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // If 401 response is detected, redirect to login page
        window.location.href = '/login';
        localStorage.clear();
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;
