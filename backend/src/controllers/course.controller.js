import { Course } from "../models/course.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteResource, uploadResource } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";

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

const createLecture = asyncHandler(async(req,res)=>{
  
    const {title , description} = req.body
    const {courseId} = req.params
    const videoPath = req.file?.path
    
    if(!courseId){
        throw new ApiError(400,"Invaild Request")
    }

    if(!title || !description){
        throw new ApiError(400,"All fields are required")
    }

    if(!videoPath){
        throw new ApiError(400,"Kindly Upload Video")
    }
    const videoUploadData = await uploadResource(videoPath)

    const video = await Video.create({
        title,
        description,
        videoURL:videoUploadData.secure_url,
        videoId:videoUploadData.public_id
    })
    await video.save()

    const course = await Course.findByIdAndUpdate(courseId,{
        $push: {lectures:video._id}
    },{new:true})

    await course.save();

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Video Uploaded Success",video)
    )
})

const viewLecture = asyncHandler(async(req,res)=>{
       
    const {courseId} = req.params
    
    if(!courseId){
        throw new ApiError(400,"Invalid Request")
    }

    const lectures = await Course.findById(courseId).populate('lectures').select("lectures")

    if(!lectures){
        throw new ApiError(400,"No such course exist")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Lectures Fetch Success",lectures)
    )
})

const updateCourse = asyncHandler(async(req,res)=>{
  
    const {title,description,instructor} = req.body
    const {courseId} = req.params;

    if(!courseId){
        throw new ApiError(400,"Invalid Request")
    }

    const course = await Course.findByIdAndUpdate(courseId,{
        title:title,
        description:description,
        instructor:instructor 
    },{new:true})

    await course.save();
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Course Update Success",course)
    )
})

const updateThumbnail = asyncHandler(async(req,res)=>{
 
    const thumbnailpath = req.file?.path
    const {courseId} = req.params;

    if(!courseId){
        throw new ApiError(400,"Invalid Request")
    }
    if(!thumbnailpath){
        throw new ApiError(400,"Thumbnail is required")
    }

    const oldCourse = await Course.findById(courseId)
    const oldThumbnailId = oldCourse.thumbnailId;

    const thumbnail = await uploadResource(thumbnailpath)

    const course = await Course.findByIdAndUpdate(courseId,{
        thumbnailId:thumbnail.public_id,
        thumbnailURL:thumbnail.secure_url  
    },{new:true})

    await course.save();
    await deleteResource(oldThumbnailId);

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Thumbnail Updated successfully",course)
    )
})

const deleteCourse = asyncHandler(async(req,res)=>{

    const courseId = req.params?.courseId

    if(!courseId){
        throw new ApiError(400,"Invalid Request")
    }

    const course = await Course.findById(courseId).select("lectures")

    if(!course){
        throw new ApiError(400,"No Such Course Exists")
    }
    const lectures = course?.lectures
    
    if(lectures){
    const public_ids = await Promise.all(lectures.map(async (video)=> await Video.findById(video._id).select("videoId")))
    public_ids.map(async(idObject)=> await deleteResource(idObject.videoId))
    lectures.map(async(v)=> await Video.findByIdAndDelete(v._id))
    }
    await Course.findByIdAndDelete(courseId);

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Course Deleted Successfully")
    )

})

const deleteLecture = asyncHandler(async(req,res)=>{

    const {courseId,lectureId} = req.params

    if(!courseId || !lectureId){
        throw new ApiError(400,"Invalid Request")
    }

    const course = await Course.findById(courseId)
    const lectureArr = course.lectures;
    const updatedLectures = lectureArr.filter(lecture => lecture._id.toString()!=lectureId)
    course.lectures = updatedLectures
    await course.save()

    const video = await Video.findById(lectureId)
    const public_id = video.videoId
    await deleteResource(public_id)
    await Video.findByIdAndDelete(lectureId)
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Video Deleted Successfully")
    )
})

const editLecture = asyncHandler(async(req,res)=>{

    const {courseId,lectureId} = req.params
    const {title , description } = req.body

    if(!courseId || !lectureId){
        throw new ApiError(400,"Invalid Request")
    }

    const lecture = await Video.findById(lectureId)
 
    if(title){
        lecture.title = title
    }
    if(description){
        lecture.description = description
    }

    await lecture.save();

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Lecture Updated Success", lecture)
    )


})


export {
    listCourses,
    createCourse,
    createLecture,
    viewLecture,
    updateCourse,
    updateThumbnail,
    deleteCourse,
    deleteLecture,
    editLecture
}