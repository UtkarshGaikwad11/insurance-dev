"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <SidebarLayout>{children}</SidebarLayout>
        </Provider>
      </body>
    </html>
  );
}
