import { db } from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const events = await db.createEvent.findMany();
        return NextResponse.json(events, {status:200});
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}