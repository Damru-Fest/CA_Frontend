export default function Registerbanner(){
    return(
        <>
            <div className='flex  flex-row justify-center items-center mt-30 p-40' style={{width:"100%",height:"20vh",backgroundImage:"url('/images/Rectangle.png')"}}>
                <img src="/images/Speaker.png" alt="" />
                <div className='flex-col flex'>
                    <h1 className='font-bold text-white text-3xl'>What are you waiting for?</h1>
                    <p className='text-white mt-5'>Apply for damru, represent your university <br />enjoy the fest!</p>
                    <button  className="mt-5"style={{cursor:"pointer"}}>
                        <img src="/images/NavApplyNow.png" alt="" />
                    </button>

                </div>
            


            </div>
        </>
    )
}