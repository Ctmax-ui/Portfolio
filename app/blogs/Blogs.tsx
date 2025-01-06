"use client";
import BlogCard from "@/app/ui/components/BlogCard";
import React, { useEffect, useState } from "react";
import BlogSkeletonCard from "./BlogCardSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import PagiginationNav from "./PagiginationNav";
import BlogsQueryComponent from "./BlogsQueryComponent";
import { getBlogs } from "@/lib/data";

export interface QueryResultRow {
  id: string;
  blog_title: string;
  blog_image: string;
  blog_body: { description: string };
  created_at: string;
  updated_at: string;
}

export interface blogsType {
  data: QueryResultRow[];
  currentPage: number;
  totalPages: number;
  message: string;
  status: number;
}

export default function Blogs() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const paramQuery = params.get("query");
  const paramPage = params.get("page");

  const [blogs, setBlogs] = useState<blogsType | undefined>();
  const [pageNo, setPageNo] = useState(Number(paramPage) || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
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
      const fetchedBlogs = await getBlogs(pageNo, fetchQuery);
      console.log(fetchedBlogs);
      if (fetchedBlogs) {
        // @ts-expect-error: Unreachable code error
        setBlogs(fetchedBlogs);
        setCurrentPage(fetchedBlogs.currentPage || 1);
        setTotalPages(fetchedBlogs.totalPages || 1);
        setIsLoading(false);
      }
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
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 mb-10 ">
        <BlogsQueryComponent
          inputQuery={inputQuery}
          setInputQuery={setInputQuery}
          queryFetcherHandler={queryFetcherHandler}
        />

        <PagiginationNav
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          blogs={blogs}
        />
      </div>
      <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
        {isLoading ? (
          <>
            <BlogSkeletonCard />
            <BlogSkeletonCard />
            <BlogSkeletonCard />
          </>
        ) : (
          blogs?.data &&
          blogs.data.length > 0 &&
          blogs?.data?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>

      <PagiginationNav
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        blogs={blogs}
      />
    </>
  );
}
