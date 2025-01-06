"use client";
import { BlogTypes } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";

const BlogTable = () => {
  const [blogs, ] = useState<BlogTypes[]>();

  return (
    <>
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs?.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <Image
                      src={blog.blog_image}
                      alt={blog.blog_title}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b font-medium">
                    {blog.blog_title}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {blog.blog_body.description}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BlogTable;
