import Link from "next/link";
import ProjectCard from "../ui/components/ProjectCard";
import { LuArrowBigLeftDash } from "react-icons/lu";
import SkeletonCard from "./SkeletonCard";
import { Suspense } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-featured online store built with Next.js and Stripe integration.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
    link: "https://example.com/ecommerce",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A Trello-like application for managing tasks and projects.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    link: "https://example.com/taskmanager",
  },
  {
    id: "3",
    title: "Weather Forecast Dashboard",
    description:
      "Real-time weather information with interactive maps and charts.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "D3.js", "OpenWeatherMap API"],
    link: "https://example.com/weather",
  },
  {
    id: "4",
    title: "Social Media Analytics Tool",
    description:
      "Analyze and visualize social media engagement and growth metrics.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Python", "Django", "React", "Chart.js"],
    link: "https://example.com/socialanalytics",
  },
];
const page = () => {
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
            <Suspense
              fallback={
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              }
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
