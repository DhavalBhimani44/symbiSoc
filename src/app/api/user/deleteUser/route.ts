import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(req: NextRequest) {
  if (req.method === 'DELETE') {
    try {
      const body = await req.json();
      
      if (!body.userId) {        
        return NextResponse.json(
          { message: 'userId is missing in the request body' },
          { status: 400 }
        );
      }

      const userId = parseInt(body.userId);

      const registrationData = await db.eventRegistration.findMany({
        where: {
          userId: userId,
        }
      });

      if (registrationData.length === 0) {
        return NextResponse.json(
          { message: 'No registrations found for the given eventId' },
          { status: 404 }
        );
      }

      for (const registration of registrationData) {
        console.log('registration id: ', registration.registrationId);

        await db.eventRegistration.delete({
          where: {
            registrationId: registration.registrationId,
          },
        });
      }
      
      await db.User.delete({
        where: {
          userId: userId,
        },
      });

      return NextResponse.json(
        { message: 'User deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting User:', error);
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
