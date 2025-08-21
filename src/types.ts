export interface LoginType{
  email:string,
  password:string
}
export interface SignupType extends LoginType{
name:string
}
export type userTypeSignup = {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
};
