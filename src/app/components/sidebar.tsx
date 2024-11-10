"use client";

import { dummyData } from "@/data/dummyData";
import Link from "next/link";
// import { useState } from "react";

export const Sidebar = () => {
   return (
      <div className="h-full w-full bg-blue-500">
         <div className="ml-8 flex h-full flex-col text-white">
            <div className="my-10 flex h-full flex-col align-middle">
               <Link href="/" className="my-2 pl-1 text-2xl">
                  Home
               </Link>
               <Link href="/reports" className="my-2 pl-1 text-2xl">
                  s Reports
               </Link>
               <Link href="/account_settings" className="my-2 pl-1 text-2xl">
                  Settings
               </Link>
               <Link href="/help_support" className="my-2 pl-1 text-2xl">
                  Help & Support
               </Link>
               <Link href="/about" className="my-2 pl-1 text-2xl">
                  About
               </Link>
               <div className="my-10">
                  <div className="my-1 flex text-lg">
                     Current applications: {dummyData.length}
                  </div>
                  {/* <button className="mt-8 rounded-md px-4 py-2 font-bold ring-2 ring-white">
                     Logout
                  </button> */}
               </div>
            </div>
         </div>
      </div>
   );
};
