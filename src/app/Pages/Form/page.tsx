"use client"
import CaNav from "@/app/components/caNav"
import Home from "./sections/Home"
import Formpage from "./sections/Formpage"
export default function Form() {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            <CaNav/>
            <div className="flex flex-row justify-center gap-10 text-white">
                
                    <Home></Home>
                
                

                <Formpage></Formpage>
            </div>

        </div>
    )
}