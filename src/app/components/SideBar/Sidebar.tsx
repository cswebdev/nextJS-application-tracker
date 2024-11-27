"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavLinkMenu from "./SideBarNavMenu";
// import { Home, LogOutIcon, Settings, UserCircle } from "lucide-react";
// import WebLogo from "../../../../public/pie-chart-svgrepo-com.svg";

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
      <>
         <>
            {/* <section className="w-full relative flex flex-col  p-0 size-20 bg-blue-200 object-contain">
               <div className="absolute top-0 items-start object-scale-down">
                  <WebLogo<any> />
               </div>
               <h1>Website Title</h1>
            </section> */}
            <div className="h-full w-full bg-neutral-50 overflow-hidden ">
               <div className="ml-8 flex h-full flex-col text-neutral-700 font-light ">
                  <div className="my-10 flex h-full flex-col ">
                     <section className="">
                        <NavLinkMenu />
                     </section>
                     <div className="my-10">
                        <div className="my-1 flex text-lg">
                           Total applications: {totalApps}
                        </div>
                        <button className="mt-2">
                           <Link
                              href="/submit-application"
                              className="mt-4 ring-2 ring-neutral-600 px-4 py-2 rounded-md"
                           >
                              Submit application
                           </Link>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      </>
   );
};

export default Sidebar;
