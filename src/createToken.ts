import jwt from "jsonwebtoken";

export const createToken = (userId:string) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRETE_KEY as string, 
    { expiresIn: "1h" }
  );
 return token
};