import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadResource } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import fs from "fs"


const generateToken = async (userId) =>{
  try {

    const user = await User.findById(userId)
    const accessToken = await user.generateAccessToken()
    return accessToken ;
    
  } catch (error) {
    throw new ApiError(500,"Error While generating access token")
  }
}

const register = asyncHandler(async(req,res)=>{
    
    //Getting Model Parameter from body
    //Validation whether all are present
    //Check whether same user exist
    // Create a user 
    // Get user avatar save to local storage upload to cloudinary when done

    const { email,password,fullName } = req.body;
    
    
    if(!email || !password || !fullName){
        req.file ? fs.unlinkSync(req.file.path) : ""
        throw new ApiError(400,"All fields are required")
    }
 
    const userExist = await User.findOne({email})

    if(userExist){
        req.file ? fs.unlinkSync(req.file.path) : ""
        throw new ApiError(400,"User Already Exist with following email")
    }
    
    console.log("hi", req.file)
    
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

const login = asyncHandler(async(req,res)=>{

    //get email and password 
    //check in db whether email exist
    // if yes then check current password matches my encrypted pass
    // create a JWT token and put it into into cookie

    const { email , password } = req.body;

    if(!email || !password){
        throw new ApiError(400,"All Fields are required")
    }
     
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new ApiError(400,"No User exist with following email")
    }

    const isValid = await user.isPasswordValid(password);


    if(!isValid){
        throw new ApiError(400,"Incorrect Password")
    }
      
    
    const accessToken = await generateToken(user._id);

    const loggedInUserDetails = await User.findById(user._id)

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .cookie("accessToken", accessToken , options)
    .status(200)
    .json(
        new ApiResponse(200,"User Login Success",{loggedInUserDetails,accessToken})
    )


})

const logout = asyncHandler(async(req,res)=>{
    
    const options = {
        httpOnly:true,
        secure:true
    }

    res
    .status(200)
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(200,"User logout success")
    )
})

export {
    register,
    login,
    logout
}