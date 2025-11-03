"use client"
import { usePathname } from "next/navigation"
import SidebarLayout from "@/components/layout/SidebarLayout"

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noSidebarRoutes = ["/login", "/signup"]
  const hideSidebar = noSidebarRoutes.includes(pathname)

  return hideSidebar ? children : <SidebarLayout>{children}</SidebarLayout>
}
