"use client";

import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Toaster } from "sonner"; // ✅ Sonner Toaster

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noSidebarRoutes = ["/login", "/signup"];
  const hideSidebar = noSidebarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {hideSidebar ? children : <SidebarLayout>{children}</SidebarLayout>}
          {/* ✅ Add Sonner Toaster here */}
          <Toaster
            position="top-center"
            richColors
          />
        </Provider>
      </body>
    </html>
  );
}
