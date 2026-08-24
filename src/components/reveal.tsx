"use client";
import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";
export function Reveal({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}) { const reduced=useReducedMotion(); return <motion.div className={className} initial={reduced?false:{opacity:0,y:18}} whileInView={reduced?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.65,delay,ease:[.2,.8,.2,1]}}>{children}</motion.div>; }
