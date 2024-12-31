import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutBtn from "./utils/SignOutBtn";
import MotionThemeChangerBtn from "@/app/ui/smallUi/MotionThemeChangerBtn";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
        <div className=" overflow-hidden h-screen w-screen">
          <header className="border-b py-4 px-3 flex justify-between ">
            <Link href="/" className="border px-2 py-2">
              Go back
            </Link>
            <MotionThemeChangerBtn />
            <SignOutBtn />
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
