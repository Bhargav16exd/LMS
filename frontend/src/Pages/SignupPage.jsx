import { useState } from "react";
import Homelayout from "../Layout/Homelayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAcc } from "../redux/slices/AuthSlice";

function Signup (){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signUpData , setSignUpData] = useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    })
    const [previewImage , setPreviewImage] = useState("") ;
    
    function handleUserInput(e){
     const{name,value} = e.target;
     setSignUpData({
        ...signUpData,
        [name]:value
     })
    }
    
    function getImage(e){
        e.preventDefault();

        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            setSignUpData({
             ...signUpData,
             avatar:uploadedImage
            })
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function(){
            setPreviewImage(this.result)
        })
    }

    async function createAccout(e){
        e.preventDefault();
      
        const formData = new FormData()
        formData.append("fullName" ,signUpData.fullName)
        formData.append("email" ,signUpData.email)
        formData.append("password" ,signUpData.password)
        
        if (signUpData.avatar) {
            formData.append("avatar", signUpData.avatar);
        }

            try {
             
                const res = await dispatch(createAcc(formData));
                 console.log("abc",res)
                if (res?.payload?.success) {
                    navigate('/');
                }
            } catch (error) {
                toast.error("An error occurred while creating the account");
            }


        setSignUpData({
        fullName:"",
        email:"",
        password:"",
        avatar:"" 
        })
        setPreviewImage("");
    }



    return(
        
        <Homelayout>
            <div className="h-[100vh] flex items-center justify-center">

                <form noValidate onSubmit={createAccout} className="flex flex-col justify-center items-center h-fit w-96 
                shadow-2xl rounded-2xl">
                   <h1 className="font-bold text-white te2t-3xl my-4   ">Registration Page</h1>

                   <label htmlFor="image_uploads">
                    {
                        previewImage ?
                        (<img src={previewImage}  className="h-24 w-24 rounded-full"/>) :                     
                        <BsPersonCircle className="h-24 w-24 cursor-pointer"/>
                    }
                   </label>
                   <input 
                   onChange={getImage}
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
                    className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleUserInput}
                    value={signUpData.fullName}
                     />
                   </div>

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
                    value={signUpData.email} />
                   </div>
                   <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    name="password" 
                    id="password"
                    required
                    placeholder="Enter Password ..."
                    className="bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleUserInput}
                    value={signUpData.password} />
                   </div>

                   <button
                //    type="submit"
                   className="my-5 rounded-lg text-xl px-2 py-1 w-80  bg-indigo-500 shadow-md shadow-indigo-500/50">
                    Register User
                   </button>

                   <p className="pb-2">
                    Already have an accout ? 
                    <Link to={'/login'} className="link"> Login </Link>
                   </p>

                </form>

            </div>
        </Homelayout>
    )
}
export default Signup;