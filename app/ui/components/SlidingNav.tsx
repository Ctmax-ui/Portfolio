"use client";
import { useState, useEffect } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import MotionThemeChangerBtn from "../smallUi/MotionThemeChangerBtn";

export default function SlidingNav({
  navItems,
  currentVsLineElem,
}: {
  navItems: {
    icon?: React.ReactNode;
    href?: string;
    label?: string;
    parser?: string;
  }[];
  currentVsLineElem: string | null | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
    <div className="fixed top-1 left-2 lg:hidden">
      <MotionThemeChangerBtn />
    </div>
      <nav className="block lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="h-[40px] w-[40px] fixed top-2 right-2 flex justify-center items-center border glass-gradient rounded-sm z-40"
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <TiThMenuOutline className="w-6 h-6" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100,duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[50%] bg-white dark:bg-gray-900 shadow-xl z-50"
            >
              
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Close menu"
              >
                <IoClose className="w-6 h-6" />
              </button>

              <nav className="p-8 pt-20">
                <ul className="space-y-4">
                  {navItems.map((v, i) => {
                    return (
                      <>
                        <li key={i}>
                          <Link
                            href={v.href || "#"}
                            className={`block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b  ${
                              currentVsLineElem ==
                              (v.parser || v?.href?.replace("/#", ""))
                                ? "border-slate-500 dark:border-slate-200"
                                : "border-transparent"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {v.label}
                          </Link>
                          
                        </li>
                      </>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
