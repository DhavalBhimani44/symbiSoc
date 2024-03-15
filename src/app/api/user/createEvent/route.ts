import { db } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";
import { eventSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);

        const validation = eventSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(validation.error.errors, {status: 400});
        }

        const newEvent = await db.createEvent.create({
            data: {
                eventName: body.eventName,
                eventDescription: body.eventDescription,
                organisingClub: body.organisingClub,
            },
        });

        return NextResponse.json({ event: newEvent, message: "Event created successfully" }, {status: 201});
    } catch (error) {
        console.error("An error occured:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}