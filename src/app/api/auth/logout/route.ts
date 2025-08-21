import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "logout successfully",
    });
    response.cookies.delete({name:"token"});
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "error in logout" });
  }
}
