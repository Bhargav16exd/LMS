import {FiMenu} from "react-icons/fi"
import {AiFillCloseCircle} from "react-icons/ai"
import {Link} from "react-router-dom"
import Footer from "../components/Footer";

function Homelayout ({children}){


    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side");
         drawerSide[0].style.width = 'auto' ;
    }

    function hideDrawer(){
       const element = document.getElementsByClassName("drawer-toggle");
       element[0].checked=false;
       changeWidth();
    }

   return(
    <div className="min-h-[90vh] ">

    <div className={`drawer absolute left-0 z-50 w-fit`}>
         <input type="checkbox" className="drawer-toggle" id="my-drawer-4"/>
         <div className="drawer-content">
       
          <label htmlFor="my-drawer-4"  >
            <FiMenu
             size={"32px"}
             className="font-bold text-white m-4 cursor-pointer  "
             onClick={changeWidth}
            /> 
           </label>    
        </div> 
        <div className="drawer-side w-0">
        <label htmlFor="my-drawer-4" className="drawer-overlay" ></label>
        <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
        
        <li className="w-fit absolute z-50 right-2">
          <button onClick={hideDrawer}>
            <AiFillCloseCircle size={24} />
          </button>
        </li>
        
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">courses</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/about">About Us</Link></li>

        </ul>
        </div> 

      </div>
         
        {children}

        <Footer/> 
  
      </div>
    )
}

export default Homelayout;
