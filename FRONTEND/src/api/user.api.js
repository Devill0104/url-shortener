import axiosInstance from "../utils/axiosInstance"

export const getCurrentUser = async ()=>{
    const {data} = await axiosInstance.get("/api/auth/me")
    return data;
}

export const getAllUserUrls = async ()=>{
    console.log("get all user urls call hua hai")
    const data = await axiosInstance.post('/api/user/urls')
    return data.data
}