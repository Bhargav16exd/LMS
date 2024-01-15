import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    courseData:[],
    course:{},
}

export const crtCourse = createAsyncThunk(
    "/admin/create-course",
    async function(data){
        try {

            const res = axiosInstance.post("http://localhost:9000/api/v1/course/create-course",data)
            toast.promise(res,
            {
                success:"Course Created Successfully",
                loading:"Creating Course",
                error:"Error ! faild to create course"
            }    
            )
            console.log(data)
            return (await res).data
            
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getCourses = createAsyncThunk(
    "/course/course-list",
    async function(){
        try {

            const data = axiosInstance.get("http://localhost:9000/api/v1/course/list-courses")
            toast.promise(data,
            {
                loading:"Wait ! Fetching Course",
                success:"Course Succesfully fetched",
                error:"Error ! Failed to fetch courses"
            })
            console.log((await data).data)
            return (await data).data
        } catch (error) {
            console.log(error)
            toast.error(error);
        }
    }
)

export const getCourseDetail = createAsyncThunk(
    '/course/singleCourse',
    async function(id){
        const course = axiosInstance.get(`http://localhost:9000/api/v1/course/${id}`)
        try {
            toast.promise(course,{
                loading:"Fetching Course Details",
                success:"Course Fetched Successfully",
                error:"Error"
            })
            return (await course).data
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }
)

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
      builder
      .addCase(getCourses.fulfilled,(state,action)=>{
       if(action.payload){
        state.courseData = action.payload.data
       }
      })
      .addCase(getCourseDetail.fulfilled,(state,action)=>{
        if(action.payload){
            state.course = action.payload.data
        }
    })
    },
   
})

export default courseSlice.reducer;
