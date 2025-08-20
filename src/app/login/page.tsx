"use client";

import { useState } from "react";
import { signupType } from "@/types";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
function LoginPage() {
  const [userDetails, setUserDeatils] = useState<signupType>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userDetails.email.trim() === "" || userDetails.password.trim() === "") {
      alert("Please fill the form");
    }
    console.log("button click");

    try {
      const res = await axios.post("/api/auth/login", userDetails);
      if (res.data.success) {
        router.push("/dashboard");
        setUserDeatils({
          email: "",
          password: "",
        });
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border bg-gray-200 rounded-lg">
      <p className="text-center text-2xl font-bold my-3">Log In</p>
      <form onSubmit={handlelogin}>
        <div className="flex flex-col gap-2 p-10 items-center justify-center w-full">
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
            Login
          </button>
          <p>
            Create ne account?{" "}
            <Link href={"/signup"}>
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
export default LoginPage;
