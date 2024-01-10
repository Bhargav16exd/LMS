import { Course } from "../models/course.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadResource } from "../utils/cloudinary.js";

const createCourse = asyncHandler(async(req,res)=>{

  const {title,description,instructor} = req.body

  if(!title || !description || !instructor){
    throw new ApiError(400,"All fields are required")
  }

  const thumbnailpath = req.file?.path

  if(!thumbnailpath){
    throw new ApiError(400,"Thumbnail is required")
  }

  const thumbnailURL = await uploadResource(thumbnailpath)

  const course = await Course.create({
    title,
    description,
    instructor,
    createdBy:req.user?._id,
    thumbnailId:thumbnailURL.public_id,
    thumbnailURL:thumbnailURL.secure_url
  })

  await course.save() 

  return res
  .status(200)
  .json(
    new ApiResponse(200,"Course Creation Success",course)
  )

})

const listCourses = asyncHandler(async(req,res)=>{

    const courses = await Course.find().select("-thumbnailId -createdBy ")

    console.log(courses)

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Courses Fetched Success",courses)
    )

})


export {
    listCourses,
    createCourse
}