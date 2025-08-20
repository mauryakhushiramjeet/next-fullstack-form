import { createToken } from "@/app/middleware/createToken";
import { databaseConection } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    await databaseConection();
    if (!email || !password) {
      return NextResponse.json(
        JSON.stringify({ success: false, error: "Please fill all the field" })
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        JSON.stringify({ success: false, error: "User does't exist!" })
      );
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({
        success: false,
        error: "Password does't match",
      });
    }
    const token = createToken(user._id);
    const response = NextResponse.json({
      success: true,
      message: "User login successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set({
      name: "token",
      value: token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
