"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

 function Dashborad() {
    const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("api/auth/logout");
      console.log(response.data);
      router.push("/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer text-sm rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default Dashborad

