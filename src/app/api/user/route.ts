import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request){
    try {
        const body = await req.json()
        const { email, password, username } = body;

        // Check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        })
        if(existingUserByEmail){
            return NextResponse.json({message: "Email already exists"}, {status: 409})
        }

        // Check if username already exists
        const existingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        })
        if(existingUserByUsername){
            return NextResponse.json({message: "Username already exists"}, {status: 409})
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        })

        return NextResponse.json({user: newUser, message: "User created successfully"}, {status: 201});
    } catch (error) {
        console.log("Error: ", error)
    }
}
