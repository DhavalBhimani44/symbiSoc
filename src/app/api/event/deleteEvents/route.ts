import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export default async function DELETE(req: NextRequest) {
  if (req.method === 'DELETE') {
    try {
      const body = await req.json();
      // Extract event ID from request body
      const { eventId } = body;

      // Delete the event from the database
      await db.createEvent.delete({
        where: {
          eventId: parseInt(eventId),
        },
      });

      return NextResponse.json(
        { message: 'Event deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting event:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    );
  }
}
