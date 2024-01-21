import { useSelector } from "react-redux";
import Homelayout from "../../Layout/Homelayout";
import { Link } from "react-router-dom";


function Profile(){

    const {avatar ,email , fullName , role} = useSelector((state)=>state?.auth?.data)

    return(
        <Homelayout>

            <div className="h-[90vh] ml-16 flex justify-center items-center">

                <div className="h-3/4 w-2/4 rounded-md shadow-md shadow-blue-400">

                    <div className=" h-3/4 w-full font-mono text-xl flex flex-col justify-center items-center space-y-4">
                     <img src={avatar} alt=""  className="h-[150px] w-[150px] rounded-full"/>
                     <p>email : {email}</p>
                     <p>fullName : {fullName}</p>
                     <p>role : {role}</p>
                    </div> 
                    <div className="h-1/4 w-full flex justify-around items-center">

                        <button className="rounded-sm py-2 px-5 border border-yellow-600 text-yellow-600  font-semibold">
                        <Link to={'/user/change-password'}>Change Password </Link> 
                        </button>
                        <button className="rounded-sm py-2 px-5 border border-yellow-600 text-yellow-600 font-semibold">
                        <Link to={'/user/edit-profile'}>Edit Profile Picture</Link>
                        </button>

                        
                    </div>

                </div>

            </div>

        </Homelayout>
    )

}

export default Profile;