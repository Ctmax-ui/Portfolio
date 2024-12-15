import Link from "next/link";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" overflow-hidden h-screen w-screen">
        <header className="border-b py-4 px-3">
          <Link href="/" className="border px-2 py-2">
            Go back
          </Link>
        </header>
        <div className="flex h-full">
          <nav className="border-e border-black/80 w-1/4">
            <ul className="w-full flex flex-col">
              <li className="border-b w-full py-2 px-2">
                <Link href="/dave/admin/">home</Link>
              </li>
              <li className="border-b w-full py-2 px-2">
                <Link href="/dave/admin/blogs">blogs</Link>
              </li>
              <li className="border-b w-full py-2 px-2">
                <Link href="/dave/admin/project">project</Link>
              </li>
            </ul>
          </nav>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
