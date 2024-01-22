import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../Layout/Homelayout";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteCourse, getCourseDetail } from "../redux/slices/courseSlice";
import { useEffect } from "react";
import { handleSubscribe } from "../redux/slices/AuthSlice";
import Popup from 'reactjs-popup';



function Courseinfo(){
 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams()
    const course = useSelector((state)=>state.course.course)
    const isLoggedIn = useSelector((state)=> state?.auth.isLoggedIn);
    const subCourses = useSelector((state)=> state?.auth.subscribedCourse) || []
    const role = useSelector((state)=>state?.auth?.role)

    async function getData(){
         await dispatch(getCourseDetail(courseId))
    }
   
    async function Subscribe(){
        await dispatch(handleSubscribe(courseId))        
    }

    async function Delete(){
       const res = await dispatch(deleteCourse(courseId))
       console.log(res)
       if(res.payload.success){
          navigate('/courses')
       }
    }

    useEffect(()=>{
        getData()
    },[])

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
                             <Link to={`/course/${courseId}/view-lecture`} >View Lectures</Link>
                            </button> 
                             :
                             <button className="my-2 mx-2 rounded-xl py-1 px-2 border border-yellow-600 text-yellow-600 font-semibold">
                             <Link onClick={Subscribe} >Subscribe</Link>
                             </button> 
                        }
                        {
                            role == "ADMIN" ?  
                            <>
                            <button className="my-2 mx-2 rounded-xl py-1 px-1 border border-yellow-600 text-yellow-600 font-semibold">
                            <Link to={`/courses/edit-course/${courseId}`}>Edit Course</Link>
                            </button>

                            <Popup trigger={
                            <button 
                            className="my-2 mx-2 rounded-xl py-1 px-1 border border-yellow-600 text-yellow-600 font-semibold">
                            Delete Course
                            </button>
                            }
                            modal
                            >
                            <div className=" h-[200px] w-[400px] bg-red-500 bg-opacity-80 rounded-lg text-white">
                             <div className="h-1/2 flex flex-col justify-center items-center">  
                             <h1 className="font-extrabold  text-3xl my-2"> Warning !</h1>
                             <p className="my-2"> Are You sure you want to delete this video ?</p>
                             </div>
                             <div className="flex h-1/2 justify-center items-center">

                             <button 
                              className="my-2 mx-2 rounded-xl py-1 px-4 bg-green-500 text-white font-semibold">
                            <Link onClick={Delete} >Confirm</Link>
                             </button>
                            
                             <Link to={'/courses'}>
                             <button 
                              className="my-2 mx-2 rounded-xl py-1 px-4 bg-red-700 text-white font-semibold">
                             Deny
                             </button>
                             </Link>


                             </div>
 

                            </div>
                            </Popup>

                            
                            </>
                            : <></>
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