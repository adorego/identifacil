// middleware.js
import { NextResponse } from 'next/server';

// @ts-ignore
export function middleware(request) {
    const url = request.nextUrl.clone();
    // You can log the url to see its structure and available properties
    // console.log('Middleware URL:', url);

    // Add the current URL to the request headers
    request.headers.set('x-current-url', url.pathname);

    return NextResponse.next({
        request: {
            headers: request.headers,
        },
    });
}

export const config = {
    matcher: '/:path*', // Apply middleware to all paths
};