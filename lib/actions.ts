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
export async function updateBlog() {
}

export async function createProject({
  project_title,
  project_image,
  description,
  tags,
  project_demo,
  project_code,
}: {
  project_title: string;
  project_image: string;
  description: string;
  tags: string[];
  project_demo: string;
  project_code: string;
}) {
  try {
    await sql`
      INSERT INTO projects (project_title, project_image, project_body, project_demo, project_code, created_at, updated_at) 
      VALUES (
        ${project_title.trim()}, 
        ${project_image}, 
        ${JSON.stringify({ description: description, tags: tags })}::jsonb,
        ${project_demo},
        ${project_code},
        NOW(), 
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `;

    return { message: `project created successfully`, status: 201 };
  } catch {
    // console.error("Database Error:", err);
    return { message: "500 Internal Server Error", status: 500 };
  }
}
export async function updateProjects() {
}
