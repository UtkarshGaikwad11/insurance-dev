"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, Users, Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Policies", href: "/policies", icon: <FileText size={20} /> },
    { name: "Customers", href: "/customers", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-gray-900 text-white p-4 transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-lg font-bold ${!open && "hidden"}`}>Insurance</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="text-white"
          >
            <Menu size={22} />
          </Button>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition"
              >
                {item.icon}
                {open && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
