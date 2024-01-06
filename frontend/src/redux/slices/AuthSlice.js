import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}

export const createAcc= createAsyncThunk(
    "/auth/signup",
    async function (data){
        try {
            const res = axiosInstance.post("http://localhost:9000/api/v1/user/register/",data)
            console.log("flag")
            toast.promise(res ,
            {
                loading:"Wait Creating Your Account",
                success:(data)=>{
                    return data?.data?.message
                },
                error:"Error"
            },
            
            )
            return (await res).data
            
        }catch(error) {
            toast.error(error?.response?.data?.message)
            throw error
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{}
})

export const {} = authSlice.actions
export default authSlice.reducer;