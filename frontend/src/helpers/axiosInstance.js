import axios from "axios"

const BASE_URL = "http://localhost:5173/api/vi"


const axiosInstance = axios.create()


axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL