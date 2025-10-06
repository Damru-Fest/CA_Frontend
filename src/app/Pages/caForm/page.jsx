"use client";
import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import CaNavbar from "../../../components/caNav"

// A simple SVG component for the Google Icon
const GoogleIconSVG = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.649-3.657-11.303-8H6.306C9.663,35.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

const CaRegister = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!agreedToTerms) newErrors.terms = 'You must agree to the terms.';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Form Submitted Successfully:', { ...formData, agreedToTerms });
            alert('Registration successful! Check the console for data.');
        }
    };

    // --- Component JSX ---
    const bgImageUrl = '/ambassdorAssets/cabghome.png';
    const decorativeOverlayUrl = '/ambassdorAssets/decorative.png';
    const announcerImageUrl = '/ambassdorAssets/caAnnouncement.png';
    const colorfulSplashUrl = '/ambassdorAssets/caAnnouncement2.png';

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white p-4 md:p-8 overflow-hidden"
            style={{ backgroundImage: `url(${bgImageUrl})` }}
        >
            <CaNavbar/>
            <img src={decorativeOverlayUrl} alt="Decorative element" className="absolute -top-40 -rotate-2 left-0 w-full h-auto opacity-60" />
            <div className="absolute inset-0 bg-black opacity-80 z-20"></div>

            <main className="relative z-30 flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-8 lg:gap-16">
                {/* Left Side: Announcement */}
                <div className="flex flex-col items-center text-center lg:w-1/2">
                    <div className="relative w-72 h-48 md:w-96 md:h-60 overflow-hidden">
                        <img
                            src={colorfulSplashUrl}
                            alt="Colorful splash background"
                            className="absolute w-full h-full object-contain"
                        />
                        <img
                            src={announcerImageUrl}
                            alt="Campus Ambassador Announcement"
                            className="absolute top-1/2 left-1/2 max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 object-contain"
                        />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider mt-4">CAMPUS AMBASSADOR</h1>
                    <p className="text-xl md:text-2xl font-semibold text-gray-300 mt-2">For Damru'25</p>
                </div>

                {/* Right Side: Registration Form */}
                <div className="w-full max-w-md lg:w-1/3 bg-black/70 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'serif' }}>Register for CA</h2>
                    <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-[Montserrat] font-semibold rounded-full py-2.5 px-4 hover:bg-gray-200 transition">
                        <GoogleIconSVG className="h-6 w-6 font-[Montserrat] " /> Sign Up with Google
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-2 px-4">By clicking "Sign Up with Google", you agree to the <a href="#" className="underline">Terms of Service</a> and acknowledge <a href="#" className="underline">Privacy Policy</a>.</p>
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-600" /><span className="mx-4 text-sm text-gray-400">or</span><hr className="flex-grow border-gray-600" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                        {/* Full Name Input */}
                        <div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none font-[Montserrat] focus:ring-2 focus:ring-blue-500" />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                        </div>
                        {/* Email Input */}
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 font-[Montserrat] focus:ring-blue-500" />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                        </div>
                        {/* Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 font-[Montserrat] focus:ring-blue-500" />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none font-[Montserrat] focus:ring-2 focus:ring-blue-500" />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                        </div>
                        {/* Terms and Conditions */}
                        <div>
                            <div className="flex items-start space-x-3 pt-1">
                                <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 mt-0.5 rounded border-gray-500 bg-gray-700 text-blue-500 focus:ring-blue-600" />
                                <label htmlFor="terms" className="text-sm text-gray-400">I agree to the <a href="#" className="underline">Terms of Service</a> and acknowledge <a href="#" className="underline">Privacy Policy</a>.</label>
                            </div>
                            {errors.terms && <p className="text-red-500 text-xs mt-1 ml-1">{errors.terms}</p>}
                        </div>

                        <button type="submit" className="w-full bg-white text-black font-[Montserrat] font-bold rounded-full py-2.5 mt-4 hover:bg-gray-200 transition">Sign Up</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CaRegister;