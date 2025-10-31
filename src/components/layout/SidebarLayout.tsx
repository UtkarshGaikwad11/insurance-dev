"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Menu, 
  X,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Shield
} from "lucide-react";
import { Button } from "../ui/button";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Policies", href: "/policies", icon: <FileText size={20} /> },
    // { name: "Customers", href: "/customers", icon: <Users size={20} /> },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-72" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out fixed h-screen z-40 shadow-sm`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className={`flex items-center gap-3 ${!open && "justify-center w-full"}`}>
            <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {open && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">InsureHub</h1>
                <p className="text-xs text-gray-500">Management Portal</p>
              </div>
            )}
          </div>
          {open && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8"
            >
              <ChevronLeft size={18} />
            </Button>
          )}
        </div>

        {/* Collapsed Toggle Button */}
        {!open && (
          <div className="flex justify-center py-4 border-b border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  active
                    ? "bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!open && "justify-center"}`}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-blue-600 to-purple-600 rounded-r-full" />
                )}
                
                <div className={`${active ? "text-blue-600" : "text-gray-600 group-hover:text-gray-900"}`}>
                  {item.icon}
                </div>
                
                {open && (
                  <span className={`font-medium text-sm ${active ? "text-blue-700" : ""}`}>
                    {item.name}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {!open && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className={`flex items-center gap-3 ${!open && "justify-center"}`}>
            {open ? (
              <>
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">john@example.com</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 flex-shrink-0"
                  title="Logout"
                >
                  <LogOut size={16} />
                </Button>
              </>
            ) : (
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:scale-105 transition-transform">
                JD
              </div>
            )}
          </div>
        </div> */}
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 ${open ? "ml-72" : "ml-20"} transition-all duration-300`}>

     
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}