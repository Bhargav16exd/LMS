import { useDispatch } from "react-redux";
import Homelayout from "../../Layout/Homelayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {CallEditLectureAPI} from "../../redux/slices/LectureSlice"

function EditLecture(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {courseId , lectureId} = useParams()
  
    const [data , setData] = useState({
        title:   "" ,
        description: ""
    })

    console.log(data)

    function handleInput(e){
        e.preventDefault();

        const {name , value} = e.target

        setData({
            ...data,
            [name]:value
        })

    }

    async function EditLecture(e){
        e.preventDefault()

        const sliceData = {
           courseId,
           lectureId,
           data
        }

        const res = await dispatch(CallEditLectureAPI(sliceData))

        if(res.payload.success){
            navigate(`/course/${courseId}/view-lecture`)
        }

    }


    

    return(
        
        <Homelayout>
            <form onSubmit={EditLecture} noValidate>
            <div className="ml-16  h-[90vh] py-4 px-4 flex justify-center items-center ">

             <div className=" h-3/4 w-3/4 py-4 px-4 flex shadow-md">
                
    

                {/* right section  */}
                <div className="h-full w-full  ml-2 flex flex-col justify-center items-center">

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
                        value={data.title}
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
                    value={data.description}
                    style={{
                        minHeight: '40px', 
                        height: 'auto',   
                        maxHeight:'150px' 
                      }}/>
                   </div>

                   <div className="h-1/3 flex items-center justify-center">
                     <button
                     className="my-5 rounded-lg text-xl px-2 py-1 w-80  bg-indigo-500 shadow-sm shadow-indigo-500/50">
                        Update Lecture
                     </button>
                     
                    </div> 

                </div>

             </div>

            </div>
          </form>
        </Homelayout>
    )

}

export default EditLecture

