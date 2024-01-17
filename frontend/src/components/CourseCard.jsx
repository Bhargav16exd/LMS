import { useSelector} from "react-redux"
import { Link } from "react-router-dom";

function CourseCard({title,instructor,thumbnail,id}){

   const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn);
   
    return(
        <>
         <div className=" my-2 rounded-xl  inline-block mx-5 h-auto w-[350px] overflow-hidden bg-[#191A19] text-white">
         <img src={thumbnail} className="h-[150px] w-full" />
         <div className="flex">
        <div className="w-full flex items-center justify-center">
         <h2 className="font-bold font-mono text-2xl px-2 pt-2 ">{title}</h2>
         </div>
         <div className="w-full flex justify-center items-center">
          {
            isLoggedIn ? 
            <>
            <button className="my-4 mx-1 rounded-xl py-2 px-1 border border-yellow-600 text-yellow-600 font-semibold">
             <Link to={`/courses/course-details/${id}`}>View Course</Link>
            </button>  
            </>
           : <></>
          }
          </div>
          </div>
        </div>
        </>
    )
}

export default CourseCard;