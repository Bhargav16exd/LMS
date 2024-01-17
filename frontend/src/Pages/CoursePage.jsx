import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../Layout/Homelayout";
import { useEffect } from "react";
import { getCourses } from "../redux/slices/courseSlice";
import CourseCard from "../components/CourseCard";

function CoursePage(){

    const dispatch = useDispatch();
    const courseData = useSelector((state)=>state.course.courseData)

    async function getData(){
        await dispatch(getCourses())
    }
    useEffect(()=>{
        getData()
    },[])
    return(
        <Homelayout>
            <div className="min-h-[90vh] h-auto ml-16 flex-wrap">
             <div className="ml-10 mt-2 py-10 px-2">
             
             {courseData.map((data)=> 
                                      <CourseCard 
                                       id={data._id}
                                       key={data._id} 
                                       title={data.title} 
                                       description={data.description}
                                       instructor={data.instructor}
                                       thumbnail={data.thumbnailURL}
                                       />
                                     
                                       )}

            
            </div>
            </div>
        </Homelayout>
    )
}

export default CoursePage;