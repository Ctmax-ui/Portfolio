"use client";
import { createProject } from "@/lib/actions";
import { sendToast } from "@/lib/utils";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import TagAddedComponent from "./TagAddedComponent";

const ProjectForm = () => {
  const [project_title, setTitle] = useState("");
  const [project_image, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [project_demo, setProjectDemo] = useState("");
  const [project_code, setProjectCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleTagsChange = (newTags: string[]) => {
    setSelectedTags(newTags);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createProject({
        project_title: project_title,
        project_image,
        description,
        tags: selectedTags,
        project_demo,
        project_code,
      });
      if (result.status == 201) {
        setTitle("");
        setImageUrl("");
        setDescription("");
        setProjectCode("");
        setProjectDemo('')
        setSelectedTags([])
        setTags([])
        sendToast("Project added successfully.", "success");
      } else {
        sendToast("Failed to add, Try again later.", "error");
      }
    } catch {
      sendToast("Failed to add, Try again later.", "error");
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
        <div className="flex justify-between items-center gap-1">
          <div className="w-6/12">
            <label htmlFor="title">Project Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Project Title......."
              value={project_title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="px-5 py-4 w-full border border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black"
            />
          </div>
          <div className="w-6/12">
            <label htmlFor="imageUrl">Project Image Url:</label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Project Image Url........"
              value={project_image}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="px-5 py-4 w-full border border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-1">
          <div className="w-6/12">
            <label htmlFor="projectDemoUrl">Project Demo Url:</label>
            <input
              type="text"
              id="projectDemoUrl"
              placeholder="Project Demo Url....."
              value={project_demo}
              onChange={(e) => setProjectDemo(e.target.value)}
              required
              className="px-5 py-4 w-full border border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black"
            />
          </div>
          <div className="w-6/12">
            <label htmlFor="projectCodeUrl">Project Github Url:</label>
            <input
              type="text"
              id="projectCodeUrl"
              placeholder="Project Github Url......"
              value={project_code}
              onChange={(e) => setProjectCode(e.target.value)}
              required
              className="px-5 py-4 w-full border border-slate-800 dark:border-slate-200 rounded-sm bg-transparent dark:bg-black"
            />
          </div>
        </div>

        <div className="w-full">
          <TagAddedComponent onTagsChange={handleTagsChange} tags={tags} setTags={setTags} />
        </div>

        <div className="">
          <label htmlFor="textBody">Project Description:</label>
          <textarea
            id="textBody"
            placeholder="Project Short Description......"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={10}
            className="border px-5 py-4 border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black w-full min-h-[10vh] h-[18vh] max-h-[30vh]"
            style={{ scrollbarWidth: "thin" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="border rounded-sm py-3 border-blue-500 text-black transition-all hover:bg-blue-500 hover:text-white dark:text-white"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </>
  );
};

export default ProjectForm;
