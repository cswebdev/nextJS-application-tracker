"use client";
import {
   BriefcaseBusiness,
   ChartAreaIcon,
   ChevronDown,
   ChevronUp,
   Home,
   Layout,
   LogOutIcon,
   Settings,
   Trophy,
   UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavLinkMenu() {
   const [isOpen, setIsOpen] = useState(false);
   const pathname = usePathname();

   const toggleMenu = () => {
      setIsOpen((prev) => !prev);
   };

   const toggleActiveMenuStyle = (isActive: boolean) => {
      return isActive ? "text-neutral-800" : "text-neutral-800";
   };

   const toggleActiveChevron = (isActive: boolean) => {
      return isActive ? <ChevronDown /> : <ChevronUp />;
   };

   const isLinkActive = (linkPath: string) => {
      return pathname?.startsWith(linkPath)
         ? "text-neutral-900 border-l-2 border-blue-500 pl-1"
         : "text-neutral-600 font-light pl-1";
   };

   const isLinkActiveIcon = (linkPath: string) => {
      if (pathname?.startsWith(linkPath)) {
         switch (linkPath) {
            case "/dashboard":
               return "red"; // Dashboard icon color
            case "/goals":
               return "#f4c542"; // Goals (Trophy) icon color
            case "/analytics":
               return "#4caf50"; // Analytics icon color
            default:
               return "none"; // Default inactive color
         }
      }
      return "none"; // Inactive color
   };

   // keeping this here to potentially use icon fill for active link styling
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   // const isLinkActiveIcon = (linkPath: string) => {
   //    return pathname === linkPath;
   // };

   return (
      <div className="relative h-fit">
         <div className="">
            <section className="my-8">
               <Link href="/" className="my-2 pl-1 text-2xl">
                  <div className="flex flex-row items-center">
                     <span>
                        <Home />
                     </span>
                     <h1 className="pl-2">Home</h1>
                  </div>
               </Link>
            </section>
            <section className="my-8">
               <button
                  id="menu-button"
                  className={`${toggleActiveMenuStyle(
                     isOpen
                  )} r-2  top-0 py-2 flex flex-row w-full rounded-tl-md rounded-bl-md items-center`}
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
                     className="ml-9 top-1 relative w-full "
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
                              <span className={isLinkActiveIcon("/dashboard")}>
                                 <Layout
                                    size={18}
                                    fill={isLinkActiveIcon("/dashboard")}
                                 />
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
                              <span className={isLinkActiveIcon("/goals")}>
                                 <Trophy
                                    size={18}
                                    fill={isLinkActiveIcon("/goals")}
                                 />
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
                              <span className={isLinkActiveIcon("/analytics")}>
                                 <ChartAreaIcon
                                    size={18}
                                    fill={isLinkActiveIcon("/analytics")}
                                 />
                              </span>
                              <span className="pl-2">Analytics</span>
                           </button>
                        </Link>
                     </div>
                  </div>
               )}
            </section>
            <section className="my-8">
               <div className="flex flex-row items-center mb-2">
                  <span>
                     <UserCircle />
                  </span>
                  <h2 className="text-2xl pl-2">Account</h2>
               </div>
               <div className="ml-9">
                  <div
                     className={`${isLinkActive(
                        "/settings"
                     )} flex flex-row items-center mb-2`}
                  >
                     <span>
                        <Settings size={18} />
                     </span>
                     <Link href="settings" className="pl-2">
                        Settings
                     </Link>
                  </div>
                  <div className="flex flex-row items-center pl-2">
                     <span>
                        <LogOutIcon size={18} />
                     </span>
                     <div className="pl-2">Logout</div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
}
