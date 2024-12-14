import {
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";
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

export default function ProjectCard({ project }: ProjectCardProps) {
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
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-2xl font-bold mb-2 text-emerald-500"
        >
          {project.title}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-4">
          {project.description}
        </Typography>
        <div className="flex flex-wrap gap-2 my-4">
          {project.tags.map((tag) => (
            <div key={tag} className="border border-black px-2 rounded-full font-semibold ">{tag}</div>
          ))}
        </div>
      </CardContent>
      <CardActions className="p-6 flex justify-between ">
        <button className="w-full border-2 border-emerald-500 py-2 hover:bg-emerald-500 hover:text-white font-semibold">
          View Project
        </button>
        <button className="w-full border-2 border-emerald-500 py-2 hover:bg-emerald-500 hover:text-white font-semibold">View Code</button>
      </CardActions>
    </Card>
  );
}
