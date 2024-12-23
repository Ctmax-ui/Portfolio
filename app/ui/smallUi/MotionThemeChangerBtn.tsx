'use client'
import { motion } from "framer-motion";
import { BsFillSunFill } from "react-icons/bs";
import { MdModeNight } from "react-icons/md";
import { useTheme } from "@/app/hooks/ThemeProvider";

const MotionThemeChangerBtn = ({classList}:{classList?:string}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      className={`bg-emerald-500 rounded-full px-3 py-3 w-fit ${classList}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme == "dark" ? (
          <BsFillSunFill className="h-5 w-5 text-white" />
        ) : (
          <MdModeNight className="h-5 w-5 text-zinc-900" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default MotionThemeChangerBtn;
