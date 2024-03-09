import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/sign-in', '/sign-up', '/'].includes(path);
    const token = request.cookies.get('token')?.value || "";

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/unauthorized', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/home',
        '/student',
        '/incharge',
        '/faculty',
        '/admin',
    ],
};