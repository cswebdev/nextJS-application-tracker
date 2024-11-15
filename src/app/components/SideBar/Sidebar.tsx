"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavLinkMenu from "./SideBarNavMenu";
import { Home, LogOutIcon, Settings, UserCircle } from "lucide-react";
import WebLogo from "../../../../public/pie-chart-svgrepo-com.svg";

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
            <div className="h-full w-full bg-red-50 overflow-hidden ">
               <div className="ml-8 flex h-full flex-col text-neutral-700 font-light ">
                  <div className="my-10 flex h-full flex-col  justify-center">
                     <Link href="/" className="my-2 pl-1 text-2xl">
                        <div className="flex flex-row items-center">
                           <span>
                              <Home />
                           </span>
                           <h1 className="pl-2">Home</h1>
                        </div>
                     </Link>
                     {/* how do I change this sections height depending on if NavLinkMenu is active and expanded?  */}
                     <section className="h-1/4">
                        <NavLinkMenu />
                     </section>
                     <section className="">
                        <div className="flex flex-row items-center mb-2">
                           <span>
                              <UserCircle />
                           </span>
                           <h2 className="text-2xl pl-2">Account</h2>
                        </div>
                        <div className="ml-9">
                           <div className="flex flex-row items-center mb-2">
                              <span>
                                 <Settings size={18} />
                              </span>
                              <Link href="settings" className="pl-2">
                                 Settings
                              </Link>
                           </div>
                           <div className="flex flex-row items-center">
                              <span>
                                 <LogOutIcon size={18} />
                              </span>
                              <div className="pl-2">Logout</div>
                           </div>
                        </div>
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
