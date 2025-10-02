import { motion } from "motion/react"
import { useCallback } from "react"

const CaNav = () => {

    // Function to play click sound
    

    return (
        <header className="relative z-40 flex justify-between items-center px-4 md:px-8 pt-6 md:pt-20 -top-2 md:-top-10 pointer-events-auto">
            {/* Logo */}
            <div className="text-white text-3xl font-bold">
                <span className="relative -right-10">
                    <img src="/images/Logo.png" alt="" />
                </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8 items-end text-white ml-auto">
                <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#about"
                    className="hover:text-orange-400 transition-colors"
                   
                    whileTap={{scale:0.9}}
                >
                    About
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#rules"
                    className="hover:text-orange-400 transition-colors"
            
                    whileTap={{scale:0.9}}
                >
                    Roles and Responsibilities
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#benefits"
                    className="hover:text-orange-400 transition-colors"
                    
                    whileTap={{scale:0.9}}
                >
                    Benefits
                </motion.a>
            </nav>

            {/* Apply Now Button */}
            <motion.button
                className="border-2 mx-10 rounded-lg font-semibold"
                style={{ cursor: "pointer" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
               
            >
                <img src="/images/NavApplyNow.png" alt="" />
            </motion.button>
        </header>
    )
}

export default CaNav
