"use client";
import { createBlog } from "@/lib/actions";
import { sendToast } from "@/lib/utils";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createBlog({ title, description, imageUrl });
      if (result.status == 201) {
        // setTitle("");
        // setBody("");
        sendToast("Blog created successfully!", "success");
      } else {
        sendToast("Failed to Create, Try Again", "error");
      }
    } catch {
      sendToast("Failed to Create, Try Again", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer newestOnTop={true} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-4 "
      >
        <div className="">
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-5 py-4 w-full border border-slate-800 rounded-sm dark:bg-slate-900"
          />
        </div>
        <div className="">
          <label htmlFor="imageUrl">Blog Image Url:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="px-5 py-4 w-full border border-slate-800 rounded-sm"
          />
        </div>
        <div className="">
          <label htmlFor="textBody">Blog Content:</label>
          <textarea
            id="textBody"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={10}
            className="border px-5 py-4 border-slate-700 w-full min-h-[10vh] h-[18vh] max-h-[30vh] rounded-sm "
            style={{ scrollbarWidth: "thin" }}
          />
        </div>

        <div className="">
          <label htmlFor="">Tags:</label>
          <select
            name=""
            className="border px-5 py-4 border-slate-700 w-full"
            id=""
          >
            <option value="default">Default</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="border rounded-sm py-2 border-blue-500 text-black transition-all hover:bg-blue-500 hover:text-white"
        >
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </>
  );
};

export default BlogForm;
