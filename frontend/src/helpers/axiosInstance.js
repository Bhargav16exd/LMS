import axios from "axios"

const BASE_URL = "http://localhost:9000/api/v1"


const axiosInstance = axios.create()


axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL

export default axiosInstance;