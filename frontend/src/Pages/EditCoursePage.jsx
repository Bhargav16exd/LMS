import { useNavigate, useParams } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";
import { updateCoures } from "../redux/slices/courseSlice";

function EditCourse(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const course = useSelector((state)=>state.course.course)
    
    const {courseId} = useParams()
    
    const [courseData,setCourseData] = useState({
        title:course.title,
        description:course.description,
        instructor:course.instructor,
        thumbnail:"",
        thumbnailPreview:course.thumbnailURL
    })
    

    function getThumbnail(e){
       e.preventDefault();
       const img = e.target.files[0];
       const fileReader = new FileReader();
       fileReader.readAsDataURL(img);
       fileReader.addEventListener("load", function(){
        setCourseData({
            ...courseData,
            thumbnailPreview:this.result,
            thumbnail:img
        })
       })

    }
    
    // Changes the Course Data State

    function handleUserInput(e){
        e.preventDefault();

        const {name,value} = e.target
        setCourseData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
    
    
    async function upCourse(e){
       e.preventDefault();
 
        //Updating Thumbnail

       if(courseData.thumbnail){
            const formData = new FormData();
            formData.append("thumbnail",courseData.thumbnail)
            try {
                const response = axiosInstance.post(`http://localhost:9000/api/v1/course/${courseId}/edit-thumbnail`,formData)
                toast.promise(response,{
                    loading:"Updating Thumbnail"
                })
                await response
            } catch (error) {
                console.log(error)
                toast.error("Error While Uploading Thumnail")
            }
       }

       
          // Updating Course Data

            const res = await dispatch(updateCoures({courseData,courseId}))    
            
            console.log(res)

            if(res.payload.success){
                setCourseData({
                    ...courseData,
                    title:"",
                    description:"",
                    instructor:"",
                    thumbnail:"",
                    thumbnailPreview:""
                }) 
                navigate('/courses');
            }
             
    }

    return (
        <Homelayout>
        
        <div className="relative h-[90vh] ml-20 flex justify-center items-center">
            
            <form onSubmit={upCourse} className="bg-[#191A19] h-5/6 w-5/6 flex ">
             
                <div className=" w-1/2 h-full">

                   <label htmlFor="image_uploads">
                    {
                        courseData.thumbnailPreview ?
                        (<img src={courseData.thumbnailPreview}  className="h-2/3 w-full cursor-pointer"/>) :                     
                        (<h1 className="h-2/3 w-full cursor-pointer border border-gray-600 flex justify-center items-center">Upload Thumbnail</h1>)
                    }
                   </label>
                   <input 
                   onChange={getThumbnail}
                   type="file"
                   id="image_uploads"
                   name="image_uploads" 
                   className="hidden"
                   accept=".jpg , .png , .svg" />
                    <div className="h-1/3 flex items-center justify-center">
                    <button
                    className="my-5 rounded-lg text-xl px-2 py-1 w-80  bg-indigo-500 shadow-md shadow-indigo-500/50">
                        Update Course
                    </button>
                    </div>    
                </div>

                {/* left section */}

                <div className="text-white flex justify-center items-center flex-col w-1/2 h-full font-mono">

        
                    <div className="flex flex-col gap-1"> 
                        <label htmlFor="title">Course Title</label>
                        <input 
                        type="text"
                        name="title" 
                        id="title"
                        required
                        placeholder="Enter title ..."
                        className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                        onChange={handleUserInput}
                        value={courseData.title}
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
                    onChange={handleUserInput}
                    value={courseData.description}
                    style={{
                        minHeight: '40px', 
                        height: 'auto',   
                        maxHeight:'150px' 
                      }}/>
                   </div>
                   <div className="flex flex-col gap-1"> 
                        <label htmlFor="instructor">Instructor</label>
                        <input 
                        type="text"
                        name="instructor" 
                        id="instructor"
                        required
                        placeholder="Enter instructor ..."
                        className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                        onChange={handleUserInput}
                        value={courseData.instructor}
                        />
                    </div>
                    
                </div>
                
          
            </form>
        </div>
        
       </Homelayout>
    )
}

export default EditCourse;