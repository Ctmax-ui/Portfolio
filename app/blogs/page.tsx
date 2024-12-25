import { Suspense } from "react";
import BlogSkeletonCard from "./BlogCardSkeleton";
import Blogs from "./Blogs";
import Link from "next/link";
import MotionThemeChangerBtn from "../ui/smallUi/MotionThemeChangerBtn";
import { TiHome } from "react-icons/ti";

export default function Page() {
  return (
    <>
      <div className="min-h-screen font-sans ">
        <header className="flex items-center justify-between bg-black dark:bg-white p-4 shadow-lg relative">
          <button className="text-sm font-medium transition-colors border hover:bg-white hover:text-black text-white dark:text-black dark:hover:text-white dark:hover:bg-black rounded-full md:rounded-sm py-1 md:p-0">
            <Link
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-nowrap flex-nowrap"
              href="/"
            >
              <TiHome className="h-4 w-4" />
              <span className="hidden md:block">Go Home</span>
            </Link>
          </button>
          <h1 className="text-white text-lg md:text-2xl font-bold dark:text-black flex justify-center items-center">
            Latest Blogs
          </h1>

          <div className="md:w-[100px] flex justify-end items-center">
            <MotionThemeChangerBtn className="border p-2 rounded-full bg-white dark:bg-black" />
          </div>
        </header>
        <div className="py-5 px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="grid h-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
                <BlogSkeletonCard />
                <BlogSkeletonCard />
                <BlogSkeletonCard />
              </div>
            }
          >
            <Blogs />
          </Suspense>
        </div>
      </div>
    </>
  );
}
