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
            console.log(data)
            const res = axiosInstance.post("http://localhost:9000/api/v1/course/create-course",data)
            toast.promise(res,
            {
                success:"Course Created Successfully",
                loading:"Creating Course",
                error:"Error ! faild to create course"
            },
            {position:"bottom-right"}     
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
                error:"Error ! Failed to fetch courses"
            },{
                position:"bottom-right"
            })
            return (await data).data
        } catch (error) {
            toast.error(error);
        }
    }
)

export const updateCoures = createAsyncThunk(
    "/course/edit-course",
    async function(course){
        console.log(course)
        try {
            const res = axiosInstance.post(`http://localhost:9000/api/v1/course/${course.courseId}/edit-course`,course.courseData,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            toast.promise(res,
            {
                loading:"Updating Course",
                error:"Error While Updating Course"
            },{position:"bottom-right"})
            return (await res).data
            
        } catch (error) {
             toast.error(error)
        }
    }
)

export const getCourseDetail = createAsyncThunk(
    '/course/singleCourse',
    async function(id){
        try {
            const course = axiosInstance.get(`http://localhost:9000/api/v1/course/${id}`)
            toast.promise(course,{
                loading:"Fetching Course Details",
                success:"Course Fetched Successfully",
                error:"Error"
            },{position:"bottom-right"})
            return (await course).data
        } catch (error) {
            toast.error(error)
        }
    }
)

export const deleteCourse = createAsyncThunk(
    "/course/delete-course",
    async function(courseId){

        try {
            const res = axiosInstance.post(`http://localhost:9000/api/v1/course/${courseId}/delete-course`)
            toast.promise(res,{
                loading:"deleting course"
            },{position:"bottom-right"})
            return (await res).data
        } catch (error) {
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
