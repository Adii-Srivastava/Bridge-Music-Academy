import Link from 'next/link'
import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { Button } from "./ui/moving-border";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

function HeroSection() {
  return (
  <BackgroundBeamsWithCollision>
    <div className='h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0'>
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      {/* <Spotlight
        className="top-40 right-0 md:right-60 md:top-20"
        fill="white"
      /> */}
       <div className='p-4 relative z-10 w-full text-center'>
        
          <div className='flex items-center justify-center gap-3'>
           <h1
            className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            >Master the 
           </h1> 
           <h1 
           className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500"
           > Art of Music</h1>
          </div>
        <p className='mt-4  font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>Dive into our comprehensive music courses and transfirm your musical journye today. Whether you're a beginner or looking to refine your skills, join us to unlock your true potential.</p>
           <div className="mt-4">
             <Link href={'/courses'}>
             <Button borderRadius='1.75rem' className='bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800'>Explore Courses</Button>
             </Link>
            
           </div>
       </div>
    </div>
  </BackgroundBeamsWithCollision>
  )
}

export default HeroSection
