"use client";

import { useState } from "react";
import { signupType } from "@/types";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
function SignuPage() {
  const [userDetails, setUserDeatils] = useState<signupType>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userDetails.email.trim() === "" ||
      userDetails.name.trim() === "" ||
      userDetails.password.trim() === ""
    )
      return;

    try {
      const res = await axios.post("/api/auth/signup", userDetails);
      if (res.data.success) {
        router.push("/login");
        setUserDeatils({
          name: "",
          email: "",
          password: "",
        });
      }
      console.log(res.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="border bg-gray-200 rounded-lg">
      <p className="text-center text-2xl font-bold my-3">Sign Up</p>
      <form onSubmit={handleSignup}>
        <div className="flex flex-col gap-2 p-10 items-center justify-center w-full">
          <input
            type="text"
            className="p-2 outline-none border border-black rounded-lg"
            placeholder="user name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDeatils({ ...userDetails, name: e.target.value })
            }
          />
          <input
            type="text"
            className="p-2 outline-none border border-black rounded-lg"
            placeholder="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDeatils({ ...userDetails, email: e.target.value })
            }
          />
          <input
            type="text"
            className="p-2 outline-none border border-black rounded-lg"
            placeholder="password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDeatils({ ...userDetails, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-black rounded-lg cursor-pointer text-md mt-2 text-white px-5 py-2"
          >
            signup
          </button>
          <p>
            Already had a account ?{" "}
            <Link href={"/login"}>
              <span className="text-blue-600 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default SignuPage;
