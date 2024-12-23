"use client";
import Link from "next/link";
import ProjectCard from "../ui/components/ProjectCard";
import { TiHome } from "react-icons/ti";
import SkeletonCard from "./SkeletonCard";
import { useEffect, useState } from "react";
import MotionThemeChangerBtn from "../ui/smallUi/MotionThemeChangerBtn";

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
      // console.log(data.data);
      setProjects(data.data);
    }
    fetchProjects();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-primary bg-black dark:bg-white">
        <div className="container flex flex-wrap h-16 mx-auto items-center justify-between px-4">
          <button className="text-sm font-medium transition-colors border rounded-sm hover:bg-white hover:text-black text-white dark:text-black dark:hover:text-white dark:hover:bg-black">
            <Link
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-nowrap flex-nowrap"
              href="/"
            >
              <TiHome className="h-4 w-4" />
              Go Home
            </Link>
          </button>

          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary-foreground text-nowrap ">
              Projects
            </h1>
          </div>

          <div className="w-[100px]">
            <MotionThemeChangerBtn />
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 dark:from-black ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
