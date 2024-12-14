import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedBlogs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    blog_title VARCHAR(255) NOT NULL,
    blog_body JSONB NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL
    )`;

  const insertBlog = await client.sql`
    INSERT INTO blogs (blog_title,blog_body,created_at,updated_at) 
    VALUES ('hello this is first blog', '{"description": "hello this is description"}'::jsonb, 
      NOW(), 
      NOW())
    ON CONFLICT (id) DO NOTHING
    `
  return insertBlog;
};

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedBlogs();
    await client.sql`COMMIT`;
    return Response.json({message:'database seeded successfully.'})
  } catch(error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
