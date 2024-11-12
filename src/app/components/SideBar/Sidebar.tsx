"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ApplicationForm from "../ApplicationForm/ApplicationForm";

interface SidebarProps {
   totalApplications?: number;
}

const Sidebar = ({ totalApplications }: SidebarProps) => {
   const [totalApps, setTotalApps] = useState<number>(totalApplications || 0);

   useEffect(() => {
      const fetchTotalApplications = async () => {
         try {
            const response = await fetch("/api/totalApplications");

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.totalApplications) {
               setTotalApps(data.totalApplications);
            } else {
               console.warn(
                  "Total applications data is missing or invalid:",
                  data
               );
            }
         } catch (error) {
            console.error("Error fetching total applications:", error);
         }
      };

      if (!totalApplications) {
         fetchTotalApplications();
      }
   }, [totalApplications]);

   return (
      <div className="h-full w-full bg-blue-500">
         <div className="ml-8 flex h-full flex-col text-white">
            <div className="my-10 flex h-full flex-col align-middle">
               <Link href="/" className="my-2 pl-1 text-2xl">
                  Home
               </Link>
               <Link href="/reports" className="my-2 pl-1 text-2xl">
                  Reports
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
                     Total applications: {totalApps}
                  </div>
                  <button className="mt-2">
                     <Link
                        href="/submit-application"
                        className="mt-4 ring-2 ring-white px-4 py-2 rounded-md"
                     >
                        Submit application
                     </Link>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
