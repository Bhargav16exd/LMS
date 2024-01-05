import Homelayout from "../Layout/Homelayout";


// image imports
import aboutMainImage from "../assets/aboutMainImage.png"
import apj from "../assets/apj.png"
import bill from "../assets/billGates.png"
import sj from "../assets/steveJobs.png"
import einstein from "../assets/einstein.png"
import nelson from "../assets/nelsonMandela.png"
import Cor from "../components/Corosuol";

function Aboutus(){
    
    const data = [
        {    
            currSlide:"slide1",
            name:"Steve Jobs",
            quote:"Embrace the challenge, for within adversity lies the seed of your greatest growth",
            image:sj,
            prevSlide:"#slide4",
            nextSlide:"#slide2"

        },
        {    
            currSlide:"slide2",
            name:"Bill Gates",
            quote:"Every step forward, no matter how small, is a victory in the journey of self-improvement.",
            image:bill,
            prevSlide:"#slide1",
            nextSlide:"#slide3"
        },
        {   
            currSlide:"slide3",
            name:"Nelson Mandela",
            quote:"Believe in your potential; the power to transform your dreams into reality resides within you.",
            image:nelson,
            prevSlide:"#slide2",
            nextSlide:"#slide4"
        },
        {    
            currSlide:"slide4",
            name:"APJ Abdul Kalam",
            quote:"In the dance of life, let passion be your music and determination your graceful steps.",
            image:apj,
            prevSlide:"#slide3",
            nextSlide:"#slide5"
        },
        {   
            currSlide:"slide5",
            name:"Albert Einstein",
            quote:"Your potential is like a seed; nurture it with belief, water it with effort",
            image:einstein,
            prevSlide:"#slide4",
            nextSlide:"#slide1"
        },
    ]

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

                <div className="border border-gray-400 mr-10"></div>

                <div className=" my-5 flex justify-center py-10"> 

                 <div className="innerBox w-1/2 flex flex-col justify-center align-middle">
                     
                   <div className="carousel w-full">
                    {data.map((d)=> <Cor name={d.name} image={d.image} quote={d.quote} key={d.id} currSlide={d.currSlide}
                      nextSlide={d.nextSlide} prevSlide={d.prevSlide}
                      /> )}  
                    </div>
                     
                                         
                 </div>                
                    
                </div>
            </div>
        </Homelayout>
    )
}

export default Aboutus;