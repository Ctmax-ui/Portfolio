"use client";
import BlogCard from "@/app/ui/components/BlogCard";
import React, { useEffect, useState } from "react";
import BlogSkeletonCard from "./BlogCardSkeleton";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import {useRouter, useSearchParams } from "next/navigation";

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
      <div className="flex justify-between items-center mt-4 mb-10 ">
        <form
          onSubmit={queryFetcherHandler}
          className="hover:bg-gray-200 rounded-md"
        >
          <input
            onChange={(e) => setInputQuery(e.target.value)}
            value={inputQuery}
            name="queryInput"
            id="qInput"
            type="text"
            className="border outline-none rounded-md rounded-e-none border-slate-300 focus:border-slate-500 bg-transparent  px-3 py-2 "
          />
          <button
            type="submit"
            className="border border-l-0 focus:border-l rounded-md rounded-s-none border-slate-300  focus:border-slate-500 px-3 py-2 hover:bg-gray-200"
          >
            Search
          </button>
        </form>

        <nav className="flex items-center justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`border-slate-500 rounded-s-md text-slate-800  transition-all p-4 border border-r-0 ml-2 ${
              currentPage <= 1
                ? "cursor-not-allowed text-opacity-70 hover:bg-gray-100"
                : " hover:bg-slate-900 hover:text-white"
            }`}
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: blogs?.totalPages || 1 }, (_, i) => i + 1)
            .slice(
              currentPage < 5 ? 0 : currentPage - 5,
              currentPage < 5 ? 9 : currentPage + 4
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${
                  currentPage === page
                    ? "bg-gray-400 text-slate-900 transition-all"
                    : " hover:bg-gray-200 "
                }  border px-3 py-3 border-slate-500 border-r-0`}
              >
                {`${page}`.length < 2 ? 0 : ""}
                {page}
              </button>
            ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`border-slate-500 rounded-e-md text-slate-800  transition-all p-4 border ${
              currentPage >= totalPages
                ? "cursor-not-allowed text-opacity-70 hover:bg-gray-100"
                : " hover:bg-slate-900 hover:text-white"
            }`}
          >
            <FaChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
      <div className="grid h-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
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

      <nav className="flex items-center justify-center mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`border-slate-500 rounded-s-md text-slate-800  transition-all p-4 border border-r-0 ml-2 ${
            currentPage <= 1
              ? "cursor-not-allowed text-opacity-70 hover:bg-gray-100"
              : " hover:bg-slate-900 hover:text-white"
          }`}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: blogs?.totalPages || 1 }, (_, i) => i + 1)
          .slice(
            currentPage < 5 ? 0 : currentPage - 5,
            currentPage < 5 ? 9 : currentPage + 4
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${
                currentPage === page
                  ? "bg-gray-400 text-slate-900 transition-all"
                  : " hover:bg-gray-200 "
              }  border px-3 py-3 border-slate-500 border-r-0`}
            >
              {`${page}`.length < 2 ? 0 : ""}
              {page}
            </button>
          ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`border-slate-500 rounded-e-md text-slate-800  transition-all p-4 border ${
            currentPage >= totalPages
              ? "cursor-not-allowed text-opacity-70 hover:bg-gray-100"
              : " hover:bg-slate-900 hover:text-white"
          }`}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </>
  );
}
