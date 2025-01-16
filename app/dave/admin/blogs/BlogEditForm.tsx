"use client";
import { updateBlog } from "@/lib/actions";

import { QueryResultRow } from "@vercel/postgres";
import React, { useState } from "react";

const BlogEditForm = ({
  blog,
  setUpdateState,
  setToastType,
  setToastMessage
}: {
  blog: QueryResultRow;
  setUpdateState: React.Dispatch<React.SetStateAction<string>>;
  setToastType:React.Dispatch<React.SetStateAction<"success" | "error" | "info" | "warning">>
  setToastMessage: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [blogId] = useState(blog.id);
  const [title, setTitle] = useState(blog.blog_title);
  const [imageUrl, setImageUrl] = useState(blog.blog_image);
  const [description, setDescription] = useState(blog.blog_body.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateBlog(blogId, title, description, imageUrl);
      if (result.status == 202) {
        setTitle("");
        setDescription("");
        setToastType("success")
        setToastMessage("Blog updated successfully!")
        setUpdateState((prev)=>prev+'1');
      } else {
        setToastType("error")
        setToastMessage("Failed to updated, Try Again")
        setUpdateState((prev)=>prev+'1');
      }
    } catch {
        setToastType("error")
        setToastMessage("Failed to updated, Try Again")
        setUpdateState((prev)=>prev+'1');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-4 "
      >
        <div className="">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Blog Title"
            className="px-5 py-4 w-full border border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black"
          />
        </div>
        <div className="">
          <input
            placeholder="Blog Image Url"
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="px-5 py-4 w-full border border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black"
          />
        </div>
        <div className="">
          <textarea
            placeholder="Blog Description......"
            id="textBody"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={10}
            className="border px-5 py-4 border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black w-full min-h-[10vh] h-[18vh] max-h-[30vh]"
            style={{ scrollbarWidth: "thin" }}
          />
        </div>

        <div className="">
          <label htmlFor="">Tags:</label>
          <select
            name=""
            className="border px-5 py-4 border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black w-full"
            id=""
          >
            <option value="default">Default</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="border rounded-sm py-2 border-blue-500 text-black transition-all hover:bg-blue-500 hover:text-white dark:text-white"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </>
  );
};

export default BlogEditForm;
