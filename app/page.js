"use client"

import React, { useState ,useRef, useEffect } from 'react';
import './index.css'; // Import custom CSS file
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScramble } from "use-scramble";

const Index = () => {
  const [index, setIndex] = useState(0);
  const box = useRef();
  const [animation, setAnimation] = useState(null); // State to store animation instance
  const { contextSafe } = useGSAP();
  const onEnter = contextSafe(() => {
    if (animation) {
      animation.play();
    }
    console.log(animation);
  });

  const onLeave = contextSafe(() => {
    if (animation) {
      animation.pause();
    }
  });

  
  
  useEffect(() => {
    const anim = gsap.to(box.current, { 
      duration: 3, 
      x: 0, 
      repeat: -1,
      rotation: 405, 
      ease: "none", 
      paused: true 
    });
    setAnimation(anim); 
    return () => {
      if (animation) {
         animation.pause();
      }
    };
  }, []); 

const landingText = [
  "Hello",    
  "こんにちは",       // English
  "Hallo",          // Dutch
  "你好",            // Chinese
  "Hola",    
   "Bonjour",       // Spanish
  "안녕하세요",    // Korean
  "Привет",        // Russian
];


//========================


 const { ref, replay } = useScramble({
    text: landingText[index],
     range: [65,125],
            speed: 0.2,
            tick: 1,
            step: 1,
            scramble: 2,
            seed: 0,
            chance: 1,
            overdrive: false,
            overflow: false,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % landingText.length);
    }, 1800); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    replay(landingText[index]);
  }, [index]);


  return (
    

    <div >
      <div className="box-container h-screen w-screen flex items-center justify-center  absolute  ">
            <div  
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              ref={box} 
              className="box-content test rotate-45 h-32 w-32 bg-white text-center text-black flex items-center justify-center">
              <p className="-rotate-45 font-extrabold text-3xl">Choose</p> 
            </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="border-gradient border-center  col-span-2 h-[50vh] gap-y-9 flex flex-col items-center justify-center">

          <h1 ref={ref}  className='text-center text-7xl landing-text tracking-widest'>X#$@*I!KT</h1>
          <p className='text-center text-3xl '>Let's get to know me</p>
          
        </div>
        <div className=" border-gradient border-right h-[50vh] flex items-center justify-center text-3xl">Creativity Side</div>
        <div className=" border-gradient border-left h-[50vh] flex items-center justify-center text-3xl">Professional Side</div>
      </div>
   

    </div>
/*   <div className='h-screen flex items-center justify-center'>
      <div className="box-container ">
        <div  
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          ref={box} 
          className="box-content test rotate-45 h-32 w-32 border-4 bg-white text-center text-black flex items-center justify-center">
          <p className="-rotate-45">Choose</p> 
        </div>
      </div>
    </div>*/
  );
};

export default Index;