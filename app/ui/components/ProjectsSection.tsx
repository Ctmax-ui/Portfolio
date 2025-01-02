"use client";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineWork } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/data";
import ProjectSectionSkeletonSection from "../skeleton/ProjectSectionSkeletonSection";

export interface fetchProjectsType {
  message: string;
  data?: ProjectData[];
  status: number;
}

export interface ProjectData {
  created_at?: string;
  id?: string;
  project_body?: {
    tags?: string[];
    description?: string;
  };
  project_code?: string;
  project_demo?: string;
  project_image?: string;
  project_title?: string;
  updated_at?: string;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<fetchProjectsType | null>(null);
  useEffect(() => {
    async function call() {
      const data = await fetchProjects();
      if (data) {
        setProjects(data);
      }
    }
    call();
  }, []);

  return (
    <section className="px-6 py-6 cursor-default" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 dark:border-white/50 backdrop-blur-sm mb-3 dark:bg-slate-100">
          <MdOutlineWork className="w-4 h-4 text-emerald-500 " />
          <span className="text-sm font-medium text-zinc-200 dark:text-black">
            PORTFOLIO
          </span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-500">
            <span className="text-black dark:text-white">Latest </span> Projects
          </h2>
          <Link
            href={"/projects"}
            className="py-3 px-5 bg-emerald-500 font-bold text-white flex justify-between items-center gap-2"
          >
            More Projects <FaArrowRightLong />
          </Link>
        </div>
        {projects?.data && projects.data.length > 0 ? (
          <div className="space-y-8">
            <Link
            target="customTab"
              href={projects.data[0]?.project_code|| "#"}
              className="block group"
            >
              <div className="relative ">
                <div className="aspect-[2/.98] rounded-2xl border border-zinc-800 relative p-2 overflow-hidden">
                  <Image
                    src={
                      `/api/imageproxy?url=${projects.data[0]?.project_image}` ||
                      "#"
                    }
                    alt={projects.data[0].project_title || "#"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white mb-2 text-xl font-semibold capitalize">
                        {projects.data[0]?.project_title}
                      </h3>
                      <div className="text-emerald-500 text-sm flex gap-1">
                        {projects?.data[0].project_body?.tags
                          ?.slice(0, 2)
                          ?.map((v, k) => {
                            return (
                              <div
                                key={k}
                                className="bg-black px-3 py-[1px] w-fit rounded-full capitalize"
                              >
                                {v}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.data?.slice(1, 3).map((project) => (
                <Link
                  key={project.id}
                  target="customTab"
                  href={project.project_code||'#'}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl border border-zinc-800 dark:border-white/50">
                    <div className="aspect-[2/.98] relative">
                      <Image
                        src={`/api/imageproxy?url=${project.project_image}`}
                        alt={project?.project_title || "#"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 "
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-lg mb-2 font-semibold">
                            {project.project_title}
                          </h3>
                          <div className="text-emerald-500 text-sm  flex gap-1 ">
                            {project?.project_body?.tags
                              ?.slice(0, 2)
                              ?.map((v, k) => {
                                return (
                                  <div
                                    key={k}
                                    className="bg-black px-3 py-[1px] w-fit rounded-full capitalize"
                                  >
                                    {v}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <ProjectSectionSkeletonSection />
        )}
        <div className="mt-8 mb-3 text-center">
          <Link
            href={"/projects"}
            className=" text-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-2 outline border-2 border-emerald-500 hover:border-emerald-500 transition-all outline-none font-semibold "
          >
            More Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
