"use server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim() || null;
    const pageNoReq = parseInt(searchParams.get("page") || "1", 10);

    if (isNaN(pageNoReq) || pageNoReq < 1) {
      return new Response(
        JSON.stringify({ message: "Invalid page number" }),
        { status: 400 }
      );
    }

    if (query && query.length > 100) {
      return new Response(
        JSON.stringify({ message: "Query too long" }),
        { status: 400 }
      );
    }

    const pageLimit = 10;
    const pageOffset = (pageNoReq - 1) * pageLimit;

    let data;
    let totalBlogs;

    if (query) {
      data = await sql`
        SELECT * 
        FROM blogs 
        WHERE blog_title ILIKE ${"%" + query + "%"} 
        ORDER BY updated_at DESC 
        LIMIT ${pageLimit} 
        OFFSET ${pageOffset}
      `;
      totalBlogs = await sql`
        SELECT COUNT(*) FROM blogs 
        WHERE blog_title ILIKE ${"%" + query + "%"}
      `;
    } else {
      data = await sql`
        SELECT * 
        FROM blogs 
        ORDER BY updated_at DESC 
        LIMIT ${pageLimit} 
        OFFSET ${pageOffset}
      `;
      totalBlogs = await sql`SELECT COUNT(*) FROM blogs`;
    }

    return new Response(
      JSON.stringify({
        message: "success",
        data: data.rows,
        totalPages: Math.ceil(totalBlogs?.rows[0]?.count / pageLimit),
        currentPage: pageNoReq,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, imageUrl } = await req.json();

    const resData =
      await sql`INSERT INTO blogs (blog_title,blog_body,blog_image,created_at,updated_at) 
    VALUES (${title.trim()}, ${JSON.stringify({
        description: description,
      })}::jsonb, 
      ${imageUrl},
      NOW(), 
      NOW())
    ON CONFLICT (id) DO NOTHING`;

    console.log(resData);

    return Response.json(
      { message: `Blog created successflly ` },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { message: "500 internal server error" },
      { status: 500 }
    );
  }
}

