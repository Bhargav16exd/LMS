import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

const authMiddleware = asyncHandler(async(req,res,next)=>{

    try {

        console.log("hi");
        
        const token = req.cookies?.accessToken || req.Header("Authorization")?.replace("Bearer","")

        console.log("token",token)
        console.log("req cookies",req.cookies)
    
        if(!token){
            throw new ApiError(400,"You are not authorized")
        }
        
        const decodedToken =  jwt.verify(token,process.env.SECRETACCESSKEYJWT)

        const user = await User.findById(decodedToken._id)
           
        if(!user){
            throw new ApiError(400,"Invalid access token")
        }
        
        req.user = user

        next();

    } catch (error) {
        throw new ApiError(500,"Internal Server Error")
    }

})

const isAuthorized = asyncHandler(async(req,res,next)=>{
  

    if(req.user.role == "ADMIN"){
        next()
    }
    else{
        throw new ApiError(400,"Not Authorized") 
    }   
})




export {authMiddleware,isAuthorized}