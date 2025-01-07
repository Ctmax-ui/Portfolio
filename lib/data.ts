"use server";
import { sql } from "@vercel/postgres";

export async function getBlogs(pageNo: number, fetchQuery: string) {
  try {
    const query = fetchQuery || null;
    const pageNoReq = pageNo || 1;

    if (isNaN(pageNoReq) || pageNoReq < 1) {
      return { message: "Invalid page number", status: 400, data: [],totalPages: 0,
        currentPage: 0, };
    }

    if (query && query.length > 100) {
      return { message: "Query too long", status: 400, data: [],totalPages: 0,
        currentPage: 0, };
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
    // console.log(data);
    return {
      message: "success",
      data: data.rows,
      totalPages: Math.ceil(totalBlogs?.rows[0]?.count / pageLimit),
      currentPage: pageNoReq,
      status: 200,
    };
  } catch (err) {
    console.error(err);
    return {
      message: "Internal server error",
      status: 500,
      data: [],
      totalPages: 0,
        currentPage: 0,
    };
  }
}


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

export async function fetchProjects() {
  try {
    const { rows } = await sql`SELECT * FROM projects ORDER BY updated_at DESC`;
    if (rows.length != 0) {
      return { message: "success", data: rows, status: 200 };
    }
    return { message: "Projects not found", status: 404 };
  } catch {
    return { message: "Server Error", status: 500 };
  }
}
