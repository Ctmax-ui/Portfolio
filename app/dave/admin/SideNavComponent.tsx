"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SignOutBtn from "./utils/SignOutBtn";
import MotionThemeChangerBtn from "@/app/ui/smallUi/MotionThemeChangerBtn";
import { TiHome } from "react-icons/ti";

const SideNavComponent = ({
  routes,
}: {
  routes: { href: string; name: string }[];
}) => {
  const pathname = usePathname();
  return (
    <>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarMenu className="px-2">
            {routes.map((item) => {
              const isActive = pathname === item.href;
              return(
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={`w-full h-full py-2 px-2 block rounded-sm border ${
                      isActive ? "border-slate-500 " : "border-transparent"
                    } `}
                  >
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )})}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex justify-between items-center gap-2">
            <button className="text-sm w-full font-medium border border-black dark:border-white rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              <Link
                className="flex items-center justify-center gap-2 px-4 py-3"
                href="/"
              >
                <TiHome className="h-5 w-5" />
                <span className="">Go Home</span>
              </Link>
            </button>
            <MotionThemeChangerBtn className="bg-emerald-500 rounded-sm px-3 py-3 w-fit " />
          </div>
          <SignOutBtn />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
export default SideNavComponent;
