"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const SideNavComponent = ({
  routes,
}: {
  routes: { href: string; name: string }[];
}) => {
  const pathname = usePathname();
  return (
    <ul className="w-full flex flex-col">
      {routes.map((v, k) => {
        const isActive = pathname === v.href;
        return (
          <li
            key={k}
            className={`border-b dark:border-slate-400 w-full ${
              isActive ? "bg-black text-white" : ""
            }`}
          >
            <Link href={v.href} className="w-full h-full py-2 px-2 block">
              {v.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default SideNavComponent;