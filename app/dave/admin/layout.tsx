import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SideNavComponent from "./SideNavComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
      <div className="">
        <SidebarProvider>
          <SideNavComponent routes={routes} />
          <main className="p-3 w-full">
            <SidebarTrigger className="fixed bg-slate-500 text-white hover:bg-slate-600 hover:text-slate-300" />
            <div className="mt-10">{children}</div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
