import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        lowercase:true,
        minLength:[5,'Name should be atleast 5 char'],
        maxLength:[50,'Max 50 char allowed'],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    },

    forgotPasswordToken:String,
    forgotPasswordExpiry:Date

},{timestamps:true})



userSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password,this.password)
}



export const User = mongoose.model("User",userSchema);