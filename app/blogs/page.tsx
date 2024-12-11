"use client";
import { useState, useEffect } from "react";
import BlogCard from "@/app/ui/components/BlogCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export interface blogsType {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const Page = () => {
  const [blogs, setBlogs] = useState<blogsType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 8;
  const totalPages: number = 100;

  const getData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.org/posts", {
        method: "GET",
      });
      const data = await response.json();
      const parsedData = await data.map(
        (item: {
          id: string;
          content: string;
          title: string;
          image: string;
          updatedAt: string;
        }) => ({
          id: item?.id || "N/A",
          description: item?.content || "No description",
          title: item?.title || "Untitled",
          image: item?.image || "No image",
          date: item?.updatedAt || "No date",
        })
      );
      console.log(parsedData);

      setBlogs(parsedData);
    } catch {}
  };

  const handlePageChange = (props: number) => {
    setCurrentPage(props);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="min-h-screen py-5 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Latest Blog Posts
        </h1>

        <div className="flex justify-between items-center mb-10">
          <label
            className="relative border border-slate-500 rounded-md py-3 px-4 cursor-text"
            htmlFor="searchBlog"
          >
            <input
              type="search"
              placeholder="Search posts..."
              id="searchBlog"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </label>

          <div className="flex items-center">
            <div className="flex items-center gap-2 text-black">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border p-4 disabled:text-slate-500 hover:bg-slate-900 hover:text-white transition-all border-slate-600 rounded-md"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-md">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border p-4 disabled:text-slate-500 hover:bg-slate-900 hover:text-white transition-all border-slate-600 rounded-md"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
          {blogs &&
            blogs
              .slice(0, itemsPerPage)
              ?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>

        <div className="flex justify-center mt-20">
          <div className="flex items-center gap-2 ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-slate-500 rounded-md text-slate-800 hover:bg-slate-900 hover:text-white transition-all p-4 border mr-2"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice((currentPage < 5 ? 0 : currentPage - 5), (currentPage < 5? 9 :currentPage+4))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`${
                    currentPage === page
                      ? "bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500 transition-all"
                      : "border-slate-500 text-slate-900 hover:bg-emerald-50 "
                  }  border rounded-md px-2 py-1`}
                >
                  {(`${page}`.length<2?0:'')}{page}
                </button>
              ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-slate-500 rounded-md text-slate-800 hover:bg-slate-900 hover:text-white transition-all p-4 border ml-2"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
