// "use client"
// import Link from "next/link"
// import courseData from "../data/music_courses.json"
// import { BackgroundGradient } from "./ui/background-gradient"

// interface Course{
//         id: number,
//         title: string,
//         slug:string,
//         description:string,
//         price: number,
//         instructor: string,
//         isFeatured: Boolean,
//         // image: string, 
// }

// function FeaturedCourses() {
//     const featuredCourses=courseData.courses.filter((course:Course)=> course.isFeatured)


//   return (
//     <div className="py-12 bg-gray-900">
//       <div>
//         <div className="text-center">
//             <h2 className="text-base text-teal-600 font-semibold tracking-wide">FEATURED COURSES</h2>
//             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Learn With the Best</p>
//         </div>
//       </div>
//       <div className="mt-10 mx-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
//         {featuredCourses.map((course:Course)=>(
//             <div key={course.id} className="flex justify-center mt-2">
//                   <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
//                    <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                   
//                     <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{course.title}</p>
//                     <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{course.description}</p>
//                     <Link href={`/courses/${course.slug}`}  className=" mt-2 px-4 py-2 rounded border norder-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
//                     Learn More
//                     </Link>
//                    </div>
//                   </BackgroundGradient>
//             </div>
//         ))}
//         </div>
//       </div>
//       <div className="mt-20 text-center">
//         <Link href={'/courses'} className="px-4 py-2 rounded border norder-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
//         View All Courses
//         </Link>
        
//       </div>
//     </div>
//   )
// }

// export default FeaturedCourses



"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import courseData from "../data/music_courses.json"

interface Course{
          id: number,
          title: string,
          slug:string,
          description:string,
          price: number,
          instructor: string,
          isFeatured: Boolean,
          // image: string, 
  }


 function ExpandableCardDemo() {
  const featuredCourses=courseData.courses.filter((course:Course)=> course.isFeatured)
  const [active, setActive] = useState<(typeof featuredCourses)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  

  return (
    
    <>
    
      <div className="mt-4 mb-4 ">
         <div className="text-center items-center">
             <h2 className="text-xl text-teal-600 font-semibold tracking-wide">FEATURED COURSES</h2>
             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Learn With the Best <span className="text-blue-500">Courses</span> </p>
         </div>
      </div>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.image}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {/* {active.description} */}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={"/courses/Enroll"}
                    // target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {`Enroll`}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.description === "function"
                      ? active.description
                      : active.description}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4 mb-5">
        {featuredCourses.map((course) => (
          <motion.div
            layoutId={`card-${course.title}-${id}`}
            key={course.id}
            onClick={() => setActive(course)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${course.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={course.image}
                  alt={course.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${course.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {course.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${course.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {/* {course.description} */}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
      
      <div className="mt-6 mb-8 text-center">
        <Link href={'/courses'} className="px-4 py-2 rounded border norder-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
        View All Courses
        </Link>
        
      </div>
    
    </>
  
  );
}

export default ExpandableCardDemo;

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// const cards = [
//   {
//     description: "Lana Del Rey",
//     title: "Summertime Sadness",
//     src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
//     ctaText: "Visit",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Lana Del Rey, an iconic American singer-songwriter, is celebrated for
//           her melancholic and cinematic music style. Born Elizabeth Woolridge
//           Grant in New York City, she has captivated audiences worldwide with
//           her haunting voice and introspective lyrics. <br /> <br /> Her songs
//           often explore themes of tragic romance, glamour, and melancholia,
//           drawing inspiration from both contemporary and vintage pop culture.
//           With a career that has seen numerous critically acclaimed albums, Lana
//           Del Rey has established herself as a unique and influential figure in
//           the music industry, earning a dedicated fan base and numerous
//           accolades.
//         </p>
//       );
//     },
//   },
//   {
//     description: "Babbu Maan",
//     title: "Mitran Di Chhatri",
//     src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
//     ctaText: "Visit",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Babu Maan, a legendary Punjabi singer, is renowned for his soulful
//           voice and profound lyrics that resonate deeply with his audience. Born
//           in the village of Khant Maanpur in Punjab, India, he has become a
//           cultural icon in the Punjabi music industry. <br /> <br /> His songs
//           often reflect the struggles and triumphs of everyday life, capturing
//           the essence of Punjabi culture and traditions. With a career spanning
//           over two decades, Babu Maan has released numerous hit albums and
//           singles that have garnered him a massive fan following both in India
//           and abroad.
//         </p>
//       );
//     },
//   },

//   {
//     description: "Metallica",
//     title: "For Whom The Bell Tolls",
//     src: "https://assets.aceternity.com/demos/metallica.jpeg",
//     ctaText: "Visit",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Metallica, an iconic American heavy metal band, is renowned for their
//           powerful sound and intense performances that resonate deeply with
//           their audience. Formed in Los Angeles, California, they have become a
//           cultural icon in the heavy metal music industry. <br /> <br /> Their
//           songs often reflect themes of aggression, social issues, and personal
//           struggles, capturing the essence of the heavy metal genre. With a
//           career spanning over four decades, Metallica has released numerous hit
//           albums and singles that have garnered them a massive fan following
//           both in the United States and abroad.
//         </p>
//       );
//     },
//   },
//   {
//     description: "Lord Himesh",
//     title: "Aap Ka Suroor",
//     src: "https://assets.aceternity.com/demos/aap-ka-suroor.jpeg",
//     ctaText: "Visit",
//     ctaLink: "https://ui.aceternity.com/templates",
//     content: () => {
//       return (
//         <p>
//           Himesh Reshammiya, a renowned Indian music composer, singer, and
//           actor, is celebrated for his distinctive voice and innovative
//           compositions. Born in Mumbai, India, he has become a prominent figure
//           in the Bollywood music industry. <br /> <br /> His songs often feature
//           a blend of contemporary and traditional Indian music, capturing the
//           essence of modern Bollywood soundtracks. With a career spanning over
//           two decades, Himesh Reshammiya has released numerous hit albums and
//           singles that have garnered him a massive fan following both in India
//           and abroad.
//         </p>
//       );
//     },
//   },
// ];



