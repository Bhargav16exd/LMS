import { Link } from "react-router-dom";
import GIF from "../assets/gif.gif"

function Notfound(){

    return(
         
        <div className="h-screen flex  flex-col items-center justify-center bg-cover bg-center"
        
         style={{ backgroundImage: `url(${GIF})` }}>
           
           <div className=" h-[90vh] w-full flex" >
             <div className="h-full w-1/2 flex items-center justify-center">
               <h1 className="text-white text-9xl font-bold space-y-4">404</h1>
             </div>
             <div className="h-full w-1/2 flex items-center justify-center">
               <p className="text-2xl space-y-4 text-white">Opps ! The Requested Page doesnt Exist</p>
             </div> 
           </div>

           <div className=" h-[10vh] w-full flex justify-center items-center">
                <Link to='/'>
               <button className="btn btn-outline">Go Back Home</button>
               </Link>
           </div>
                    
         </div>
    )
}

export default Notfound;