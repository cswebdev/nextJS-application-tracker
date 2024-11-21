// src/app/layout.tsx

import Sidebar from "./components/SideBar/Sidebar";
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body className="h-screen flex bg-slate-200/50">
            {/* Sidebar */}
            <aside className="w-1/4 shadow-md shadow-slate-800">
               <Sidebar />
            </aside>

            {/* Main content area where dynamic pages are rendered */}
            <main className="w-full h-full overflow-y-auto">{children}</main>
         </body>
      </html>
   );
}
