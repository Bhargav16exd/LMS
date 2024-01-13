import {BsInstagram,BsLinkedin,BsFacebook,BsTwitterX} from "react-icons/bs"

function Footer(){
     
    const date = new Date()
    const year = date.getFullYear();

    return(
        <>
        <footer className="relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between bg-[#191A19]
        text-white py-5 sm:px-20">
         
         <section className="text-lg">
           CopyRight {year} | All Rights Reserved 
         </section>

         <section className="flex items-center justify-center text-xl">
          
          <a className="px-2 hover:transition ease-in-out hover:text-green-600 " > <BsInstagram/> </a>
          <a className="px-2 hover:transition ease-in-out hover:text-green-600"> <BsFacebook/> </a>
          <a className="px-2 hover:transition ease-in-out  hover:text-green-600"> <BsTwitterX/> </a>
          <a className="px-2 hover:transition ease-in-out  hover:text-green-600"> <BsLinkedin/> </a>
       
         </section>
            
        </footer>
        </>
    )
} 

export default Footer;