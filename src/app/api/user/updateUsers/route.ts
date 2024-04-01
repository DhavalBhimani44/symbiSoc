import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(req: NextRequest) {
    if (req.method === 'PUT') {
        try {
            const { userId, username, email, userType } = await req.json();

            if (!userId) {
                return NextResponse.json(
                    { message: 'Missing userId' },
                    { status: 400 }
                );
            }

            const updatedUser = await db.user.update({
                where: {
                    userId: parseInt(userId),
                },
                data: {
                    username: username,
                    email: email,
                    userType: userType,
                },
            });

            return NextResponse.json(
                { message: 'User updated successfully', data: updatedUser },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error updating user:', error);
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