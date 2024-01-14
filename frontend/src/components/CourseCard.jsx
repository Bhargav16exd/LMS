import { useSelector} from "react-redux"
import { Link } from "react-router-dom";

function CourseCard({title,description,thumbnail,id}){

   const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn);
   

    return(
        <>
         <div className="rounded-xl  inline-block mx-5 h-auto w-[350px] overflow-hidden bg-[#191A19] text-white">
         <img src={thumbnail} className="h-[150px] w-full" />
         <div className="flex">
        <div className="w-1/2">
         <h2 className="font-bold font-mono text-2xl px-2 pt-2 ">{title}</h2>
         <p className="px-2 py-1 font-mono font-semibold">{description}</p>
         </div>
         <div className="w-1/2 flex justify-center items-center">
          {
            isLoggedIn ? 
            <>
            <button className="my-2 mx-2 rounded-xl py-1 px-2 border border-yellow-600 text-yellow-600 font-semibold">
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