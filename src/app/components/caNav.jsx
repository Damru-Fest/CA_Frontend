import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

const CaNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="relative z-40 flex justify-between items-center px-4 md:px-8 pt-6 md:pt-20 -top-2 md:-top-10 pointer-events-auto">
            {/* Logo */}
            <div className="text-white text-3xl font-bold">
                <span className="relative -right-10">
                    <img src="/images/Logo.png" alt="" />
                </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 items-end text-white ml-auto">
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

                <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#benefits"
                    className="hover:text-orange-400 transition-colors"
                    whileTap={{scale:0.9}}
                >
                    Why Join?
                </motion.a>
            </nav>

            {/* Desktop Apply Now Button */}
            <motion.button
                className="hidden lg:block mx-10 font-semibold"
                style={{ cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <img src="/images/NavApplyNow.png" alt="" className="h-12 w-auto" />
            </motion.button>

            {/* Burger Menu Button */}
            <motion.button
                className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
            >
                <motion.span
                    className="block w-6 h-0.5 bg-white transition-all duration-300"
                    animate={{
                        rotate: isMenuOpen ? 45 : 0,
                        y: isMenuOpen ? 8 : 0
                    }}
                />
                <motion.span
                    className="block w-6 h-0.5 bg-white transition-all duration-300"
                    animate={{
                        opacity: isMenuOpen ? 0 : 1
                    }}
                />
                <motion.span
                    className="block w-6 h-0.5 bg-white transition-all duration-300"
                    animate={{
                        rotate: isMenuOpen ? -45 : 0,
                        y: isMenuOpen ? -8 : 0
                    }}
                />
            </motion.button>

            {/* Mobile/Tablet Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                    >
                        <motion.div
                            className="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <div className="flex justify-end p-6">
                                <motion.button
                                    onClick={closeMenu}
                                    className="text-white text-2xl"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ×
                                </motion.button>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="flex flex-col space-y-6 px-6 pt-8">
                                <motion.a
                                    href="#about"
                                    className="text-white text-xl hover:text-orange-400 transition-colors py-2"
                                    onClick={closeMenu}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    About
                                </motion.a>
                                <motion.a
                                    href="#rules"
                                    className="text-white text-xl hover:text-orange-400 transition-colors py-2"
                                    onClick={closeMenu}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Roles and Responsibilities
                                </motion.a>
                                <motion.a
                                    href="#benefits"
                                    className="text-white text-xl hover:text-orange-400 transition-colors py-2"
                                    onClick={closeMenu}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Benefits
                                </motion.a>
                            </nav>

                            {/* Mobile Apply Now Button */}
                            <div className="absolute bottom-8 left-6 right-6">
                                <motion.button
                                    className="w-full font-semibold"
                                    style={{ cursor: "pointer" }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={closeMenu}
                                >
                                    <img src="/images/NavApplyNow.png" alt="" className="w-full h-16 object-contain" />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default CaNav
