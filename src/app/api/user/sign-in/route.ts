import { FormSchema } from "@/app/validationSchema";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const JWT_SECRET = 'your_hardcoded_secret_key';

        const validation = FormSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        const email = await db.user.findUnique({
            where: {
                email: body.email
            }
        })
        if(!email){
            return NextResponse.json({error: "Email does not exist"}, {status: 400})
        }
        console.log("Email exists")

        const passwordMatch = await compare(body.password, email.password);
        if (!passwordMatch) {
            console.log("Incorrect password!");
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = sign({ emailId: email.id }, JWT_SECRET, {
            expiresIn: "30min",
        });
  
        return NextResponse.json({ token, email }, { status: 200 });
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}