import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../../Layout/Homelayout";
import { updateCurrentPassword } from "../../redux/slices/AuthSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangePasswordPage(){

    
    const {avatar} = useSelector((state)=>state?.auth?.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [password , setPassword] = useState({
        newPassword : "",
        oldPassword : ""
    })

    const passwordObject = {
        newPassword : password.newPassword,
        oldPassword : password.oldPassword
    }

    function handleInput(e){
        e.preventDefault()
        const {name,value} = e.target 
        setPassword({
            ...password,
           [name]:value
        })
    }

    async function updatePassword(e){
        e.preventDefault();
        
        if(password.newPassword && password.oldPassword){
            const res = await dispatch(updateCurrentPassword(passwordObject))
            
            if(res.payload.success){

                setPassword({
                    ...password,
                   newPassword:"",
                   oldPassword:""
                }) 
                passwordObject.newPassword="",
                passwordObject.oldPassword=""
                navigate('/user/profile')
            }
        }
        else{
            toast.error("All Feilds are required")
        }

    }


    return(
        <Homelayout>

        <div className="h-[90vh] ml-16 flex justify-center items-center">

            
            <div className="h-auto w-2/4 py-4 rounded-md shadow-md shadow-blue-400">
              
             <form noValidate onSubmit={updatePassword} className="h-full w-full">
                <div className=" h-3/4 w-full font-mono flex flex-col justify-center items-center space-y-4">
             

                <img src={avatar}  className="h-24 w-24 rounded-full"/>
                 
                 <div className="flex flex-col gap-1">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input 
                    type="password"
                    name="oldPassword" 
                    id="oldPassword"
                    required
                    placeholder="Enter Old Password ..."
                    className="bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleInput}
                    value={password.oldPassword}
                     />
                </div>
                

                <div className="flex flex-col gap-1">
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                    type="password"
                    name="newPassword" 
                    id="newPassword"
                    required
                    placeholder="Enter New Password ..."
                    className="bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleInput}
                    value={password.newPassword}
                     />
                   </div>
                </div> 

                <div className="flex ">
                <div className="h-1/4 w-full flex justify-around items-center">
                    <button className="rounded-sm py-2 px-5 border border-yellow-600 text-yellow-600  font-semibold">
                      Change Password 
                    </button>
                </div>
                </div>
            </form>
            </div>
            

        </div>

    </Homelayout>
    )
}

export default ChangePasswordPage;