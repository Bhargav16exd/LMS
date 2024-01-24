import { useState } from "react";
import Homelayout from "../Layout/Homelayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAcc } from "../redux/slices/AuthSlice";

function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })

   
    
    function handleUserInput(e){
     const{name,value} = e.target;
     setLoginData({
        ...loginData,
        [name]:value
     })
    }
    
    async function loginAccount(e){
        e.preventDefault();
  
                const res = await dispatch(loginAcc(loginData));
                if (res?.payload?.success) {
                    navigate('/');
                }
            

        setLoginData({
        email:"",
        password:""
        })
    }



    return(
        
        <Homelayout>
            <div className="h-[100vh] flex items-center justify-center">

                <form noValidate onSubmit={loginAccount} className="flex flex-col justify-center items-center h-fit w-96 
                shadow-2xl rounded-2xl">
                   <h1 className="font-bold text-white te2t-3xl my-4 ">Login Page</h1>

                   <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    name="email" 
                    id="email"
                    required
                    placeholder="Enter Email ..."
                    className=" bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleUserInput}
                    value={loginData.email} />
                   </div>

                   <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    name="password" 
                    id="password"
                    required
                    placeholder="Enter Password ..."
                    className="bg-transparent px-2 py-2 w-80 my-4 focus:outline-none shadow-md rounded-lg "
                    onChange={handleUserInput}
                    value={loginData.password} />
                   </div>

                   <button
                //    type="submit"
                   className="my-5 rounded-lg text-xl px-2 py-1 w-80  bg-indigo-500 shadow-md shadow-indigo-500/50">
                      Login
                   </button>

                   <p className="pb-2">
                     Dont have an account ? 
                    <Link to={'/signup'} className="link"> SignUp </Link>
                   </p>

                   <p className="pb-2">
                     
                    <Link to={'/forgot-password'} className="link"> Forgot Password ?  </Link>
                   </p>

                </form>

            </div>
        </Homelayout>
    )
}
export default Login