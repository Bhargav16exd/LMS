import axios from "axios"

const BASE_URL = "http://localhost:9000/api/v1"


const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})



export default axiosInstance;