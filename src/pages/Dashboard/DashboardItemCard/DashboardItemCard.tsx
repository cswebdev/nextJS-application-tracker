"use client";

import { useEffect, useState } from "react";

interface DashboardItemCardProps {
   totalApplications?: number;
}

const statusOptions: string[] = [
   "PENDING",
   "APPLIED",
   "INTERVIEW",
   "ACCEPTED",
   "REJECTED",
];

const DashboardItemCard = ({ totalApplications }: DashboardItemCardProps) => {
   const [, setTotalApps] = useState<number>(totalApplications || 0);
   const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchTotalApplications = async () => {
         try {
            const response = await fetch("/api/totalApplications");

            if (!response.ok) {
               throw new Error(`HTTP error! status ${response.status}`);
            }
            const data = await response.json();
            setTotalApps(data.totalApplications || 0);
         } catch (error) {
            console.error("Error fetching total applications:", error);
         }
      };

      if (!totalApplications) {
         fetchTotalApplications();
      }
   }, [totalApplications]);

   useEffect(() => {
      const fetchStatusCounts = async () => {
         try {
            setLoading(true);
            const response = await fetch("/api/totalApplicationStatus/");
            if (!response.ok) {
               throw new Error(`HTTP error! status ${response.status}`);
            }
            const data = await response.json();

            // Ensure the status keys from the API are in uppercase for consistency
            const formattedData: Record<string, number> = {};
            Object.keys(data).forEach((status) => {
               const uppercasedStatus = status.toUpperCase();
               formattedData[uppercasedStatus] = data[status];
            });
            setStatusCounts(formattedData);
         } catch (error) {
            console.error("Error fetching status counts:", error);
            setError("Failed to fetch status counts.");
         } finally {
            setLoading(false);
         }
      };

      fetchStatusCounts();
   }, []);

   const getStatusColor = (status: string): string => {
      switch (status) {
         case "APPLIED":
            return "#2563EB"; // Blue
         case "INTERVIEW":
            return "#F59E0B"; // Yellow
         case "OFFER":
            return "#16A34A"; // Green
         case "ACCEPTED":
            return "#15803D"; // Dark Green
         case "PENDING":
            return "#F97316"; // Orange
         case "REJECTED":
            return "#DC2626"; // Red
         default:
            return "#9CA3AF"; // Gray
      }
   };

   return (
      <div className="flex justify-center items-center content-center">
         {loading ? (
            <div>Loading...</div>
         ) : error ? (
            <div className="text-red-500">{error}</div>
         ) : (
            <div className="grid grid-cols-5 gap-4">
               {statusOptions.map((status) => (
                  <div
                     key={status}
                     className="pb-6 py-2 px-16 rounded-md bg-white ring-1 ring-gray-200 flex flex-col items-center content-center gap-y-2 border-t-8"
                     style={{ borderTopColor: getStatusColor(status) }}
                  >
                     <p className="font-light text-4xl">
                        {statusCounts[status] || 0}
                     </p>
                     <h3 className="font-bold text-xl capitalize">
                        {status.toLowerCase()}
                     </h3>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default DashboardItemCard;
