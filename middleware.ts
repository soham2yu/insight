import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /api/users, /api/properties)
  const path = request.nextUrl.pathname;

  // Define protected API routes
  const protectedApiRoutes = [
    '/api/users',
    '/api/properties',
    '/api/tenants',
    '/api/leases',
    '/api/maintenance',
    '/api/analytics'
  ];

  // Check if the current path is a protected API route
  const isProtectedApiRoute = protectedApiRoutes.some(route =>
    path.startsWith(route)
  );

  if (isProtectedApiRoute) {
    // For API routes, we'll rely on Firebase Auth tokens being validated in the API handlers
    // The middleware here can add additional checks if needed

    // Add CORS headers for API routes
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }

  // For non-API routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
