import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Retrieve the stored credentials from cookies
  const storedEmail = request.cookies.get("email")?.value;
  const storedPassword = request.cookies.get("password")?.value;

  // Check if the cookies exist
  if (!storedEmail || !storedPassword) {
    return NextResponse.json(
      { message: "No user found. Please sign up first." },
      { status: 401 }
    );
  }

  // Validate the credentials
  if (storedEmail === email && storedPassword === password) {
    return NextResponse.json({ message: "Login successful" });
  } else {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }
}
