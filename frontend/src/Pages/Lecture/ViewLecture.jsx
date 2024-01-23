import { useEffect, useState } from "react";
import Homelayout from "../../Layout/Homelayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  { DeleteLecture, ListLectures } from "../../redux/slices/LectureSlice";
import Popup from 'reactjs-popup';

function ViewLecture(){

    const {courseId}= useParams();
    const dispatch = useDispatch();
    const lectureDataFromState = useSelector((state)=> state?.lecture?.lectures)
    const [currentLecture , setCurrentLecture] = useState(0)
    const role = useSelector((state)=>state?.auth?.role)
    const navigate = useNavigate()

    console.log(lectureDataFromState)


    useEffect(()=>{
        getLectureData()
     },[])

    async function getLectureData(){

        const res = await dispatch(ListLectures(courseId))

    }

    async function handleDelete(){
        const IDs = {
            courseId:courseId,
            lectureId:lectureDataFromState[currentLecture]?._id
        }
        const res = await dispatch(DeleteLecture(IDs))

        console.log(res)
        
        if(res.payload.success){
           window.location.reload()
        }
    }

  

    return(
        <Homelayout>

            <div className="ml-16 h-[90vh] flex py-4 px-4">
                 
                {/* left section */}


                
                {
                  lectureDataFromState.length > 0  &&  
                 <div className=" h-full w-1/2">
                  <video 
                  src={lectureDataFromState[currentLecture]?.videoURL}
                  controls
                  controlsList="nodownload"
                  muted
                  className="h-8/12 w-full"
                  ></video>
                  <h1 className="font-extrabold text-5xl text-yellow-600 my-4 ">{lectureDataFromState[currentLecture]?.title}</h1>
                  <p className="font-mono text-xl text-white my-2">{lectureDataFromState[currentLecture]?.description}</p>
                  
                </div>
                
                }

                {/* right section  */}
                <div className="h-full w-1/2">

                    {  role == "ADMIN" ? 
                     <div className="w-full h-[10vh] flex items-center justify-end">
                           <button 
                            className="my-2 mx-2 rounded-xl py-1 px-4 border border-yellow-600 text-yellow-600 font-semibold">
                            <Link to={`/course/${courseId}/create-lecture`}>Add Lecture</Link> 
                            </button>
                     </div> : <></>
                    }
                    <ul>
                    {
                        lectureDataFromState && 
                         
                        lectureDataFromState.map((data,index)=>{
                             return(
                                <li className="h-[10vh] flex px-4 bg-[#191A19] my-2 mx-2 rounded-lg" key={index}>
                                    
                                 <div className="w-1/2 h-full flex justify-start items-center ">
                                   <h1 
                                   className="font-extrabold text-2xl text-yellow-600 cursor-pointer"
                                   onClick={()=>setCurrentLecture(index)}
                                   >{data.title}</h1>
                                 </div>

                                 <div className="w-1/2 h-full flex justify-end items-center">
                                  {role == "ADMIN" && 
                                        <>
                                        <Popup trigger={
                                            <button 
                                            className="my-2 mx-2 rounded-xl py-1 px-1 border border-yellow-600 text-yellow-600 font-semibold">
                                            Delete Lecture
                                            </button>
                                            }
                                            modal
                                            >
                                            <div className=" h-[200px] w-[400px] bg-red-500 bg-opacity-80 rounded-lg text-white">
                                             <div className="h-1/2 flex flex-col justify-center items-center">  
                                             <h1 className="font-extrabold  text-3xl my-2"> Warning !</h1>
                                             <p className="my-2"> Are You sure you want to delete this video ?</p>
                                             </div>
                                             <div className="flex h-1/2 justify-center items-center">
                
                                             <button 
                                               onClick={handleDelete}
                                              className="my-2 mx-2 rounded-xl py-1 px-4 bg-green-500 text-white font-semibold">
                                              Confirm
                                             </button>
                                            
                                             <Link to={'/courses'}>
                                             <button 
                                              className="my-2 mx-2 rounded-xl py-1 px-4 bg-red-700 text-white font-semibold">
                                             Deny
                                             </button>
                                             </Link>
                
                                             </div>
                
                                            </div>
                                            </Popup>
                                            <button
                                            className="my-2 mx-2 rounded-xl py-1 px-1 border border-yellow-600 text-yellow-600 font-semibold">
                                            <Link to={`/course/${courseId}/edit-lecture/${lectureDataFromState[currentLecture]?._id}`}>Edit Lecture</Link>    
                                            </button>

                                        </>
                                  }
                                  </div>

                                </li>
                             )
                        })
                    }
                    </ul> 



                </div>

            </div>

        </Homelayout>
      
    )
}

export default ViewLecture;