import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadResource } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const register = asyncHandler(async(req,res)=>{
    
    //Getting Model Parameter from body
    //Validation whether all are present
    //Check whether same user exist
    // Create a user 
    // Get user avatar save to local storage upload to cloudinary when done

    const { email,password,fullName } = req.body;
    
    console.log(req.body)
    if(!email || !password || !fullName){
        throw new ApiError(400,"All fields are required")
    }
 
    const userExist = await User.findOne({email})

    if(userExist){
        throw new ApiError(400,"User Already Exist with following email")
    }
    
    console.log(req.file)
    const avatarLocalPath = req.file?.path
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Kidnly Upload Avatar")
    }

    const uploadResponse = await uploadResource(avatarLocalPath);

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:uploadResponse?.url || "",
        avatarId:uploadResponse.public_id || "",
    })

    if(!user){
        throw new ApiError(500,"Error While Creating User")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,"User Registration Success" , user)
    )

})

export {
    register,
}