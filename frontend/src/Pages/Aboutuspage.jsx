import Homelayout from "../Layout/Homelayout";

// image imports
import aboutMainImage from "../assets/aboutMainImage.png"
import apj from "../assets/apj.png"
import bill from "../assets/billGates.png"
import sj from "../assets/steveJobs.png"
import einstein from "../assets/einstein.png"
import nelson from "../assets/nelsonMandela.png"

function Aboutus(){
    

    return(
        <Homelayout>
            <div className="pl-20 pt-20 text-white flex flex-col">
                <div className="flex ">
                    <section className="px-4 py-4 w-1/2 space-y-7 h-auto flex flex-col justify-center">
                        <h1 className="text-yellow-500 font-semibold text-3xl">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-gray-400 text-xl">
                            Our goal is to provide affordable and Quality Education to the world.
                            We are providing platform for teacher and students to enhance thier skills
                            and share with each other for better human society 
                        </p>
                    </section>
                    <div className="w-1/2">
                        <img src={aboutMainImage} alt="" />
                    </div>
                </div>

                <div className=" my-5 flex justify-center py-4"> 

                 <div className="innerBox w-1/2 flex flex-col justify-center align-middle">
                     
                   <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full flex justify-center align-middle">
                        <div className="flex flex-col justify-center items-center ">
                        <img src={sj} className="w-40 h-40 rounded-full " />
                        <h1 className="text-center py-5 text-2xl font-semibold">Steve Jobs</h1>
                        <p>
                        "Embrace the challenge, for within adversity lies the seed of your greatest growth"
                        </p>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide2" className="carousel-item relative w-full flex justify-center align-middle">
                        <img src={einstein} className="h-40 rounded-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide3" className="carousel-item relative w-full flex justify-center align-middle">
                        <img src={nelson} className="h-40 rounded-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide4" className="carousel-item relative w-full flex justify-center align-middle">
                        <img src={bill} className="h-40 rounded-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    </div>
                     
                                         
                 </div>                
                    
                </div>
            </div>
        </Homelayout>
    )
}

export default Aboutus;