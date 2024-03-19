import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId, eventId } = request.body;

        // Check if the user is already registered for the event
        const existingRegistration = await db.eventRegistration.findFirst({
            where: {
                userId,
                eventId,
            },
        });

        if (existingRegistration) {
            return NextResponse.json({ error: 'User is already registered for this event' }, { status: 400 });
        }

        // Create a new event registration
        const newRegistration = await db.eventRegistration.create({
            data: {
                userId,
                eventId,
            },
        });

        return NextResponse.json(newRegistration, { status: 201 });
    } catch (error) {
        console.error('Error registering event:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}