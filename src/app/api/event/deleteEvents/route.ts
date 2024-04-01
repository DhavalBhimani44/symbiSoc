import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(req: NextRequest) {
  if (req.method === 'DELETE') {
    try {
      const body = await req.json();
      
      if (!body.eventId) {        
        return NextResponse.json(
          { message: 'eventId is missing in the request body' },
          { status: 400 }
        );
      }

      const eventId = parseInt(body.eventId);
      
      await db.createEvent.delete({
        where: {
          eventId: eventId,
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
