import { Suspense } from "react";
import BlogSkeletonCard from "./BlogCardSkeleton";
import Blogs from "./Blogs";
import Link from "next/link";
import { LuArrowBigLeftDash } from "react-icons/lu";

export default function Page() {
  return (
    <>
      <div className="min-h-screen font-sans ">
        <header className="flex items-center justify-center bg-emerald-500 p-4 shadow-lg relative">
          <Link
            href={"/"}
            className="text-white text-lg hover:text-slate-300 transition duration-300 absolute left-10 border px-4 py-1 rounded-sm flex justify-center items-center gap-3"
          >
            <LuArrowBigLeftDash className="text-xl" /> Go Home
          </Link>
          <h1 className="text-white text-2xl font-bold ">Latest Blogs</h1>
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
