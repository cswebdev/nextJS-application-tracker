import { Application } from "@/app/types/types";
import ApplicationItem from "./ApplicationItem";

interface ApplicationListProps {
   applications: Application[];
}

export default function ApplicationList({
   applications,
}: ApplicationListProps) {
   const sortedApplications = [...applications].sort(
      (a, b) =>
         new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
   );

   return (
      <>
         <div className=" w-full pb-1">
            {sortedApplications.map((application) => (
               <ApplicationItem
                  key={application.id}
                  application={application}
               />
            ))}
         </div>
      </>
   );
}
