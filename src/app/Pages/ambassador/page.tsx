'use client';

import { Hedvig_Letters_Sans } from 'next/font/google';
import { useState } from 'react';

export default function AmbassadorPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image */}
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
            <header className="relative z-40 flex justify-between items-center px-4 md:px-8 pt-6 md:pt-20 -top-2 md:-top-10 pointer-events-auto">
                {/* Logo */}
                <div className="text-white text-3xl font-bold">

                    <span className="relative -right-10">
                        <img src="/images/Logo.png" alt="" />
                       
                    </span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-8 items-end text-white ml-auto">
                    <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
                    <a href="#role" className="hover:text-orange-400 transition-colors">Role & Responsibilities</a>
                    <a href="#benefits" className="hover:text-orange-400 transition-colors">Benefits</a>
                </nav>

                {/* Apply Now Button */}
                <button className="border-2 mx-10 rounded-lgfont-semibold" style={{cursor:"pointer"}}>
                    <img src="/images/NavApplyNow.png" alt="" />
                </button>
            </header>

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
            
            {/* About Section */}
            <section id="about" className="relative z-30 px-4 md:px-10 py-16 md:py-24">
                {/* Hands */}
                <img src="/images/lefthand.png" alt="Left hand" className="hidden md:block absolute left-0 -top-60 opacity-80 select-none pointer-events-none" />
                <img src="/images/Righthand.png" alt="Right hand" className="hidden md:block absolute right-0 bottom-[-40px] opacity-80 select-none pointer-events-none" />

                {/* Cards Row */}
                <div className="relative mx-auto  flex items-center justify-center gap-4 sm:gap-6 md:gap-10 ">
                    <img src="/images/PhotoCards.png" alt="Event cards" className="object-contain" />
                </div>

                {/* Description Panel */}
                <div className="relative mx-auto max-w-5xl">
                    <div className=" text-white px-6 md:px-10 py-8 md:py-10 leading-relaxed" style={{fontFamily:"Pujarelah"}}>
                        <p className="text-lg md:text-2xl text-center">
                            The Damru Fest is an annual two-day cultural carnival hosted by Rishihood <br /> University in Delhi NCR. The 2024 edition ran on 29th & 30th November featured live music, dance battles, <br />
                            art installations, workshops and more — designed to draw both campus and off-campus crowds.
                        </p>
                    </div>
                </div>
            </section>

         {/*Rules and Responsibilities*/} 
            <div className='flex flex-row justify-center items-center' style={{backgroundImage:"url('/images/union.png')", width:"100%",height:"70vh"}}>
                    <div className='relative' style={{width:"100%"}}>
                        <img className='absolute left-0 -top-70' src="/images/Left-Patch-2.png" alt="" />
                        <img  className='absolute  left-0 -top-90' style={{marginRight:"auto"}} src="/images/RightPatch.png" alt="" />
                    
                        
                        <img className='absolute right-0 -top-80' src="/images/RightPatch-2.png" alt="" />
                        <img className='absolute right-0 -top-70' style={{marginLeft:"auto"}} src="/images/LeftPatch.png" alt="" />
                        
                    </div>
                    <img className='absolute' src="/images/Graphic_Elements.png" alt="" ></img>

                    <div className='absolute  self-start mt-30'>
                        <h1 className='text-white font-bold text-5xl align-top' style={{fontFamily:"Kamal", marginBottom:"auto"}}>Rules & Responsibilities</h1>

                    </div>                    

            </div>

            <h1 className='text-center font-bold text-white text-4xl mt-5'>Benefits</h1>

        
        {/*What are you waiting for*/}
            <div className='flex  flex-row justify-center items-center mt-30 p-40' style={{width:"100%",height:"20vh",backgroundImage:"url('/images/Rectangle.png')"}}>
            <img src="/images/Speaker.png" alt="" />
            <div className='flex-col flex'>
                <h1 className='font-bold text-white text-3xl'>What are you waiting for?</h1>
                <p className='text-white mt-5'>Apply for damru, represent your university <br />enjoy the fest!</p>
                <button  className="mt-5"style={{cursor:"pointer"}}>
                    <img src="/images/NavApplyNow.png" alt="" />
                </button>

            </div>
         


            </div>


            
            <footer className="bg-black">
                <div className="flex flex-row justify-between items-end p-5 px-10 w-full">
    
                    {/* Logo left */}
                    <img src="/images/Logo.png" alt="Logo"/>
    
                    {/* Text & Links right */}
                    <div className="flex flex-col items-end">
                    <p className="text-white font-bold">
                        © Damru 2025. All rights reserved
                     </p>
                        <div className="flex flex-row">
                            <a href="#" className="text-white underline">Terms of Service</a>
                            <p className="text-white mx-2">|</p>
                            <a href="#" className="text-white underline">Privacy Policy</a>
                         </div>
                    </div>
    
                </div>
            </footer>
        </div>
        
    );
}
