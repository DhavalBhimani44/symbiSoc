import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const verifyToken = (request: NextRequest) => {
    try {
        const secretKey = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(secretKey, process.env.TOKEN_SECRET!);
        console.log("decoded token data: ", decodedToken);
        return decodedToken;
    } catch (error: any) {
        console.log("Error decoding token: ", error);
        throw new Error(error.message);
    }
}