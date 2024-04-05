import { db } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const userData = verifyToken(request);
        const userId = userData.userId;
        
        console.log("user id: ",userId);
        const username = userData?.username;
        console.log("user name: ",username);

        const eventData = await db.createEvent.findUnique({
            where: {
                eventId: body.eventId
            },
            select: {
                eventId: true,
                eventName: true,
                eventDescription: true,
                organisingClub: true
            }
        });
        console.log("Event data isssssssssssss: ", eventData)
        const eventId = eventData?.eventId
        const eventName = eventData?.eventName

        if (!eventData) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        // Check if the user has already registered for the event
        const existingRegistration = await db.eventRegistration.findFirst({
            where: {
                userId: userId,
                eventId: eventId
            }
        });

        if (existingRegistration) {
            return NextResponse.json({ message: "User has already registered for this event" }, { status: 400 });
        }

        // Create the event registration using userId and eventId
        try {
            const newRegistration = await db.eventRegistration.create({
                data: {
                    userId: userId,
                    eventId: eventId,
                    eventName: eventName,
                    username: username
                }
            });
    
            return NextResponse.json({ registration: newRegistration, message: "User registered for event successfully" }, { status: 201 });
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
