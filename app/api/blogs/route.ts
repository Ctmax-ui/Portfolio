"use server";

import { sql } from "@vercel/postgres";

export async function GET() {

    try {

        const data = await sql`
        SELECT * FROM blogs
        `
        
        
        // console.log(data);

        return Response.json({ message: "success", data:data.rows }, { status: 200 });

        
    } catch (error) {
        return Response.json({message:error},{status:500})
    }


}
