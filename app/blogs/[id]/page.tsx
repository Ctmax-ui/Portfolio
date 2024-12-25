import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import MotionThemeChangerBtn from "@/app/ui/smallUi/MotionThemeChangerBtn";
import BreadcrumbBlogNav from "./BreadcrumbBlogNav";
import BlogArticle from "./BlogArticle";
import { BlogSkeleton } from "./BlogSkeleton";
import { Suspense } from "react";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const blogId = await params.id;
  return (
    <>
      <header className="flex items-center justify-between bg-black dark:bg-white p-4 shadow-lg relative">
        <button className="text-sm font-medium transition-colors border hover:bg-white hover:text-black text-white dark:text-black dark:hover:text-white dark:hover:bg-black rounded-full md:rounded-sm py-1 md:p-0">
          <Link
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-nowrap flex-nowrap"
            href="/blogs"
          >
            <FaAngleLeft className="h-4 w-4" />
            <span className="hidden md:block">Go Back</span>
          </Link>
        </button>
        <h1 className="text-white text-lg md:text-2xl font-bold dark:text-black flex justify-center items-center"></h1>

        <div className="md:w-[100px] flex justify-end items-center">
          <MotionThemeChangerBtn className="border p-2 rounded-full bg-white dark:bg-black" />
        </div>
      </header>

      <BreadcrumbBlogNav blogId={blogId} />

      <Suspense fallback={<BlogSkeleton />}>
        <BlogArticle blogId={blogId} />
      </Suspense>
    </>
  );
};

export default page;
