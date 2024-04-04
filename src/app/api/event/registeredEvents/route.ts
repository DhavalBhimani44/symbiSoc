import { db } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {        
        console.log('entered registered events fetching process!');
        const userData = await verifyToken(request);
        const userId = userData.userId;
        console.log("user id: ", userId);
        const username = userData.username;
        console.log("user name: ", username);

        const events = await db.eventRegistration.findMany({
            where: {
                userId: userId
            }
        });
        console.log("registered events: ", events);
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}