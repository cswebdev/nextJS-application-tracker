import { useEffect, useState } from "react";
import DashboardItemCard from "./DashboardItemCard/DashboardItemCard";

export default function Dashboard() {
   const [totalApplications, setTotalApplications] = useState<number>(0);

   useEffect(() => {
      const fetchTotalApplications = async () => {
         try {
            const response = await fetch("/api/totalApplications");
            if (!response.ok) {
               throw new Error(`HTTP error! status ${response.status}`);
            }
            const data = await response.json();
            if (data.totalApplications) {
               setTotalApplications(data.totalApplications);
            }
         } catch (error) {
            console.error("Error fetching total applications:", error);
         }
      };

      fetchTotalApplications();
   }, []);

   return (
      <>
         <header className="p-4">
            <p>Total number of applications: {totalApplications}</p>
            <div className="w-full  rounded-md flex flex-row">
               <section className="flex items-center justify-center mx-auto">
                  <DashboardItemCard totalApplications={totalApplications} />
               </section>
            </div>
         </header>
      </>
   );
}
