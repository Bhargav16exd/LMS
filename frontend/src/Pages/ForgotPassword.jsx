import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import {  useNavigate } from "react-router-dom"
import Homelayout from "../Layout/Homelayout"
import { CallForgotPasswordAPI } from "../redux/slices/AuthSlice"

function ForgotPassword(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [emailFlag , setMailFlag]  = useState(false)
    const [email , setEmail] = useState("");
    
    function handleUserInput(e){
        e.preventDefault()
        
        setEmail(e.target.value)
    }
    
    const emailObject = {
        email
    }
    
    async function ForgotPassword(e){

        e.preventDefault();


        if(email){
           const res = await dispatch(CallForgotPasswordAPI(emailObject))

           console.log(res)

           if(res.payload.success){
            setMailFlag(true)
           }
        }
        else{
            toast.error("Email Is required")
        }

    }

    return(
        <Homelayout>
            <div className="h-[100vh] flex items-center justify-center">

                <form  onSubmit={ForgotPassword} className="flex flex-col justify-center items-center h-fit w-96 
                shadow-2xl rounded-2xl">
                   <h1 className="font-bold text-white text-3xl my-4 ">Enter Email </h1>

                   <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    name="email" 
                    id="email"
                    required
                    placeholder="Enter Email ..."
                    className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleUserInput}
                    value={email.email} />
                   </div>
                   
                   <button
                //    type="submit"
                   className="my-5 rounded-lg text-xl px-2 py-1 w-80  bg-indigo-500 shadow-md shadow-indigo-500/50">
                      Submit
                   </button>

                   {
                    emailFlag && 
                       <p className="text-green-600">Email is sent ! Kindly Check your email</p>
                   }

        

                   

                </form>

            </div>
        </Homelayout>
    )

}

export default ForgotPassword