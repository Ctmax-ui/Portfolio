import { Card,CardContent,CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from 'next/link'

interface BlogPost {
  id: number;
  title: string;
  blogImage:string;
  description: string;
  date: string;
}

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const parsedDate = new Date(blog.date).toLocaleString()

  return (
    <Card className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] h-[460px] flex flex-col">
      <div className="relative h-52 w-full">
        <Image
          src={`/api/imageproxy?url=${encodeURIComponent(blog.blogImage)}`}
          alt={blog.title}
          fill
          className=" w-full object-cover border-b"
        />
      </div>
      <CardContent className="flex-grow p-4 flex flex-col">
        <h2 className="text-xl font-bold text-slate-800 mb-2 truncate">
          {blog.title}
        </h2>
        <p className="text-slate-600 mb-4 text-md line-clamp-3">
          {blog.description}
        </p>
        <span className="text-sm text-slate-500 mt-auto">{parsedDate}</span>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link 
          href={`/blogs/${blog.id}`} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2 text-center rounded transition-colors duration-200"
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
