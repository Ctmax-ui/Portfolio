"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });


  useEffect(() => {
    if (inView) {
      controls.start({
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      });
    } else {
      controls.start({
        scale: 0.8,
        opacity: 0,
        y: 50,
        transition: {
          duration: 0.6,
          ease: "easeIn",
        },
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={controls}
      style={{ scrollSnapAlign: "start" }}
    >
      {children}
    </motion.div>
  );
};

export default Section