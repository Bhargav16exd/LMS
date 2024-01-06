import { useState } from "react";
import Homelayout from "../Layout/Homelayout";
import { BsPersonCircle } from "react-icons/bs";

function Signup (){

    const [previewImage , setPreviewImage] = useState("") ;


    return(
        
        <Homelayout>
            <div className="h-[100vh] flex items-center justify-center">

                <form className="flex flex-col justify-center items-center h-fit w-96 
                shadow-2xl rounded-2xl">
                   <h1 className="font-bold text-white te2t-3xl my-4   ">Registration Page</h1>

                   <label htmlFor="image_uploads">
                    {
                        previewImage ?
                        (<img src={previewImage} alt="" srcset="" />) :                     
                        <BsPersonCircle className="h-24 w-24 cursor-pointer"/>
                    }
                   </label>
                   <input 
                   type="file"
                   id="image_uploads"
                   name="image_uploads" 
                   className="hidden"
                   accept=".jpg , .png , .svg" />

                   <div className="flex flex-col gap-1"> 
                    <label htmlFor="fullName">fullName</label>
                    <input 
                    type="fullName"
                    name="fullName" 
                    id="fullName"
                    required
                    placeholder="Enter fullName ..."
                    className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg " />
                   </div>

                   <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    name="email" 
                    id="email"
                    required
                    placeholder="Enter Email ..."
                    className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg " />
                   </div>
                   <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    name="password" 
                    id="password"
                    required
                    placeholder="Enter Password ..."
                    className="bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg " />
                   </div>

                   <button
                   type="submit"
                   className="my-5 rounded-lg text-xl px-2 py-1 w-80  bg-indigo-500 shadow-md shadow-indigo-500/50">
                    Register User
                   </button>

                </form>

            </div>
        </Homelayout>
    )
}
export default Signup;