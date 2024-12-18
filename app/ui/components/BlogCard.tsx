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
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] border h-[478px] p-5 flex flex-col justify-between">
      <Image
        src={`/api/imageproxy?url=${blog.blogImage}`}
        alt={blog.title}
        width={300}
        height={200}
        className="w-full h-52 object-cover rounded-md border"
      />
      <div className="flex flex-col justify-between 1/2">
        <h2 className="text-xl font-bold text-slate-800 mb-2 text-ellipsis overflow-hidden text-nowrap">
          {blog.title}
        </h2>
        <p className="text-slate-600 mb-4 text-md">
         {blog.description.slice(0,90)}...
        </p>
        <div className="flex justify-between items-center my-3">
          <span className="text-sm text-slate-500">{parsedDate}</span>
        </div>
          <Link href={`/blogs/${blog.id}`} className="bg-emerald-500 hover:bg-emerald-600 text-white w-full mt-auto py-2 text-center">
            Read More
          </Link>
      </div>
    </div>
  );
}
