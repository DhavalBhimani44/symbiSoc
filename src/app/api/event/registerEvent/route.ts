import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);

        const userId = request.headers.userId; // Adjust this according to your application
        console.log(userId);

        const event = await db.createEvent.findUnique({
            where: {
                eventId: body.eventId
            }
        });

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        // Check if the user has already registered for the event
        const existingRegistration = await db.eventRegistration.findFirst({
            where: {
                userId: userId,
                eventId: event.eventId
            }
        });

        if (existingRegistration) {
            return NextResponse.json({ message: "User has already registered for this event" }, { status: 400 });
        }

        // Create the event registration using userId and eventId
        const newRegistration = await db.eventRegistration.create({
            data: {
                user: {
                    connect: {
                        userId: userId
                    }
                },
                event: {
                    connect: {
                        eventId: event.eventId
                    }
                },
                userId: userId,
                eventName: event.eventName
            }
        });

        return NextResponse.json({ registration: newRegistration, message: "User registered for event successfully" }, { status: 201 });
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
