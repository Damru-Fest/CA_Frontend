
// "use client";
// import React from 'react';
// import ActionButton from '@/components/actionbutton'; 

// const CampusAmbassador = () => {
//   const bgImageUrl = '/ambassdorAssets/cabghome.png';
//   const decorativeOverlayUrl = '/ambassdorAssets/decorative.png';
//   const announcerImageUrl = '/ambassdorAssets/caAnnouncement.png';
//   const colorfulSplashUrl = '/ambassdorAssets/caAnnouncement2.png';

//   return (
//     <>
//       <div
//         className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white overflow-hidden p-4"
//         style={{
//           backgroundImage: `url(${bgImageUrl})`,
//          }}
//       >
 
//         <div
//           className="absolute inset-0 w-full h-full bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${decorativeOverlayUrl})`,
//             opacity: 0.5,  
//           }}
//         ></div>
//         <div className="absolute inset-0 bg-black opacity-80 z-10"></div>

//          <main className="relative z-20 flex flex-col items-center text-center space-y-2 md:space-y-4">
          
//          <div className="relative w-96 h-60 overflow-hidden ">
    
//     <img
//         src={colorfulSplashUrl}
//         alt="Colorful splash background"
//         className="absolute w-full h-full object-cover scale-100"
//     />

   
//     <img
//         src={announcerImageUrl}
//         alt="Campus Ambassador Announcement"
//         className="absolute top-1/2 left-1/2 h-full w-full scale-230  -translate-x-1/2 object-contain"
//     />
// </div>

//           <p className="text-lg md:text-xl leading-none font-semibold">
//             Become a
//           </p>

//           <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none">
//             Campus<br />Ambassador
//           </h1>

//           <p className="text-xl md:text-2xl font-bold leading-none">
//             For Damru'25
//           </p>

//           <p className=" text-sm md:text-base text-gray-200 leading-none px-4">
//             Represent your campus and unlock exclusive benefits like certificates, pronite tickets and more
//           </p>

//           <ActionButton />
//         </main>
//       </div>
//     </>
//   );
// };

// export default CampusAmbassador;

// "use client";
// import React from 'react';
// import ActionButton from '@/components/actionbutton'; 

// const CampusAmbassador = () => {
//   const bgImageUrl = '/ambassdorAssets/cabghome.png';
//   const decorativeOverlayUrl = '/ambassdorAssets/decorative.png';
//   const announcerImageUrl = '/ambassdorAssets/caAnnouncement.png';
//   const colorfulSplashUrl = '/ambassdorAssets/caAnnouncement2.png';

//   return (
//     <>
//       <div
//         className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white  p-4"
//         style={{
//           backgroundImage: `url(${bgImageUrl})`,
//         }}
//       >
 
//          <img
//           src={decorativeOverlayUrl}
//           alt="Decorative element"
//           className="absolute -top-40 -rotate-2  left-0 w-full h-auto "  
//           style={{ opacity: 0.6 }}
//         />

//          <div className="absolute inset-0 bg-black opacity-80 z-20"></div>

//          <main className="relative z-30 flex flex-col items-center text-center space-y-2 md:space-y-4">
          
//           <div className="relative w-96 h-60 overflow-hidden">
//             <img
//               src={colorfulSplashUrl}
//               alt="Colorful splash background"
//               className="absolute w-full h-full object-cover scale-100"
//             />
//             <img
//               src={announcerImageUrl}
//               alt="Campus Ambassador Announcement"
//               className="absolute top-1/2 left-1/2 h-full w-full scale-230 -translate-x-1/2 object-contain"
//             />
//           </div>

//           <p className="text-lg md:text-xl leading-none font-semibold">
//             Become a
//           </p>

//           <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none">
//             Campus<br />Ambassador
//           </h1>

//           <p className="text-xl md:text-2xl font-bold leading-none">
//             For Damru'25
//           </p>

//           <p className="text-sm md:text-base text-gray-200 leading-none px-4">
//             Represent your campus and unlock exclusive benefits like certificates, pronite tickets and more
//           </p>

//           <ActionButton />
//         </main>
//       </div>
//     </>
//   );
// };

// export default CampusAmbassador;

"use client";
import React from 'react';
import { motion } from 'framer-motion';
import ActionButton from '@/components/ActionButton';

const CampusAmbassador = () => {
  const bgImageUrl = '/ambassdorAssets/cabghome.png';
  const decorativeOverlayUrl = '/ambassdorAssets/decorative.png';
  const announcerImageUrl = '/ambassdorAssets/caAnnouncement.png';
  const colorfulSplashUrl = '/ambassdorAssets/caAnnouncement2.png';

  // Framer Motion variants for text elements with stagger
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white p-4"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      >
        <motion.img
          src={decorativeOverlayUrl}
          alt="Decorative element"
          className="absolute -top-40 -rotate-2 left-0 w-full h-auto"
          style={{ opacity: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-black opacity-80 z-20"></div>

        <main className="relative z-30 flex flex-col items-center text-center space-y-2 md:space-y-4">
          <div className="relative w-96 h-60 overflow-hidden">
            <img
              src={colorfulSplashUrl}
              alt="Colorful splash background"
              className="absolute w-full h-full object-cover scale-100"
            />
            <motion.img
              src={announcerImageUrl}
              alt="Campus Ambassador Announcement"
              className="absolute top-1/2 left-1/2 h-full w-full scale-[2.3] -translate-x-1/2 object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          <motion.p
            className="text-lg md:text-xl leading-none font-semibold"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Become a
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Campus<br />Ambassador
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-bold leading-none"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            For Damru'25
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-gray-200 leading-none px-4"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Represent your campus and unlock exclusive benefits like certificates, pronite tickets and more
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
          >
            <ActionButton />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default CampusAmbassador;
