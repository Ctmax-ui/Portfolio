"use client";
import Link from "next/link";
import ProjectCard from "../ui/components/ProjectCard";
import { LuArrowBigLeftDash } from "react-icons/lu";
import SkeletonCard from "./SkeletonCard";
import {useEffect, useState } from "react";

type ProjectType = {
  id: string;
  project_title: string;
  project_image: string;
  project_body: { description: string; tags: [] };
  project_demo: string;
  project_code: string;
  created_at: string;
  updated_at: string;
};

const Page = () => {
  const [projects, setProjects] = useState<ProjectType[] | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(
        `${window.location.origin || "http://localhost:3000"}/api/projects`,
        {
          method: "GET",
          next: { revalidate: 60 },
        }
      );
      const data = await response.json();
      console.log(data.data);
      setProjects(data.data);
    }
    fetchProjects();
  },[]);

  return (
    <>
      <header className="flex items-center justify-center bg-blue-500 p-4 shadow-lg relative">
        <Link
          href={"/"}
          className="text-white text-lg hover:text-blue-300 transition duration-300 absolute left-10 border px-4 py-1 rounded-sm flex justify-center items-center gap-3"
        >
          <LuArrowBigLeftDash className="text-xl" /> Go Home
        </Link>
        <h1 className="text-white text-2xl font-bold ">My Projects</h1>
      </header>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects? projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              )): <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
