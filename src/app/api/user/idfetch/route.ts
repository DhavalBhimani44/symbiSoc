import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/verifyToken";

export async function GET(request: NextRequest) {
    try {
        const userId = await verifyToken(request);
        const user = await db.user.findOne({userId: userId}).select("-password");
        return NextResponse.json({
            message: "User FOund",
            data: user,
        })
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 400});
    }
}