"use client";
import { getBlogs } from "@/lib/data";
import { BlogTypes } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { QueryResultRow } from "@vercel/postgres";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import BlogTableSkeleton from "./BlogTableSkeleton";

const BlogTable = () => {
  const [blogs, setBlogs] = useState<QueryResultRow>();
  const [isLoading, setIsloading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [query] = useState("");

  async function fetchData() {
    setIsloading(true);
    const data = await getBlogs(pageNo, query);
    console.log(data);
    setBlogs(data);
    setIsloading(false);
  }

  useEffect(() => {
    fetchData();
  },[]);

  const handlePageIncrement = () => {
    setPageNo((prev)=>prev+1);
    fetchData();
  };
  const handlePageDecrement = () => {
    setPageNo(pageNo >= 1 ? pageNo - 1 : 1);
    fetchData();
  };

  return (
    <>
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <button
              onClick={handlePageDecrement}
              disabled={pageNo > 1 ? false : true}
              className="border px-2 py-1 rounded-md border-slate-800 hover:bg-slate-800 hover:text-white transition-all"
            >
              {"<"}
            </button>
            <p>
              Page: {pageNo}/{blogs?.totalPages || 1}
            </p>
            <button
              onClick={handlePageIncrement}
              disabled={pageNo < blogs?.totalPages || 1 ? false : true}
              className="border px-2 py-1 rounded-md border-slate-800 hover:bg-slate-800 hover:text-white transition-all"
            >
              {">"}
            </button>
          </div>

          <form className="border px-3 py-1 rounded-md">
            <input
              type="text"
              className="outline-none"
              placeholder="Search..."
            />
            <button>Go</button>
          </form>
        </div>

        <table className="w-full bg-white dark:bg-black border border-gray-300">
          <thead className="border-b border-gray-300">
            <tr className="bg-gray-100 dark:bg-slate-900">
              <th className="py-2 px-4 text-left hidden lg:table-cell">
                Image
              </th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left ">Description</th>
              <th className="py-2 px-4 text-left hidden lg:table-cell text-nowrap">
                Updated At
              </th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
                <BlogTableSkeleton />
              </>
            ) : (
              blogs &&
              blogs.data?.map((blog: BlogTypes) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 border-b dark:border-gray-300"
                >
                  <td className="py-1 px-1 w-auto h-auto hidden lg:table-cell">
                    <Image
                      src={`/api/imageproxy?url=${encodeURIComponent(
                        blog.blog_image
                      )}`}
                      alt={blog.blog_title}
                      width={70}
                      height={70}
                      className="rounded-md"
                    />
                  </td>
                  <td>
                    <div className="py-2 px-4 font-medium text-nowrap overflow-hidden text-ellipsis w-[100px] sm:w-auto">
                      {blog.blog_title}
                    </div>
                  </td>
                  <td>
                    <div className="px-4 line-clamp-1 w-[100px] sm:w-auto">
                      {blog.blog_body.description}
                    </div>
                  </td>
                  <td className="hidden lg:table-cell text-nowrap">
                    {formatDate(blog.updated_at)}
                  </td>
                  <td className="">
                    <div className=" flex justify-evenly">
                      <button className="border px-2 py-2 hover:bg-blue-500 hover:text-white transition-all rounded-md hover:border-blue-500">
                        <FaEdit />
                      </button>
                      <button className="border px-2 py-2 hover:bg-red-600 hover:text-white transition-all rounded-md hover:border-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BlogTable;
