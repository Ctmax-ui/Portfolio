"use server";
import { sql } from "@vercel/postgres";

export async function createBlog({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  try {
    await sql`
      INSERT INTO blogs (blog_title, blog_body, blog_image, created_at, updated_at) 
      VALUES (
        ${title.trim()}, 
        ${JSON.stringify({ description: description })}::jsonb, 
        ${imageUrl}, 
        NOW(), 
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `;

    return { message: `Blog created successfully`, status: 201 };
  } catch (err) {
    console.error("Database Error:", err);
    return { message: "500 Internal Server Error", status: 500 };
  }
}
