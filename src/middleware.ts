import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path == "/login" || path == "/signup";
  const token = request.cookies.get("token");
  console.log(token);
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard"],
};
