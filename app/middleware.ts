import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected routes that require authentication
  const protectedRoutes = [
    "/dashboard", 
    "/bookings", 
    "/profile", 
    "/admin", 
    "/checkout"
  ];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // Redirect logic for protected routes
  if (isProtectedRoute && !token) {
    // Instead of redirecting to login page, we'll redirect to home page
    // The auth modal can be opened programmatically from there
    return NextResponse.redirect(new URL("/?authRequired=true", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};