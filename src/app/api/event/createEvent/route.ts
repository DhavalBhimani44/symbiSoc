import { db } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);

        const newEvent = await db.createEvent.create({
            data: {
                eventName: body.eventName,
                eventDescription: body.eventDescription,
                organisingClub: body.organisingClub,
                eventDate: body.eventDate,
                eventTime: body.eventTime,
                eventVenue: body.eventVenue,
                eventPlatform: body.eventPlatform,
                speakerName: body.speakerName,
                speakerDesignation: body.speakerDesignation,
                speakerDescription: body.speakerDescription,
                eventType1: body.eventType1,
                eventType2: body.eventType2,
            },
        });

        return NextResponse.json({ event: newEvent, message: "Event created successfully" }, {status: 201});
    } catch (error) {
        console.error("An error occured:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}