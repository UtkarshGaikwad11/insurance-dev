import "./globals.css";
import { ReactNode } from "react";
import { ReduxProvider } from "./redux-provider";
import SidebarShell from "@/components/SidebarShell";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SidebarShell>{children}</SidebarShell>
          <Toaster position="top-center" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
