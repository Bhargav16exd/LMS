import { useState } from "react";
import Homelayout from "../Layout/Homelayout";
import { useDispatch } from "react-redux";
import { crtCourse } from "../redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";

function CreateCourse(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [courseData,setCourseData] = useState({
        title:"",
        description:"",
        instructor:"",
        thumbnail:"",
        thumbnailPreview:""
    })

    function getThumbnail(e){
       e.preventDefault();
       const img = e.target.files[0];

       console.log(img)

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

    function handleUserInput(e){
        e.preventDefault();
        const {name,value} = e.target
        setCourseData({
            ...courseData,
            [name]:value
        })
    }

    async function createCourse(e){
       e.preventDefault();
        console.log(courseData)
       const formData = new FormData();
       formData.append("title",courseData.title)
       formData.append("description",courseData.description)
       formData.append("instructor",courseData.instructor)

       if(courseData.thumbnail){
        formData.append("thumbnail",courseData.thumbnail)
       }

      console.log(courseData)

       const res = await dispatch(crtCourse(formData))

       if (res?.payload?.success) {
        navigate('/courses');
       }

       setCourseData({
        ...courseData,
        title:"",
        description:"",
        instructor:"",
        thumbnail:"",
        thumbnailPreview:""
       })
    }

    

    return(
        <Homelayout>
        
        <div className="relative h-[90vh] ml-20 flex justify-center items-center">
            
            <form onSubmit={createCourse} className="bg-[#191A19] h-5/6 w-5/6 flex ">
             
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
                        Create Course
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

export default CreateCourse;