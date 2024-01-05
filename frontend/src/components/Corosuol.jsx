function Cor({name,quote,image , prevSlide , nextSlide , currSlide}){

    return(
        <div id={currSlide} className="carousel-item relative w-full flex justify-center align-middle">
                        <div className="flex flex-col justify-center items-center ">
                        <img src={image} className="w-40 h-40 rounded-full " />
                        <h1 className="text-center py-5 text-2xl font-semibold">{name}</h1>
                        <p>{quote}</p>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={prevSlide} className="btn btn-circle">❮</a> 
                        <a href={nextSlide} className="btn btn-circle">❯</a>
                        </div>
                    </div> 
    )
}

export default Cor;