const CaNav =()=>
    {
        return(
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
        )
    }
    export default CaNav
    