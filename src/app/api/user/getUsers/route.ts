import { db } from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {   
        const users = await db.user.findMany();
        return NextResponse.json(users, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}