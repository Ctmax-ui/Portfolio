'use server'
import { sql } from "@vercel/postgres";

export async function fetchBlogById(id: string) {
  try {
    const { rows } = await sql`SELECT * FROM blogs WHERE id=${id}`;
    if (rows.length != 0) {
      const blog = rows[0];

      return {
        message: "success",
        data: {
          blog_body: { description: blog.blog_body.description },
          blog_image: blog.blog_image,
          blog_title: blog.blog_title,
          created_at: blog.created_at,
          id: blog.id,
          updated_at: blog.updated_at,
        },
        status: 200,
      };
    }
    return { message: "found nothing", data: null, status: 404 };
  } catch {
    return { message: "Internal server error", data: null, status: 500 };
  }
}
