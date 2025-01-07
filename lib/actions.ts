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
export async function updateBlog(
  id: string,
  title: string,
  description: string,
  imageUrl: string
) {
  try {
    await sql`UPDATE blogs
  SET 
    blog_title = ${title},
    blog_body = ${JSON.stringify({ description: description })}::jsonb,
    blog_image = ${imageUrl},
    updated_at = NOW()
    WHERE id = ${id};
    `;

    return { message: `Blog Updated successfully`, status: 202 };
  } catch (err) {
    console.error("Database Error:", err);
    return { message: "500 Internal Server Error", status: 500 };
  }
}
export async function deleteBlog(id: string) {
  try {
    await sql`DELETE FROM blogs WHERE id = ${id}`;
    return { message: `Blog Deleted successfully`, status: 203 };
  } catch (err) {
    console.error("Database Error:", err);
    return { message: "500 Internal Server Error", status: 500 };
  }
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
export async function updateProject(
  id: string,
  title: string,
  description: string,
  imageUrl: string,
  tags: string[],
  project_code: string,
  project_demo: string
) {
  try {
    await sql`UPDATE projects
  SET 
    project_title = ${title},
    project_body = ${JSON.stringify({ description: description, tags: tags })}::jsonb,
    project_image = ${imageUrl},
    project_code = ${project_code},
    project_demo = ${project_demo},
    updated_at = NOW()
    WHERE id = ${id};
    `;

    return { message: `Blog Updated successfully`, status: 202 };
  } catch (err) {
    console.error("Database Error:", err);
    return { message: "500 Internal Server Error", status: 500 };
  }
}
export async function deleteProject(id: string) {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    return { message: `Blog Deleted successfully`, status: 203 };
  } catch (err) {
    console.error("Database Error:", err);
    return { message: "500 Internal Server Error", status: 500 };
  }
}
