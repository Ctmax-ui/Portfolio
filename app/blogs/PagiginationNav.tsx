import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { blogsType } from "./Blogs";

const PagiginationNav = ({
  currentPage,
  totalPages,
  blogs,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  blogs?: blogsType;
  handlePageChange: (props: number) => void;
}) => {
  return (
    <nav className="flex items-center justify-center mt-5 sm:mt-0">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`border-slate-500 rounded-s-md text-slate-800 dark:text-white/50 transition-all p-4 border border-r-0 ml-2 ${
          currentPage <= 1
            ? "cursor-not-allowed text-opacity-70 hover:bg-gray-100 dark:hover:text-black/50"
            : "hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black "
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
                ? "bg-gray-400 dark:bg-white text-slate-900 transition-all"
                : " hover:bg-gray-200 dark:hover:bg-white dark:hover:text-black"
            }  border w-11 py-3 border-slate-500  border-r-0 font-semibold`}
          >
            {`${page}`.length < 2 ? 0 : ""}
            {page}
          </button>
        ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`border-slate-500 rounded-e-md text-slate-800  transition-all p-4 border dark:text-white ${
          currentPage >= totalPages
            ? "cursor-not-allowed text-opacity-70 hover:bg-gray-100 dark:hover:text-black/50"
            : "hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black "
        }`}
      >
        <FaChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default PagiginationNav;
