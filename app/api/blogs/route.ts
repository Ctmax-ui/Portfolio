"use server";

import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageNoReq: number | null = Number(searchParams.get("page"));
    let pageOffset = 0;
    if (pageNoReq) {
      pageOffset = pageNoReq * 10;
    }
    const data = await sql`
        SELECT * FROM blogs ORDER BY updated_at DESC LIMIT 10 OFFSET ${pageOffset}
        `;

    // console.log(data);

    return Response.json(
      { message: "success", data: data.rows },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description,imageUrl } = await req.json();

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
