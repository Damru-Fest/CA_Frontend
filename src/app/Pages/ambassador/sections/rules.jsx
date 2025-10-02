export default function Rules(){
    return(
        <div className='flex flex-row justify-center items-center' style={{backgroundImage:"url('/images/union.png')", width:"100%",height:"70vh"}}>
                    <div className='relative' style={{width:"100%"}}>
                        <img className='absolute left-0 -top-70' src="/images/Left-Patch-2.png" alt="" />
                        <img  className='absolute  left-0 -top-90' style={{marginRight:"auto"}} src="/images/RightPatch.png" alt="" />
                    
                        
                        <img className='absolute right-0 -top-80' src="/images/RightPatch-2.png" alt="" />
                        <img className='absolute right-0 -top-70' style={{marginLeft:"auto"}} src="/images/LeftPatch.png" alt="" />
                        
                    </div>
                    <img className='absolute' src="/images/Graphic_Elements.png" alt="" ></img>

                    <div className='absolute  self-start mt-30'>
                        <h1 className='text-white font-bold text-5xl align-top' style={{fontFamily:"Kamal", marginBottom:"auto"}}>Rules & Responsibilities</h1>

                    </div>                    

        </div>
    )
}