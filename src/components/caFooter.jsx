import React from 'react';

 const logoUrl = '/ambassdorAssets/logo.png'; 


const caFooter = () => {
  return (
    <footer className="bg-black text-white w-full">
      <div className="container mx-auto flex justify-between items-center px-8 py-6">
        
    
        <div>
          <img 
            src={logoUrl} 
            alt="Damru Logo" 
            className="h-12 w-auto"  
          />
        </div>

      
        <div className="text-right text-sm">
          <p className="mb-1">© Damru 2025. All rights reserved</p>
          <div>
            <a href="/terms" className="underline hover:text-gray-300 transition-colors">
              Terms of service
            </a>
            <span className="mx-2">|</span>
            <a href="/privacy" className="underline hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default caFooter;