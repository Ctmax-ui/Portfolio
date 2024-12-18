"use client";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.status = 201) {
        setSuccessMessage("Blog created successfully!");
        // setTitle("");
        // setBody("");
        console.log(result);
      } else {
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="w-full mx-auto px-5 pt-3">
      <h1 className="mb-5 text-xl ">Create a New Blog</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
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
            className="px-5 py-4 w-full border border-slate-800 rounded-sm"
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
    </div>
  );
};

export default Page;
