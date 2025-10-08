 
import ActionButton from '../../components/ActionButton';
import React from 'react';

const Banner = () => (
  <div className="flex items-center justify-center bg-[#181716] w-full h-60 px-8 py-42">
 
    <div className="hidden md:flex w-60 h-60 items-center justify-center mr-8">
      <img
        src="/ambassdorAssets/registerbanner.png"
        alt="Megaphone"
        className="object-contain w-60 h-60"
        style={{ filter: 'brightness(0) invert(1)' }}  
      />
    </div>
 
    <div className="flex flex-col items-start">
      <h2 className="text-white text-4xl font-bold mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
        What are you waiting for?
      </h2>
      <p className="text-white text-xl mb-5 leading-snug font-serif max-w-lg">
        Apply for damru, represent your university<br />
        enjoy the fest!
      </p>
     <ActionButton />
    </div>
  </div>
);

export default Banner;
