"use client";
import { useRouter } from "next/router";
import { TiHome } from "react-icons/ti";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-nowrap flex-nowrap"
      onClick={() => router.back()}
    >
      <TiHome className="h-4 w-4" />
      <span className="hidden md:block">Go Back</span>
    </button>
  );
};

export default GoBackButton;
