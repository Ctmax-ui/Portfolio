"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface ProjectProps {
  project: {
    id: string;
    project_title: string;
    project_image: string;
    project_body: { description: string; tags: [] };
    project_demo: string;
    project_code: string;
    created_at: string;
    updated_at: string;
  };
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group overflow-hidden border-none bg-gradient-to-br from-white to-gray-50/50 shadow-xl dark:from-gray-950 dark:to-gray-900/50">
        <div className="relative h-56 overflow-hidden rounded-t-2xl ">
          <div className="absolute inset-0 z-10 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 " />
          <Image
            src={`/api/imageproxy?url=${project.project_image}`}
            alt={project.project_title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-primary">
            {project.project_title}
          </h3>
          <p className="mb-6 line-clamp-3 text-sm text-muted-foreground h-[60px]">
            {project.project_body.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.project_body.tags.map((tag, i) => (
              <div
                key={i}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {tag}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 p-6 pt-0">
          <Link target="customTab" href={project.project_demo} className="group/button relative overflow-hidden rounded-md border-2 border-primary px-4 py-2 font-medium transition-colors text-nowrap">
              <span className="absolute inset-0 z-0 h-full translate-y-full bg-primary transition-transform duration-300 group-hover/button:translate-y-0" />
              <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover/button:text-primary-foreground">
                Live Demo
                <ExternalLink className="h-4 w-4" />
              </span>
            </Link>
            <Link target="customTab" href={project.project_code} className="group/button relative overflow-hidden rounded-md border-2 border-primary px-4 py-2 font-medium transition-colors text-nowrap">
            <span className="absolute inset-0 z-0 h-full translate-y-full bg-primary transition-transform duration-300 group-hover/button:translate-y-0" />
            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover/button:text-primary-foreground">
              View Code
              <Github className="h-4 w-4" />
            </span>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
