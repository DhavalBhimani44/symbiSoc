import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Body: ", body)
    const eventId = parseInt(body.eventId);
    console.log(eventId)
    const events = await db.createEvent.findMany({
        where:{
            eventId:eventId
        }
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
