import Homelayout from "../Layout/Homelayout";
import aboutMainImage from "../assets/aboutMainImage.png"

function Aboutus(){

    return(
        <Homelayout>
            <div className="pl-20 pt-20 text-white borderflex flex-col">
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

                <div className="border border-white my-5"></div>
            </div>
        </Homelayout>
    )
}

export default Aboutus;