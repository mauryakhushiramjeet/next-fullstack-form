import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
interface JwtPayloadtype extends JwtPayload {
  userId: string;
}
export async function getTokenData(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "token not exist" });
    }
    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRETE_KEY as string
    ) as JwtPayloadtype;
    return decodeToken.userId;
  } catch (error) {
    console.log(error);
  }
}
