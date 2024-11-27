// src/app/layout.tsx
"use client";
import Sidebar from "./components/SideBar/Sidebar";
import "./globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
   const pathname = usePathname();

   // Define the pages where Sidebar should not appear
   const noSidebarPages = ["/login", "/register"];

   // Check if the current page is in the noSidebarPages array
   const shouldHideSidebar = noSidebarPages.includes(pathname);

   return (
      <html lang="en">
         <body className="h-screen flex bg-slate-200/50">
            {/* Conditionally render Sidebar */}
            {!shouldHideSidebar && (
               <aside className="w-1/4 shadow-md shadow-slate-800">
                  <Sidebar />
               </aside>
            )}

            {/* Main content area where dynamic pages are rendered */}
            <main className="w-full h-full overflow-y-auto">{children}</main>
         </body>
      </html>
   );
}
