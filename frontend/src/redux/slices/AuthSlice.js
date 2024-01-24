import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {},
    subscribedCourse: localStorage.getItem('course') || []
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
                    error:""
                },
                )
                return (await res).data
        } catch (error) {
            toast.error(error?.response?.data?.message)   
        }
    }
)
export const logout = createAsyncThunk(
    "/auth/logout",
    async function(){
        try {
            const res = axiosInstance.post("http://localhost:9000/api/v1/user/logout/")
            toast.promise(res,{
                loading:"Logging out of account",
                success:(data)=>{
                    return data?.data?.message
                },
                error:"Error"
            })
            return (await res).data
        } catch (error) {
            toast.error(error?.message) 
        }
    }
)

export const updateProfilePicture = createAsyncThunk(
    "/user/edit-profile",
    async function(data){
        try {

            const res = axiosInstance.post("http://localhost:9000/api/v1/user/change-avatar/",data)
            toast.promise(res,{
                loading:"updating profile"
            })

            return (await res).data
            
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }
)

export const updateCurrentPassword = createAsyncThunk(
    "user/change-password",
    async function(data){
        try {

            const res = axiosInstance.post("http://localhost:9000/api/v1/user/change-password/",data)
            toast.promise(res,{
                loading:"changing password",
                error:""
            })
            return (await res).data
            
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)   
        }
    }
)

export const handleSubscribe = createAsyncThunk(
   "auth/susscribe",
   async function(courseId){
    try {
        const res = axiosInstance.post(`http://localhost:9000/api/v1/course/${courseId}/subscribe-course`)
        toast.promise(res,{
            loading:"subscribing",
            success:"Subscription success",
            error:"error while subscribing"
        })
        return (await res).data
    } catch (error) {
        console.log(error)
            toast.error(error?.message) 
    }
   }
)
export const CallForgotPasswordAPI = createAsyncThunk(
    "/auth/forgot-password",
    async function(email){
        console.log(email)
     try {
         const res = axiosInstance.post(`http://localhost:9000/api/v1/user/forgot-password/`,email)
         toast.promise(res,{
             loading:"Sending mail",
         })
         return (await res).data
     } catch (error) {
         toast.error(error?.message) 
     }
    }
 )

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(loginAcc.fulfilled,(state,action)=>{
            console.log(action.payload.data.loggedInUserDetails)
            localStorage.setItem("data",JSON.stringify(action?.payload?.data?.loggedInUserDetails))
            localStorage.setItem("role",action?.payload?.data?.loggedInUserDetails?.role)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("course",action?.payload?.data?.loggedInUserDetails?.subscribedCourse)
            state.data = action?.payload?.data.loggedInUserDetails
            state.isLoggedIn = true
            state.role = action?.payload?.data?.loggedInUserDetails?.role
            state.subscribedCourse = action?.payload?.data?.loggedInUserDetails?.subscribedCourse
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.data ={}
            state.isLoggedIn = false
            state.role =""
            state.subscribedCourse=null;
            localStorage.clear()
        })
        .addCase(handleSubscribe.fulfilled,(state,action)=>{
            if(action.payload){
            localStorage.setItem("course",action?.payload?.data?.subscribedCourse)
            state.subscribedCourse = action?.payload?.data?.subscribedCourse
            console.log(state.subscribedCourse)
        }})
        .addCase(updateProfilePicture.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.data))
            state.data = action?.payload?.data
        })
        
    } 
})

export const {} = authSlice.actions
export default authSlice.reducer;