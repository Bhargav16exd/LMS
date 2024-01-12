import {FiMenu} from "react-icons/fi"
import {AiFillCloseCircle} from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import Footer from "../components/Footer";
import {useDispatch, useSelector} from "react-redux"
import { logout } from "../redux/slices/AuthSlice";

function Homelayout ({children}){

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn);
   const role = useSelector((state)=> state?.auth?.role);

    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side");
         drawerSide[0].style.width = 'auto' ;
    }

    function hideDrawer(){
       const element = document.getElementsByClassName("drawer-toggle");
       element[0].checked=false;
       changeWidth();
    }

    async function handleLogout(e){
        e.preventDefault()

       const res = await dispatch(logout());
       console.log(res);
        navigate('/')
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
        {isLoggedIn && role === 'ADMIN' && <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>}

        {!isLoggedIn && (
          <div className="my-4 flex flex-row justify-evenly">

            <button className="rounded-sm py-2 px-4 border border-yellow-600 text-yellow-600 font-semibold">
             <Link to="/login">Login</Link>
            </button>
            <button className="rounded-sm py-2 px-4 bg-yellow-600 text-white font-semibold">
             <Link to="/signup">Sign Up</Link>
            </button>

          </div>
        )}
        {isLoggedIn && (
          <div className="my-4 flex flex-row justify-evenly">

            <button className="rounded-sm py-2 px-4 border border-yellow-600 text-yellow-600 font-semibold">
             <Link to="/user/profile">Profile</Link>
            </button>
            <button className="rounded-sm py-2 px-4 bg-yellow-600 text-white font-semibold">
             <Link onClick={handleLogout}>Logout</Link>
            </button>

          </div>
        )}

        </ul>
        </div> 

      </div>
         
        {children}

        <Footer/> 
  
      </div>
    )
}

export default Homelayout;
