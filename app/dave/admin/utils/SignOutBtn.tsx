"use client";
import { signOut } from "next-auth/react";
const SignOutBtn = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
};
export default SignOutBtn;