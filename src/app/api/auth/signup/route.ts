import User, { UserShape } from "@/models/User";
import bcrypt from "bcrypt";
import { databaseConection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  try {
    databaseConection();
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: "Please fill all the field",
      });
    }
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
      return NextResponse.json({ success: false, error: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const userData: UserShape = {
      name,
      email,
      password: hashPassword,
      isVerified: false,
    } as UserShape;
    const user = new User(userData);
    await user.save();
    return NextResponse.json({
      success: true,
      message: "user signup successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return (
      NextResponse.json({ success: false, error: "Something went wrong",errorMessage:error }),
      { status: 500 }
    );
  }
}
