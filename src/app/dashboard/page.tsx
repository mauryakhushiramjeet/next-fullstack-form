"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function Dashborad() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get("api/auth/logout");
      console.log(response.data);
      router.push("/login");
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserDetails = async () => {
    try {
      // tokenAccess
      const response = await axios.get("/api/auth/tokenAccess");
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
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
}
export default Dashborad;
