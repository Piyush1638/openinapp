import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Set the credentials in a cookie
  const response = NextResponse.json({ message: "Signup successful" });
  
  // Store the email and password in cookies
  response.cookies.set('email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  response.cookies.set('password', password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}
