import { model, models, Schema } from "mongoose";
export interface UserShape extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;

}
const userSchema = new Schema<UserShape>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const User = models.User<UserShape> || model<UserShape>("User", userSchema);
export default User;
