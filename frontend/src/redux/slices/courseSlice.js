import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    courseData:[]
}

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

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
      builder.addCase(getCourses.fulfilled,(state,action)=>{
       if(action.payload){
        state.courseData = action.payload.data
        console.log(state.courseData)
       }
      })
    }
})

export default courseSlice.reducer;
