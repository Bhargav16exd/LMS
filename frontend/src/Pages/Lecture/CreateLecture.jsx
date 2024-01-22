import { useDispatch } from "react-redux";
import Homelayout from "../../Layout/Homelayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { createLecture } from "../../redux/slices/LectureSlice";

function CreateLecture(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [videoState , setVideoState] = useState({
        title:"",
        description:"",
        video:"",
        videoPreview:""
    })



    function getVideo(e){

        e.preventDefault();

        const uploadedVideo = e.target.files[0]

        if(uploadedVideo){
            setVideoState({
                ...videoState,
                video:uploadedVideo
            })
        }
        
        const fileReader = new FileReader()
        fileReader.readAsDataURL(uploadedVideo)
        fileReader.addEventListener("load",function(){
            setVideoState({
                ...videoState,
                video:uploadedVideo,
                videoPreview:this.result 
            })
        })

    }


    function handleInput(e){

        e.preventDefault();
        const {name,value} = e.target
        setVideoState({
            ...videoState,
            [name]:value
        })

    }

    async function onUpload(e){

        e.preventDefault()
        const formData = new FormData()
        formData.append("title",videoState.title)
        formData.append("description",videoState.description)

        if(videoState.video){
            formData.append("video",videoState.video)
        }

        const res = await dispatch(createLecture({courseId,formData}))

        if(res.payload.success){
            navigate(`/course/${courseId}/view-lecture`)
        }
        
    }

    return(
        <Homelayout>

          <form onSubmit={onUpload}>
            <div className="ml-16  h-[90vh] py-4 px-4 flex justify-center items-center ">

             <div className=" h-3/4 w-3/4 py-4 px-4 flex shadow-md">
                
                {/* left section */}
                <div className="h-full w-1/2 mr-2">
                    
                <label htmlFor="image_uploads">
                    {
                        videoState.videoPreview ?
                        (<video src={videoState.videoPreview} controls muted className="h-2/3 w-full cursor-pointer"/>) :                     
                        (<h1 className="h-2/3 w-full cursor-pointer  border-gray-600 flex justify-center items-center shadow-xl">Upload Video</h1>)
                    }
                   </label>
                   <input 
                   onChange={getVideo}
                   type="file"
                   id="image_uploads"
                   name="image_uploads" 
                   className="hidden"
                   accept=".jpg , .png , .svg" />

                   <div className="h-1/3 flex items-center justify-center">
                     <button
                     className="my-5 rounded-lg text-xl px-2 py-1 w-80  bg-indigo-500 shadow-sm shadow-indigo-500/50">
                        Create Lecture
                     </button>
                    </div> 

                </div>

                {/* right section  */}
                <div className="h-full w-1/2  ml-2 flex flex-col justify-center items-center">

                <div className="flex flex-col gap-1"> 
                        <label htmlFor="title">Lecture Title</label>
                        <input 
                        type="text"
                        name="title" 
                        id="title"
                        required
                        placeholder="Enter title ..."
                        className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                        onChange={handleInput}
                        value={videoState.title}
                        />
                    </div>
                    <div className="flex flex-col gap-1"> 
                    <label htmlFor="description">description</label>
                    <textarea
                    type="text"
                    name="description" 
                    id="description"
                    required
                    placeholder="Enter description ..."
                    className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleInput}
                    value={videoState.description}
                    style={{
                        minHeight: '40px', 
                        height: 'auto',   
                        maxHeight:'150px' 
                      }}/>
                   </div>

                </div>

             </div>

            </div>
          </form>
        </Homelayout>
    )
}

export default CreateLecture