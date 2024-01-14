import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../Layout/Homelayout";
import { Link, useParams } from "react-router-dom";
import { getCourseDetail } from "../redux/slices/courseSlice";
import { useEffect } from "react";
import { handleSubscribe } from "../redux/slices/AuthSlice";


function Courseinfo(){


    const dispatch = useDispatch();
    const {courseId} = useParams()
    const course = useSelector((state)=>state.course.course)
    const isLoggedIn = useSelector((state)=> state?.auth.isLoggedIn);
    const subCourses = useSelector((state)=> state?.auth.subscribedCourse) || []
    const role = useSelector((state)=>state?.auth?.role)

     console.log(subCourses)

    async function getData(){
         await dispatch(getCourseDetail(courseId))
    }
   
    async function Subscribe(){
        await dispatch(handleSubscribe(courseId))        
    }

    useEffect(()=>{
        getData()
    },[courseId])

    return(
       <Homelayout>
        <div className="relative h-[90vh] ml-20 flex justify-center items-center">

            <div className="bg-[#191A19] h-5/6 w-5/6 flex ">
                <div className=" w-1/2 h-full">
                   <img src={course.thumbnailURL} alt="" className="h-2/3 w-full" />
                    <div className="h-1/3 flex justify-center items-center">
                     {
                        isLoggedIn ? 
                        <>
                        { subCourses.includes(courseId)?
                        
                             <button className="my-2 mx-2 rounded-xl py-1 px-2 border border-yellow-600 text-yellow-600 font-semibold">
                             <Link >View Lectures</Link>
                            </button> 
                             :
                             <button className="my-2 mx-2 rounded-xl py-1 px-2 border border-yellow-600 text-yellow-600 font-semibold">
                             <Link onClick={Subscribe} >Subscribe</Link>
                            </button> 
                        }
                        {
                            role == "ADMIN" ? 
                            <button className="my-2 mx-2 rounded-xl py-1 px-2 border border-yellow-600 text-yellow-600 font-semibold">
                            <Link >Admin Options</Link>
                           </button>
                            :
                            <></>
                        }                   
                        </>
                        :
                        <></>
                     }   
                    </div>
                </div>
                <div className="text-white flex justify-center items-center flex-col w-1/2 h-full">
                <h1 className="font-extrabold text-5xl relative my-10  ">{course.title}</h1>
                 <p className="my-10 font-mono text-xl">Description : {course.description}</p>
                 <h2 className="my-10 font-mono text-xl" >Instructor : {course.instructor}</h2>
                </div>
            </div>
      
        </div>
       </Homelayout>
    )
}

export default Courseinfo;