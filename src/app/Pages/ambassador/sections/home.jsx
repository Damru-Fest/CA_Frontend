 export default function Home(){
    return(
        <>
        <div className="absolute inset-0 h-screen md:h-screen" style={{
            width:"100vw",
            backgroundImage:"url('/images/bg.png')",
            backgroundColor:"black",
            backgroundSize:"cover",
            backgroundPosition:"center"
         }}>
     
        </div>
        <div className="absolute inset-0 pointer-events-none z-10 top-0 md:top-0">
                <img 
                    src="/images/Decor.png" 
                    alt="Decorative background"
                    className="absolute inset-0"
                    style={{
                        width:'100%'
                    }}
                />
            </div>

            {/* Header */}


            {/* Main Content */}
            <main className="relative z-20 -top-6 md:-top-30 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] px-4 md:px-8 pointer-events-auto">
                {/* Central Graphic */}
                <div className="relative mb-4">
                    {/* Person with megaphone illustration */}
                    <div className="relative flex justify-center items-center">
                        {/* Person Standing Image */}
                        <div className="relative z-10 w-40 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80 overflow-hidden">
                            <img 
                                src="/images/personStanding.png" 
                                alt="Person raising hand with megaphone"
                                className="w-full h-full object-cover object-top"
                            
                            />
                        </div>

                        {/* Background shapes */}
                        <img 
                            src="/images/Ellipse 1.png" 
                            alt="Orange ellipse"
                            className="absolute -z-10 object-contain opacity-90 top-45 right-3 "
                        />
                        <img 
                            src="/images/PurpleBlob.png" 
                            alt="Purple blob"
                            className="absolute -z-10 object-contain top-25 left-11"
                        />
                        <img 
                            src="/images/RedBlob.png" 
                            alt="Red blob"
                            className="absolute -z-10 object-contain top-51 -left-9"
                        />
                        <img 
                            src="/images/BrownBlob.png" 
                            alt="Brown blob"
                            className="absolute -z-10 object-contain top-48 left-33"
                        />
                        
                    </div>
                </div>

                {/* Main Title */}
                <div className="text-center -mt-2 md:-mt-4 px-2">
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight md:leading-[1.15] lg:leading-[1.1] tracking-tight">
                        <div className="text-2xl md:text-3xl mt-2" style={{fontFamily:"Pujarelah"}}>Become a</div>
                        <div className="text-5xl sm:text-6xl md:text-6xl lg:text-[6rem]" style={{fontFamily:"Montserrat"}}>CAMPUS</div>
                        <div className="text-5xl sm:text-6xl md:text-6xl lg:text-[6rem]" style={{fontFamily:"Montserrat"}}>AMBASSADOR</div>
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2" style={{fontFamily:"Pujarelah"}}>For Damru'25</div>
                    </h1>
                </div>

                {/* Description */}
                <p className="text-white text-base sm:text-lg md:text-xl text-center mb-8 md:mb-6 max-w-sm sm:max-w-xl md:max-w-3xl" style={{fontFamily:"Pujarelah"}}>
                    Represent your campus and unlock exclusive benefits like certificates, pronite tickets and more.
                </p>

                {/* Apply Now Button */}
                <button className="mx-6 md:mx-10" style={{cursor:"pointer"}}>
                    <img src="/images/NavApplyNow.png" alt="" />
                </button>
            </main>

            {/* Subtle background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-pulse delay-2000"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full opacity-60 animate-pulse delay-3000"></div>
        </div>
    </>
    )
 }
 {/* Background Image */}
