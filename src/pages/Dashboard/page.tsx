import { useEffect, useState } from "react";
import DashboardItemCard from "./DashboardItemCard/DashboardItemCard";
import DateRangeLargeBtn from "@/app/components/DateRangeLargeBtn/DateRangeLargeBtn";

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
            <div className="w-full rounded-md flex flex-col ">
               <section className="flex items-center justify-center mx-auto ">
                  <DashboardItemCard totalApplications={totalApplications} />
               </section>
               <section className="mt-12 ml-30 flex items-center ml-20">
                  <div className="flex py-3 px-8 ring-2 bg-white/50 ring-neutral-200/50 rounded-md">
                     <p className="font-semibold text-md text-center  text-neutral-500 flex justify-center align-middle items-center">
                        Total number of applications:{" "}
                        <span
                           className={`font-extrabold text-xl  text-purple-500 py-1  px-1 rounded-md`}
                        >
                           {totalApplications}{" "}
                        </span>
                     </p>
                  </div>
               </section>
               <section className="flex align-middle items-center ml-20 mt-0">
                  <DateRangeLargeBtn
                     onOptionSelect={(selectedOption: string) => {
                        console.log("Selected option:", selectedOption);
                     }}
                  />
               </section>
            </div>
         </header>
      </>
   );
}
