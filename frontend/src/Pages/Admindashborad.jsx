import { Link } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";

function AdminDashboard(){
    return(
        <Homelayout>
            <div className="h-[100vh] ml-16 ">
               <div className="mt-5 mx-5">
                    <h1 className="text-white font-extrabold text-5xl mx-5">Manage Course</h1>
                    <div className="mt-5 py-5">
                    <button className="rounded-lg py-5 mx-5 px-8 border border-yellow-600 text-yellow-600 font-semibold">
                    <Link to="/course/create-course">Create Course</Link> 
                    </button>
                    <button className="rounded-lg py-5 mx-5 px-8 border border-yellow-600 text-yellow-600 font-semibold">
                    <Link to="/courses">Update Course</Link> 
                    </button>
                    </div>
               </div>
            </div>
        </Homelayout>
    )
}

export default AdminDashboard;