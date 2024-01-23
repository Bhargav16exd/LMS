import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    lectures:[]
}

export const createLecture = createAsyncThunk(
    "/lecture/create-lecture",
    async function(data){
        try {

            const res = axiosInstance.post(`http://localhost:9000/api/v1/course/${data.courseId}/create-lecture`,data.formData)
            toast.promise(res,{
                loading:"Uploading lecture",
                success:"Lecture upload Success"
              })
              return (await res).data  
            
        } catch (error) {
            toast.error(error)
        }
    }
)

export const ListLectures = createAsyncThunk(
    "/lecture/view-lectures",
     async function(courseId){
        try {
          const res = axiosInstance.get(`http://localhost:9000/api/v1/course/${courseId}/view-lecture`)
          toast.promise(res,{
            loading:"fetching lectures",
            success:"Lectures fetched Success"
          })
          return (await res).data  
        } catch (error) {
            toast.error(error)
        }
     }
)

export const DeleteLecture = createAsyncThunk(
    "lecture/delete-lecture",
    async function(IDs){

        try {
            const res = axiosInstance.post(`http://localhost:9000/api/v1/course/${IDs.courseId}/delete-lecture/${IDs.lectureId}`)
            toast.promise(res,{
                loading:"Deleting Lecture",
                success:"Lecture Deleted Successfully"
            })

            return (await res).data

        } catch (error) {
            toast.error(error)
        }
    }
)

export const CallEditLectureAPI = createAsyncThunk(
    "lecture/Edit-lecture",
    async function(IDs){

        try {
            const res = axiosInstance.post(`http://localhost:9000/api/v1/course/${IDs.courseId}/edit-lecture/${IDs.lectureId}`,IDs.data)
            toast.promise(res,{
                loading:"Updating Lecture",
                success:"Lecture Updated Successfully"
            })

            return (await res).data

        } catch (error) {
            toast.error(error)
        }
    }
)

const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(ListLectures.fulfilled,(state,action)=>{
         state.lectures = action.payload.data.lectures
       }) 
    }
})

export default lectureSlice.reducer