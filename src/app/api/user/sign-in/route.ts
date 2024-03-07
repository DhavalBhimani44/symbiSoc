import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);

        const existingUser = await db.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!existingUser) {
            console.log("Email does not exist! Please sign up");
            return NextResponse.json({ message: 'Email does not exist' }, { status: 404 });
        }

        console.log("User exists");

        const validPassword = await bcryptjs.compare(body.password, existingUser.password);

        if (!validPassword || body.userType !== existingUser.userType) {
            console.log("Invalid credentials");
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            userType: existingUser.userType,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' });

        const response = NextResponse.json({
            message: 'Sign-in successful',
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                userType: existingUser.userType,
            },
        }, { status: 201 });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.error("Error during sign-in:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}