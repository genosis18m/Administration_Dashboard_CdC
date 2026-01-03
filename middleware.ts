import { auth } from "@/lib/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/admin')) {
    const newUrl = new URL('/login', req.nextUrl)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}