import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
 
    title:{
        type:String
    },
    description:{
        type:String
    },
    thumbnail:{
        thumbnailURL:{
            type:String
        },
        thumbnailId:{
            type:String
        }
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    lectures:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }]
},{timestamps:true})


export const Course = mongoose.model("Course",courseSchema)