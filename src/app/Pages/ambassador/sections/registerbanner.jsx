export default function Registerbanner(){
    return(
        <>
            <div className='flex flex-row justify-center items-center mt-30 md:p-40 register-banner-bg'>
                <img className="md:w-auto w-20" src="/images/Speaker.png" alt="" />
                <div className='flex-col flex'>
                    <h1 className='font-bold text-white md:text-3xl'>What are you waiting for?</h1>
                    <p className='text-white md:mt-5'>Apply for damru, represent your university <br />enjoy the fest!</p>
                    <button className="md:mt-5 mt-2 register-banner-button">
                        <img className="md:w-auto w-25" src="/images/NavApplyNow.png" alt="" />
                    </button>

                </div>
            


            </div>
        </>
    )
}