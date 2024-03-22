import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);
    } catch (error) {
        console.error('Error registering event:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}