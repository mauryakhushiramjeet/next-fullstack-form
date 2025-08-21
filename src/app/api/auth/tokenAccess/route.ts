import { getTokenData } from "@/app/helpers/getTokenData";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId =await getTokenData(req);
    const user = await User.findById({ _id: userId }).select("-password")
    if (!user) {
      return NextResponse.json({ success: false, error: "user not exist" })
    }
    return NextResponse.json({success:true,user,message:`Welcom ${user.name}`})
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
