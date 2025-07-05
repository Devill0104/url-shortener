
import axiosInstance from "../utils/axiosInstance.js";

const createShortUrl = async (url, slug) => {
    
        const {data} = await axiosInstance.post('/api/create', { url , slug}, { withCredentials: true });
        console.log("data ;" ,data)
        return data.shortUrl;
  
};
export default createShortUrl