import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login'
  
  // Check if user is logged in (via cookie)
  const isAuthenticated = request.cookies.has('admin_authenticated')
  
  // Redirect logic
  if (!isPublicPath && !isAuthenticated) {
    // Redirect to login if trying to access protected pages without auth
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (isPublicPath && isAuthenticated) {
    // Redirect to dashboard if already logged in and trying to access login page
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

// Configure the paths this middleware runs on
export const config = {
  matcher: ['/', '/login']
} 