import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image";

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
  };
};

export default async function ProjectCard({ project }: ProjectCardProps) {

  await new Promise(resolve=>setInterval(resolve,3000))

  return (
    <Card className="overflow-hidden flex flex-col justify-between">
      <div className="relative h-48 border-b p-2">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-6">
        <div
          className="text-2xl font-bold mb-2 text-blue-500"
        >
          {project.title}
        </div>
        <div  className="text-gray-600 mb-4">
          {project.description}
        </div>
        <div className="flex flex-wrap gap-2 my-4">
          {project.tags.map((tag) => (
            <div key={tag} className="border border-black px-2 rounded-full font-semibold ">{tag}</div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 flex justify-between gap-4">
        <button className="w-full border-2 border-blue-500 py-2 hover:bg-blue-500 hover:text-white font-semibold">
          View Project
        </button>
        <button className="w-full border-2 border-blue-500 py-2 hover:bg-blue-500 hover:text-white font-semibold">View Code</button>
      </CardFooter>
    </Card>
  );
}
