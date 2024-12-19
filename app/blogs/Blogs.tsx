"use client";
import BlogCard from "@/app/ui/components/BlogCard";
import { useEffect, useState } from "react";
import BlogSkeletonCard from "./BlogCardSkeleton";

export interface blogsType {
  id: number;
  title: string;
  blogImage: string;
  description: string;
  date: string;
}

async function getBlogs(pageNo: number = 0): Promise<blogsType[]> {
  const response = await fetch(
    `http://localhost:3000/api/blogs?page=${pageNo}`,
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  );

  const data = await response.json();
  return data.data.map(
    (item: {
      blog_body: { description: string };
      id: string;
      blog_image: string;
      blog_title: string;
      updated_at: string;
    }) => ({
      id: item?.id || "N/A",
      title: item?.blog_title || "Untitled",
      blogImage: item?.blog_image || "unknown",
      description: item?.blog_body?.description || "No description",
      date: item?.updated_at || "No date",
    })
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<blogsType[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
    //   await new Promise(r=>setTimeout(r,40000))
      const fetchedBlogs = await getBlogs(pageNo);
      setBlogs(fetchedBlogs);
      setIsLoading(false);
    }

    fetchData();
  }, [pageNo]);

  return (
    <>
      <button
        className="border mx-3 px-3"
        onClick={() => {
          setPageNo(pageNo + 1);
          window.scrollTo({ top: 0 });
        }}
      >
        increment
      </button>
      <button
        className="border mx-3 px-3"
        onClick={() => {
          setPageNo(pageNo - 1);
          window.scrollTo({ top: 0 });
        }}
      >
        decrement
      </button>

      <div className="grid h-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
        {isLoading ? (
          <>
            <BlogSkeletonCard />
            <BlogSkeletonCard />
            <BlogSkeletonCard />
          </>
        ) : (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
    </>
  );
}
