import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { fetchBlogById } from "@/lib/data";

type BlogArticleProps = {
  blogId: string;
};

const fetchData = async (id: string) => {
  const result = await fetchBlogById(id);
  if (!result.data) {
    return null
  }
  return result.data;
};

const BlogArticle: React.FC<BlogArticleProps> = async ({ blogId }) => {
  const data = await fetchData(blogId);

  if(!data){
    return <>
    <div className="flex w-100 h-max mt-5 justify-center items-center">
      Blog Not Found.
    </div>
    </>
  }

  return (
    <article className="container mx-auto w-11/12 max-w-3xl py-5 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <time dateTime={data.created_at}>{formatDate(data.updated_at)}</time>
        </div>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl first-letter:uppercase">
          {data.blog_title}
        </h1>
        <div className="flex items-center gap-4">
          <Avatar className="border border-black">
            <AvatarImage src="/pic-two.png" alt="Author" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Dave</p>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={`/api/imageproxy?url=${encodeURIComponent(data.blog_image)}`}
          alt={data.blog_title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="first-letter:uppercase">{data.blog_body.description}</p>
      </div>
    </article>
  );
};

export default BlogArticle;
