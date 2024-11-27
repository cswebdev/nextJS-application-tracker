"use client";
import { useEffect, useState } from "react";
import { Application, Status } from "@/app/types/types";

interface ApplicationStatusProps {
   application: Application;
}

// Define the status options according to the Status type
const statusOptions: Status[] = [
   "PENDING",
   "APPLIED",
   "INTERVIEW",
   "ACCEPTED",
   "REJECTED",
];

export default function StatusDropdownMenu({
   application,
}: ApplicationStatusProps) {
   const [applicationStatus, setApplicationStatus] = useState<Status>(
      application.status
   );
   const [isOpen, setIsOpen] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

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

   const handleStatusChange = async (newStatus: Status) => {
      setError(null);
      setLoading(true);
      try {
         const response = await fetch(`/api/applications/${application.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
         });
         if (response.ok) {
            setApplicationStatus(newStatus); // Updated status is now consistent with the enum
            setIsOpen(false);
         } else {
            const data = await response.json();
            setError(data.error || "Failed to update application status");
         }
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
         setError("An error occurred while updating the application status");
      } finally {
         setLoading(false);
      }
   };

   const getStatusColor = (status: Status) => {
      switch (status) {
         case "APPLIED":
            return "bg-blue-600";
         case "INTERVIEW":
            return "bg-yellow-500";
         case "OFFER":
            return "bg-green-600";
         case "ACCEPTED":
            return "bg-green-800";
         case "PENDING":
            return "bg-orange-500";
         case "REJECTED":
            return "bg-red-600";
         default:
            return "bg-gray-400";
      }
   };

   return (
      <div className="relative">
         <button
            className={`${getStatusColor(
               applicationStatus
            )} text-white text-sm font-semibold rounded-md px-4 py-2 text-center w-full cursor-pointer`}
            onClick={toggleMenu}
            id="menu-button"
            disabled={loading}
         >
            {loading ? "Updating..." : applicationStatus}
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
                        onClick={() => handleStatusChange(status)}
                     >
                        {status}
                     </div>
                  ))}
               </div>
            </div>
         )}
         {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
   );
}
