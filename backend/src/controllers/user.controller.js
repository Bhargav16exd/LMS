import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";

const register = asyncHandler(async(req,res)=>{
    
    //Getting Model Parameter from body
    //Validation whether all are present
    //Check whether same user exist
    // Create a user 
    // Get user avatar save to local storage upload to cloudinary when done

    const { email,password,name } = req.body;
    
    if(!email || !password || !name){
        throw new ApiError(400,"All fields are required")
    }
 
    const user = await User.findOne(email)

    if(user){
        throw new ApiError(400,"User Already Exist with following email")
    }

    // file upload 

})

export {
    register,
}