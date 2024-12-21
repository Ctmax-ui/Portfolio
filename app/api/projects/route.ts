import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM projects ORDER BY updated_at DESC`;
    console.log(data);
    return Response.json({ message: "success", data: data.rows, }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "500 internal server error" }, { status: 500 });
  }
}
