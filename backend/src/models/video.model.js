import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
 
    title:{
        type:String,
        required:true 
    },
    description:{
        type:String
    },
    lectureURL:{
        type:String,
        required:true,
        unique:true 
    },
    lectureId:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

export const Video = mongoose.model("Video",videoSchema)