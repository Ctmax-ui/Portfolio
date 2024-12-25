"use client";
import BlogCard from "@/app/ui/components/BlogCard";
import React, { useEffect, useState } from "react";
import BlogSkeletonCard from "./BlogCardSkeleton";
import {useRouter, useSearchParams } from "next/navigation";
import PagiginationNav from "./PagiginationNav";

export interface blogsType {
  data: {
    id: number;
    blog_title: string;
    blog_image: string;
    blog_body: { description: string };
    created_at: string;
    updated_at: string;
  }[];
  currentPage: number;
  totalPages: number;
  message: string;
}

async function getBlogs(
  pageNo: number = 1,
  inputQuery?: string
): Promise<blogsType> {
  const response = await fetch(
    `${window.location.origin || 'http://localhost:3000'}/api/blogs?page=${pageNo}&query=${inputQuery}`,
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();
  return data;
}

export default function Blogs() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const paramQuery = params.get("query");
  const paramPage = params.get("page");

  const [blogs, setBlogs] = useState<blogsType>();
  const [pageNo, setPageNo] = useState(Number(paramPage) || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [fetchQuery, setFetchQuery] = useState<string>(paramQuery || "");
  const router = useRouter();


  useEffect(() => {
    const paramQuery = params.get("query");
    if (paramQuery) {
      setInputQuery(paramQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      //   await new Promise(r=>setTimeout(r,40000))
      const fetchedBlogs = await getBlogs(pageNo, fetchQuery);
      // console.log(fetchedBlogs);
      setBlogs(fetchedBlogs);
      setCurrentPage(fetchedBlogs.currentPage);
      setTotalPages(fetchedBlogs.totalPages);
      setIsLoading(false);
    }

    fetchData();
  }, [pageNo, fetchQuery]);

  const queryFetcherHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryParams("query", inputQuery);
    setFetchQuery(inputQuery);
  };

  const handlePageChange = (props: number) => {
    setQueryParams("page", props.toString());
    setCurrentPage(props);
    setPageNo(props);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10 ">
        <form
          onSubmit={queryFetcherHandler}
          className="hover:bg-gray-200 dark:hover:bg-slate-900 rounded-md"
        >
          <input
            onChange={(e) => setInputQuery(e.target.value)}
            value={inputQuery}
            name="queryInput"
            id="qInput"
            type="text"
            placeholder="Search Blogs...."
            className="border outline-none rounded-md rounded-e-none border-slate-300 focus:border-slate-500 dark:focus:border-slate-200 bg-transparent  px-3 py-2 "
          />
          <button
            type="submit"
            className="border border-l-0 focus:border-l rounded-md rounded-s-none border-slate-300  focus:border-slate-500 px-3 py-2 hover:bg-gray-200 dark:hover:text-black"
          >
            Search
          </button>
        </form>

        <PagiginationNav currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} blogs={blogs} />

      </div>
      <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
        {isLoading ? (
          <>
            <BlogSkeletonCard />
            <BlogSkeletonCard />
            <BlogSkeletonCard />
          </>
        ) : (
          blogs &&
          blogs?.data?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>

      <PagiginationNav currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} blogs={blogs} />
    </>
  );
}
