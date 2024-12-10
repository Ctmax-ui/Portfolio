"use client";
import Link from "next/link";
import { TiThMenuOutline } from "react-icons/ti";
import { FaHome } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineWork } from "react-icons/md";
// import { FaGraduationCap } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { MdModeNight } from "react-icons/md";
import { useEffect, useState } from "react";

const navItems: {
  icon: React.ReactNode;
  href: string;
  label: string;
  parser?:string;
}[] = [
  {
    icon: <FaHome className="h-5 w-5" />,
    href: "/#",
    label: "Home",
    parser: 'home'
  },
  {
    icon: <IoMdPerson className="h-5 w-5" />,
    href: "/#about",
    label: "About",
  },
  {
    icon: <MdOutlineWork className="h-5 w-5" />,
    href: "/#skills",
    label: "Skills",
  },
  // {
  //   icon: <FaGraduationCap className="h-5 w-5" />,
  //   href: "#education",
  //   label: "Education",
  // },
  {
    icon: <IoDocumentText className="h-5 w-5" />,
    href: "/#resume",
    label: "Resume",
    parser: "resume"
  },
  {
    icon: <FaListUl className="h-5 w-5" />,
    href: "/#projects",
    label: "Projects",
  },
  {
    icon: <FaBlog className="h-5 w-5" />,
    href: "/#blog",
    label: "Blog",
  },
  {
    icon: <MdOutlineEmail className="h-5 w-5" />,
    href: "/#contact",
    label: "Contact",
    parser: 'contact'
  },
];

const Navbar = () => {
  const [currentVsLineElem, setCurrentVsLineElem] = useState<string | null>();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            // console.log(ent.target);
            setCurrentVsLineElem(ent.target.getAttribute("id"));
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );
    sections.forEach((e) => observer.observe(e));
    return () => {
      sections.forEach((e) => observer.unobserve(e));
    };
  }, []);

  return (
    <>
      <nav className="border glass-gradient h-[570px] w-[60px] fixed right-5 top-[8%] hidden lg:block rounded-full">
        <div className="my-4 mx-auto flex justify-center items-center">
          <button className="bg-emerald-500 rounded-full px-3 py-3 w-fit transition-transform hover:scale-110">
            <BsFillSunFill className="h-5 w-5 text-white hidden" />
            <MdModeNight className="h-5 w-5 text-zinc-900  " />
          </button>
        </div>

        <div className="space-y-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`relative mx-auto w-fit flex items-center justify-center px-3 py-3 rounded-full transition-all duration-100 hover:bg-zinc-800 hover:text-white group ${
                currentVsLineElem == (item.parser||item.href.replace('/#', '') ) ? "bg-emerald-600 text-white" : ""
              }`}
            >
              <div className="relative">
                {item.icon}
                <div className="absolute right-7 top-1/2 -translate-y-1/2 mr-4 px-2 py-1 bg-zinc-800 text-zinc-200 text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <nav className="block lg:hidden">
        <button className="h-[40px] w-[40px] fixed top-5 right-5 flex justify-center items-center border glass-gradient rounded-sm ">
          <TiThMenuOutline />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
