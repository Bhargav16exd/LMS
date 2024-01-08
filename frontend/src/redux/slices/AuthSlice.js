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
        }
    }
)

export const loginAcc = createAsyncThunk(
    "/auth/login",
    async function(data){
        try {
            const res = axiosInstance.post("http://localhost:9000/api/v1/user/login/",data)
            toast.promise(res ,
                {
                    loading:"Loggin In to Your Account",
                    success:(data)=>{
                        return data?.data?.message
                    },
                    error:"Error"
                },
                )
                return (await res).data
        } catch (error) {
            toast.error(error?.response?.data?.message)   
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(loginAcc.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("role",action?.payload?.user?.role)
            localStorage.setItem("isLoggedIn",true)
            state.data = action?.payload?.user
            state.isLoggedIn = true
            state.role = action?.payload?.user?.role
        })
        
    } 
})

export const {} = authSlice.actions
export default authSlice.reducer;