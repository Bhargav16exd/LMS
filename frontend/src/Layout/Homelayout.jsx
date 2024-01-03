import {FiMenu} from "react-icons/fi"
function Homelayout (){

    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side")
         drawerSide[0].style.width = 0
    }
   return(
    <div className="min-h-[90vh] border border-black">

        <div className="drawer absolute left-0 z-50 w-fit border border-black ">
         <input type="checkbox" className="drawer-toggle" id="my-drawer-4"/>
         <div className="drawer-content">
          page content goes here

          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
             size={"32px"}
             className="font-bold text-black m-4"
             onClick={changeWidth()}
            /> 
           </label>    
        </div> 
        <div className="drawer-side w-0">
            </div>  
        </div>
         
  
      </div>
    )
}

export default Homelayout;
