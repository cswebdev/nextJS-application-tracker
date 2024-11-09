"use client";
import { useEffect, useState } from "react";
import { Application } from "@/app/types/types";
import ApplicationItem from "../ApplicationTracker/ApplicationItem";

interface ApplicationStatusProps {
   application: Application;
}

// Define the status options
const statusOptions = [
   "applied",
   "interview",
   "offer",
   "accepted",
   "waiting",
   "rejected",
];

export default function StatusDropdownMenu({
   application,
}: ApplicationStatusProps) {
   const [applicationStatus, setApplicationStatus] = useState(
      application.status
   );
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen((prev) => !prev);
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const target = event.target as HTMLElement;
         if (
            !target.closest("#menu-button") &&
            !target.closest("#dropdown-menu")
         ) {
            setIsOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   // Testing render of applicationStatus on change
   useEffect(() => {
      console.log(applicationStatus);
   }, [applicationStatus]);

   return (
      <div className="relative">
         <button
            className="bg-neutral-600 text-white text-sm font-semibold rounded-md px-4 py-2 text-center w-full cursor-pointer"
            onClick={toggleMenu}
            id="menu-button"
         >
            {applicationStatus.toUpperCase()}
         </button>
         {isOpen && (
            <div
               id="dropdown-menu"
               className="mr-2 left-40 top-0 bg-white shadow-md rounded-md absolute ring-2 ring-neutral-100/55"
               role="menu"
               aria-labelledby="menu-button"
               tabIndex={-1}
            >
               <div className="overflow-hidden py-2 px-2 text-sm" role="none">
                  {statusOptions.map((status) => (
                     <div
                        key={status}
                        className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                           setApplicationStatus(status);
                           setIsOpen(false);
                        }}
                     >
                        {status.toUpperCase()}
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}
