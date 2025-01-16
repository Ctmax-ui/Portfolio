"use client";
import { updateProject } from "@/lib/actions";

import { QueryResultRow } from "@vercel/postgres";
import React, { useState } from "react";
import TagAddedComponent from "./TagAddedComponent";

const ProjectEditForm = ({
    project,
    setUpdateState,
    setToastType,
    setToastMessage
  }: {
    project: QueryResultRow;
    setUpdateState: React.Dispatch<React.SetStateAction<string>>;
    setToastType:React.Dispatch<React.SetStateAction<"success" | "error" | "info" | "warning">>
    setToastMessage: React.Dispatch<React.SetStateAction<string>>
  }) => {
    const [projectId] = useState(project.id);
    const [title, setTitle] = useState(project.project_title);
    const [project_image, setImageUrl] = useState(project.project_image);
    const [description, setDescription] = useState(project.project_body.description);
    const [project_code, setProjectCode] = useState(project.project_code);
    const [project_demo, setProjectDemo] = useState(project.project_demo);
    const [tags, setTags] = useState<string[]>(project.project_body.tags);
    const [loading, setLoading] = useState(false);
  
    const handleTagsChange = (newTags: string[]) => {
      setTags(newTags);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await updateProject(projectId, title, description, project_image,tags,project_code,project_demo);
        if (result.status == 202) {
          setToastType("success")
          setToastMessage("Project Updated Successfully!")
          setUpdateState((prev)=>prev+'1');
        } else {
          setToastType("error")
          setToastMessage("Failed to Update, Try Again")
          setUpdateState((prev)=>prev+'1');
        }
      } catch {
          setToastType("error")
          setToastMessage("Failed to Update, Try Again")
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
        <div className="flex justify-between items-center gap-1">
          <div className="w-6/12">
            <label htmlFor="title">Project Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Project Title......."
              value={title}
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
          <TagAddedComponent onTagsChange={handleTagsChange} setTags={setTags} tags={tags} />
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
          {loading ?  "Updating..." : "Update Project"}
        </button>
      </form>
      </>
    );
  };

export default ProjectEditForm