import { Application } from "@/app/types/types";
import ApplicationItem from "./ApplicationItem";

interface ApplicationListProps {
   applications: Application[];
}

export default function ApplicationList({
   applications,
}: ApplicationListProps) {
   const sortedApplications = [...applications].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
   );

   return (
      <>
         <div className="pb-10">
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
