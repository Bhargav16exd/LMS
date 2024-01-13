import { Link } from "react-router-dom"
import Homelayout from "../Layout/Homelayout"

function Homepage(){
    return(
            
            <Homelayout>
             <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                 <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">
                        Find out best
                        <span className="text-yellow-600 font-bold mx-4">
                                  Online Courses 
                        </span>
                    </h1>
                    <p className="text-gray-200 text-xl">
                        We have large library of courses taught by highly skilled faculties 
                    </p>
                    <div className="space-x-6 flex">
                   <Link to='/courses'>< button className="rounded-lg bg-yellow-500 flex px-2 py-2">Explore Courses</button></Link> 
                    <Link to='/contact'>< button className="rounded-lg border border-yellow-500 text-yellow-500 px-2 py-2">Contact Us</button> </Link>
                 </div>
                 </div>
             </div>
            
            </Homelayout>
          
    )
}

export default Homepage