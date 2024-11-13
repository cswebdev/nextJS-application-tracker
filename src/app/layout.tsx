// src/app/layout.tsx

import Sidebar from "./components/SideBar/Sidebar";
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body className="h-screen flex">
            {/* Sidebar */}
            <aside className="w-1/5 shadow-md shadow-slate-800">
               <Sidebar />
            </aside>

            {/* Main content area where dynamic pages are rendered */}
            <main className="w-4/5 h-full overflow-y-auto">{children}</main>
         </body>
      </html>
   );
}
