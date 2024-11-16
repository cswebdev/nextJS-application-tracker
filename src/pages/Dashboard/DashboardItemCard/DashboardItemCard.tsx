"use client";

import { useEffect, useState } from "react";

interface DashboardItemCardProps {
   totalApplications?: number;
}

const statusOptions = ["applied", "pending", "interview", "accepted"];

const DashboardItemCard = ({ totalApplications }: DashboardItemCardProps) => {
   const [totalApps, setTotalApps] = useState<number>(totalApplications || 0);
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
            setStatusCounts(data);
         } catch (error) {
            console.error("Error fetching status counts:", error);
            setError("Failed to fetch status counts.");
         } finally {
            setLoading(false);
         }
      };

      fetchStatusCounts();
   }, []);

   return (
      <div className="flex justify-center items-center content-center ">
         {loading ? (
            <div>Loading...</div>
         ) : error ? (
            <div className="text-red-500">{error}</div>
         ) : (
            <>
               <div className="flex justify-center items-center">
                  {loading ? (
                     <div>Loading...</div>
                  ) : error ? (
                     <div className="text-red-500">{error}</div>
                  ) : (
                     <div className="grid grid-cols-4 gap-5">
                        {statusOptions.map((status) => (
                           <div
                              key={status}
                              className="pb-6 py-2 px-20 rounded-md bg-white ring-1 ring-gray-200 flex flex-col items-center content-center gap-y-2 border-t-8 border-t-fuchsia-500"
                           >
                              <p className="font-light text-4xl">
                                 {statusCounts[status] || 0}
                              </p>
                              <h3 className="font-bold text-xl capitalize">
                                 {status}
                              </h3>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </>
         )}
      </div>
   );
};

export default DashboardItemCard;
