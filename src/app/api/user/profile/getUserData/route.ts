import { db } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {        
        const userData = verifyToken(request);
        return NextResponse.json( userData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}