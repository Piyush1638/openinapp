import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isLoginPage = pathName === "/login";

  // Retrieve cookies
  const email = request.cookies.get("email")?.value;
  const password = request.cookies.get("password")?.value;

  // Check if the user is on the login or signup page
  if (!email || !password) {
    // If no email or password cookies are found and the user is not on login/signup page, redirect to login
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If email and password cookies are present and user is on login/signup page, redirect to home
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow the request to continue if no redirects are necessary
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/"],
};
