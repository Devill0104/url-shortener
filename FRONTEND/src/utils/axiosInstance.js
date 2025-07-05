import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://url-shortener-emz3.onrender.com', 
  timeout: 10000, 
   withCredentials: true, //this lets cookies saved in the browser
});


axiosInstance.interceptors.response.use(
  (response) => {
                  return response
                },
  (error) => {
   
    if (error.response) {
      // Server responded with a status other than 2xx
      const {status, data} = error.response;
      switch (status) {
        case 400:
          console.error('Bad Request:', data);
          break;
        case 401:
          console.error('Unauthorized:', data);
          break;
        case 403:
          console.error('Forbidden:', data);
          break;
        case 404:
          console.error('Not Found:', data);
          break;
        case 500:
          console.error('Internal Server Error:', data);
          break;
        default:
          console.error(`API Error (${status}):`, data);
          break;
      }
        } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
        } else {
      // Something else happened
      console.error('Error:', error.message);
        }
        return Promise.reject(error);
  }
);
export default axiosInstance;