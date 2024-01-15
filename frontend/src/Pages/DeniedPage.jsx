import { Link } from "react-router-dom";

function DeniedPage (){
    return(
       <div className="h-screen bg-[#191A19] flex flex-col items-center justify-center">
        
        <h1 className="text-9xl font-extrabold text-white">403</h1>
        <div className="bg-black text-sm px-2 rotate-12 absolute">Access Denied </div>
        <Link to="/">
        <button className="px-4 py-2 mt-5 border border-blue-500 rounded-md">Homepage</button>
        </Link>
       </div>
    )
}

export default DeniedPage;