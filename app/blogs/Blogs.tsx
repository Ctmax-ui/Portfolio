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
  const [isLoading, setIsLoading] = useState(true);
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

  const setQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedBlogs = await getBlogs(pageNo, fetchQuery);
      if (fetchedBlogs) {
        // @ts-expect-error: Unreachable code error
        setBlogs(fetchedBlogs);
        setCurrentPage(fetchedBlogs.currentPage || 1);
        setTotalPages(fetchedBlogs.totalPages || 1);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [pageNo, fetchQuery]);

  const queryFetcherHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setPageNo(1);
    setQueryParams({ query: inputQuery, page: "1" });
    setFetchQuery(inputQuery);
  };

  const handlePageChange = (props: number) => {
    setQueryParams({ page: props.toString() });
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
      <div
        className={`${
          blogs && blogs?.data?.length > 0 ? "grid" : "grid  relative"
        } grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mb-5`}
      >
        {isLoading ? (
          <>
            <BlogSkeletonCard />
            <BlogSkeletonCard />
            <BlogSkeletonCard />
          </>
        ) : blogs && blogs?.data?.length > 0 ? (
          blogs.data.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="absolute left-1/2 -translate-x-1/2 cursor-default h-[60vh] text-3xl gap-2 py-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              width="40pt"
              height="40pt"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.16, written by Peter Selinger 2001-2019
              </metadata>
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path d="M552 5089 c-69 -34 -104 -71 -138 -144 l-24 -50 0 -1605 0 -1605 24 -51 c28 -60 80 -115 139 -146 40 -22 56 -23 304 -28 l262 -5 -402 -377 c-540 -506 -522 -488 -551 -545 -91 -180 -22 -397 156 -494 61 -33 67 -34 173 -34 100 0 115 2 160 27 63 33 52 22 687 699 l531 566 70 -43 c124 -77 283 -135 462 -171 139 -27 444 -24 585 6 266 57 505 171 671 320 l56 50 534 3 534 3 53 30 c64 35 96 71 131 145 l26 55 0 1585 c0 1294 -2 1593 -13 1631 -21 72 -78 139 -151 176 l-63 33 -2077 0 -2078 0 -61 -31z m4174 -184 c54 -22 64 -58 64 -235 l0 -150 -846 0 -846 0 -29 -29 c-32 -32 -38 -71 -17 -116 26 -57 -5 -55 903 -55 l835 0 0 -1296 0 -1296 -34 -34 -34 -34 -416 0 -415 0 56 83 c102 149 181 339 220 533 27 134 24 423 -5 560 -64 299 -201 559 -406 772 -214 222 -458 359 -759 424 -87 19 -133 22 -307 22 -174 0 -220 -3 -307 -22 -294 -64 -523 -190 -738 -406 -223 -224 -359 -476 -427 -790 -18 -84 -22 -133 -22 -291 0 -206 14 -299 70 -462 28 -82 110 -256 144 -303 11 -16 20 -32 20 -37 0 -5 -20 -25 -44 -46 l-45 -37 -341 0 -342 0 -34 34 -34 34 0 1296 0 1296 835 0 c625 0 841 3 860 12 59 27 73 112 26 159 l-29 29 -846 0 -846 0 1 148 c0 174 9 210 59 234 33 17 151 18 2038 18 1736 0 2007 -2 2038 -15z m-1801 -1070 c535 -96 925 -479 1032 -1013 25 -123 25 -405 0 -522 -85 -406 -320 -722 -662 -890 -337 -165 -708 -191 -1040 -73 -368 131 -671 441 -795 811 -49 149 -64 242 -64 407 -1 167 12 255 56 395 63 200 169 372 322 526 199 200 440 324 721 370 100 17 308 11 430 -11z m-1283 -2481 l-67 -73 -83 82 -83 82 73 67 73 66 77 -76 76 -75 -66 -73z m-230 -238 c-56 -64 -807 -864 -826 -879 -55 -44 -140 -39 -200 13 -66 59 -68 157 -3 225 18 18 223 212 456 430 l424 397 83 -83 c81 -80 83 -84 66 -103z" />
                <path d="M2619 4491 c-81 -81 17 -210 120 -157 90 47 53 186 -49 186 -33 0 -48 -6 -71 -29z" />
                <path d="M2305 3320 c-11 -4 -101 -90 -200 -189 -236 -237 -234 -207 -27 -414 l152 -152 -140 -140 c-146 -146 -176 -188 -165 -233 8 -35 339 -369 383 -389 19 -7 43 -11 55 -7 12 3 91 74 175 157 l152 152 154 -154 c210 -210 180 -212 422 30 193 193 210 218 184 270 -7 13 -77 89 -156 169 l-144 145 150 150 c154 154 170 178 150 230 -16 41 -349 372 -383 380 -52 13 -79 -5 -229 -153 l-149 -146 -142 141 c-169 168 -185 178 -242 153z" />
              </g>
            </svg>
            <p className="">Found nothing...</p>
          </div>
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
