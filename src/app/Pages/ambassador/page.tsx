'use client';

import { Hedvig_Letters_Sans } from 'next/font/google';
import { useState } from 'react';
import CaFooter from '../../components/caFooter.jsx'
import CaNav from '../../components/caNav.jsx'
import Home from './sections/home.jsx'
import Benefits from './sections/benefits.jsx'
import About from './sections/about.jsx'
import Rules from './sections/rules.jsx'
import Register from './sections/registerbanner.jsx'

export default function AmbassadorPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
           <CaNav/>
           
           <Home/>
           <About/>
           <Rules/>
           <Benefits/>
           <Register/>
           <CaFooter/>
           


           
            


            
           
        </div>
        
    );
}
