"use client";
import { FaGlobe } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import BlogSectionSkeleton from "../skeleton/BlogSectionSkeleton";

export interface BlogPost {
  id: number;
  blog_title: string;
  blog_image: string;
  blog_body: { description: string };
  created_at: string;
  updated_at: string;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      const data = await fetch("/api/blogs", {
        method: "GET",
      });
      const response = await data.json();
      // console.log(response);
      setBlogs(response.data);
    }
    fetchData();
  }, []);

  return (
    <section className="px-5 py-5" id="blog">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-slate-200 bg-zinc-900/50 backdrop-blur-sm mb-4">
          <FaGlobe className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-zinc-200 dark:text-black">BLOG</span>
        </div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-500 ">
            <span className="text-black dark:text-white">Latest</span> Insights
          </h2>
          <Link
            href={"/blogs"}
            className="py-3 px-5 bg-emerald-500 font-bold text-white flex justify-between items-center gap-2"
          >
            More Blogs <FaArrowRightLong />
          </Link>
        </div>
        <div className="space-y-6">
          {blogs ? (
            blogs.slice(0, 3).map((post: BlogPost) => (
              <Link key={post.id} href={`/blogs/${post.id}`} className="group block">
                <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 dark:border-slate-300">
                  <div className="grid md:grid-cols-[100px,1fr] items-center gap-6 p-6">
                    <div className="relative aspect-[3/2] md:aspect-square overflow-hidden rounded-lg border dark:border-slate-300 hidden md:block">
                      <Image
                        src={`/api/imageproxy?url=${post.blog_image}`}
                        alt={post.blog_title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="text-sm text-slate-100 mb-2 absolute right-2 top-1">
                        {formatDate(post.updated_at)}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-500 transition-colors line-clamp-1">
                        {post.blog_title}
                      </h3>
                      <p className="text-slate-200 mb-4 line-clamp-1">
                        {post.blog_body.description}
                      </p>
                      <button className="text-white w-fit  h-auto font-semibold hover:text-emerald-400 hover:no-underline">
                        Read More...
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
            
          ) : (<>
            <BlogSectionSkeleton />
            <BlogSectionSkeleton />
            <BlogSectionSkeleton />
          </>)}
        </div>

        <div className="mt-8 mb-4 text-center">
          <Link
            href={"/blogs"}
            className=" text-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-2 outline border-2 border-emerald-500 hover:border-emerald-500 transition-all outline-none font-semibold "
          >
            More Posts
          </Link>
        </div>
      </div>
    </section>
  );
};
export default BlogSection;
