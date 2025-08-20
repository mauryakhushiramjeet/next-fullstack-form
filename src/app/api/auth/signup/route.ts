import User, { UserShape } from "@/models/User";
import bcrypt from "bcrypt";
import { databaseConection } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  try {
    databaseConection();
    if (!name || !email || !password) {
        JSON.stringify({ success: false, Error: "Please fill all the field" })
    }
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
        JSON.stringify({ success: false, Error: "User already exist" })
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
    return new Response(
      JSON.stringify({
        success: true,
        message: "user signup successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    );
  }catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong" }),
      { status: 500 }
    );
  }
}
