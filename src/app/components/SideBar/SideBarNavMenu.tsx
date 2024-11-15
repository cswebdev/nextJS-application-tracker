"use client";
import {
   BriefcaseBusiness,
   ChartAreaIcon,
   ChevronDown,
   ChevronUp,
   Layout,
   Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavLinkMenu() {
   const [isOpen, setIsOpen] = useState(false);
   const pathname = usePathname(); // Get current route path

   const toggleMenu = () => {
      setIsOpen((prev) => !prev);
   };

   const toggleActiveMenuStyle = (isActive: boolean) => {
      return isActive ? "bg-blue-500 text-white" : "text-neutral-800";
   };

   const toggleActiveChevron = (isActive: boolean) => {
      return isActive ? <ChevronDown /> : <ChevronUp />;
   };

   const isLinkActive = (linkPath: string) => {
      return pathname === linkPath
         ? "text-neutral-900 border-l-2 border-blue-500 pl-1"
         : "text-neutral-600 font-light pl-1";
   };

   const isLinkActiveIcon = (linkPath: string) => {
      return pathname === linkPath;
   };

   return (
      <div className="relative h-fit">
         <div className="">
            <button
               id="menu-button"
               className={`${toggleActiveMenuStyle(
                  isOpen
               )} r-2 pl-1 top-0 absolute py-2 flex flex-row w-full rounded-tl-md rounded-bl-md items-center`}
               onClick={toggleMenu}
            >
               <span>
                  <BriefcaseBusiness />
               </span>
               <div className="flex justify-between w-full items-center">
                  <h3 className="ml-2 text-2xl">Application Center</h3>
                  <div className="mr-2">{toggleActiveChevron(isOpen)}</div>
               </div>
            </button>
            {isOpen && (
               <div
                  id="dropdown-menu"
                  className="ml-9 top-11 absolute w-full"
                  role="menu"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
               >
                  <div className="flex flex-col items-start justify-between mt-3 w-full">
                     <Link href="/dashboard">
                        <button
                           id="menu-item"
                           className={`${isLinkActive(
                              "/dashboard"
                           )} mb-5 flex flex-row items-center`}
                        >
                           <span>
                              <Layout size={18} />
                           </span>
                           <span className="pl-2">Dashboard</span>
                        </button>
                     </Link>
                     <Link href="/goals">
                        <button
                           id="menu-item"
                           className={`${isLinkActive(
                              "/goals"
                           )} mb-5 flex flex-row items-center`}
                        >
                           <span>
                              <Trophy size={18} />
                           </span>
                           <span className="pl-2">View Goals</span>
                        </button>
                     </Link>
                     <Link href="/analytics">
                        <button
                           id="menu-item"
                           className={`${isLinkActive(
                              "/analytics"
                           )} mb-5 flex flex-row items-center`}
                        >
                           <span>
                              <ChartAreaIcon size={18} />
                           </span>
                           <span className="pl-2">Analytics</span>
                        </button>
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
