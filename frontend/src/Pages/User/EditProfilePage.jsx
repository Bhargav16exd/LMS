import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../../Layout/Homelayout";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { updateProfilePicture } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function EditProfilePage(){

    const {avatar ,email , fullName } = useSelector((state)=>state?.auth?.data)


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [profile ,setProfile] = useState({
        profilePreview:avatar,
        profileURL:""
    })

    function getProfile(e){
       e.preventDefault();
       const img = e.target.files[0]

     
       const fileReader = new FileReader()
       fileReader.readAsDataURL(img)
       fileReader.addEventListener("load",function(){
        setProfile({
            ...profile,
            profileURL:img,
            profilePreview:this.result,
        })
       })

    }

    async function updateProfile(e){

        e.preventDefault()

        const formData = new FormData()

        if(!profile.profileURL){
            toast.error("Kindly Upload avatar")
        }

        if(profile.profileURL){
            formData.append("avatar",profile.profileURL)
            const res = await dispatch(updateProfilePicture(formData))
            console.log(res)

            if(res.payload.success){
                setProfile({
                    ...profile,
                    profilePreview:"",
                    profileURL:""
                })
                navigate('/user/profile')
            }
        }


    }


    return (
        <Homelayout>

        <div className="h-[90vh] ml-16 flex justify-center items-center">

            
            <div className="h-3/4 w-2/4 py-4 rounded-md shadow-md shadow-blue-400">
              
             <form noValidate onSubmit={updateProfile} className="h-full w-full">
                <div className=" h-3/4 w-full font-mono flex flex-col justify-center items-center space-y-4">
             
                  
                 <label htmlFor="image_uploads">
                    {
                        profile.profilePreview ?
                        (<img src={profile.profilePreview}  className="h-24 w-24 rounded-full"/>) :                     
                        <BsPersonCircle className="h-24 w-24 cursor-pointer"/>
                    }
                   </label>
                   <input 
                   onChange={getProfile}
                   type="file"
                   id="image_uploads"
                   name="image_uploads" 
                   className="hidden"
                   accept=".jpg , .png , .svg" />
                 


                 <p>email : {email}</p>
                 <p>fullName : {fullName}</p>


                </div> 

                <div className="flex ">
                <div className="h-1/4 w-full flex justify-around items-center">
                    <button className="rounded-sm py-2 px-5 border border-yellow-600 text-yellow-600  font-semibold">
                      Update Profile 
                    </button>
                </div>
                </div>
            </form>
            </div>
            

        </div>

    </Homelayout>
    )
}

export default EditProfilePage;