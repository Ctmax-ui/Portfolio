import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: string;
  blog_title: string;
  blog_image: string;
  blog_body: { description: string };
  created_at: string;
  updated_at: string;
}

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const parsedDate = new Date(blog.updated_at).toLocaleString();
  return (
    <Card className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] h-[460px] flex flex-col dark:border-slate-300">
      <div className="relative h-52 w-full ">
        <Image
          src={`/api/imageproxy?url=${encodeURIComponent(blog.blog_image)}`}
          alt={blog.blog_title}
          fill
          className=" w-full object-cover border-b dark:border-slate-300"
        />
      </div>
      <CardContent className="flex-grow p-4 flex flex-col">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 truncate first-letter:uppercase first-letter:font-bold first-letter:text-xl">
          {blog.blog_title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4 text-md line-clamp-3 first-letter:uppercase first-letter:font-bol first-letter:text-lg">
          {blog.blog_body.description}
        </p>
        <span className="text-sm text-slate-500 mt-auto dark:text-slate-300">
          {parsedDate}
        </span>
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
