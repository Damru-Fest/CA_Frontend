export default function CaFooter(){
    return(
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
    )
}
