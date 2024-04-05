import { db } from "@/lib/db";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {        
        const userData = verifyToken(request);
        const userId = userData.userId;

        // Fetch events associated with the user, including additional event details
        const events = await db.eventRegistration.findMany({
            where: {
                userId: userId
            },
            include: {
                event: {
                    select: {
                        eventId: true,
                        eventName: true,
                        eventDescription: true,
                        organisingClub: true
                        // Include other fields as needed
                    }
                }
            }
        });

        // Extract the event details from the joined query results
        const formattedEvents = events.map(event => ({
            eventId: event.event.eventId,
            eventName: event.event.eventName,
            eventDescription: event.event.eventDescription,
            organisingClub: event.event.organisingClub
            // Map other fields as needed
        }));

        return NextResponse.json(formattedEvents, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
