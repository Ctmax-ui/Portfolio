import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutBtn from "./utils/SignOutBtn";
import MotionThemeChangerBtn from "@/app/ui/smallUi/MotionThemeChangerBtn";
import { TiHome } from "react-icons/ti";
import SideNavComponent from "./SideNavComponent";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const routes = [
    { href: "/dave/admin", name: "Home" },
    { href: "/dave/admin/blogs", name: "Blogs" },
    { href: "/dave/admin/project", name: "Projects" },
  ];

  return (
    <>
      <div className=" overflow-hidden h-screen w-screen">
        <header className="border-b dark:border-slate-400 py-4 px-3 flex justify-between ">
          <button className="text-sm font-medium transition-colors border border-black dark:border-white rounded-full md:rounded-sm py-1 md:p-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
            <Link
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-nowrap flex-nowrap"
              href="/"
            >
              <TiHome className="h-4 w-4" />
              <span className="hidden md:block">Go Home</span>
            </Link>
          </button>

          <MotionThemeChangerBtn />
          <SignOutBtn />
        </header>
        <div className="flex h-full">
          <nav className="border-e border-black/80 dark:border-slate-400 w-1/4">
            <SideNavComponent routes={routes} />
          </nav>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
