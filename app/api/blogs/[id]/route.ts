import { sql } from "@vercel/postgres";

export async function GET(req:Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop()?.toString();
    const {rows} = await sql`SELECT * FROM blogs WHERE id=${id}`
    console.log(rows.length);
    if(rows.length != 0){
        return Response.json({ message: "success", rows:rows }, { status: 200 });
    }
    return Response.json({ message: "foung nothing" }, { status: 404 });
  } catch(err) {
    console.log(err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
