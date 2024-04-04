import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { FormSchema } from "@/app/validationSchema";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const validation = FormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUserByEmail) {
      console.log("Email already exists!");
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (existingUserByUsername) {
      console.log("Username already exists!");
      return NextResponse.json({ message: "Username already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(body.password, 10);

    const newUser = await db.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashedPassword,
        userType: body.userType,
      },
    });

    return NextResponse.json({ user: newUser, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}