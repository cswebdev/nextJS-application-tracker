import { Application } from "@/app/types/types";
import ApplicationItem from "./ApplicationItem";

interface ApplicationListProps {
   applications: Application[];
}

export default function ApplicationList({
   applications,
}: ApplicationListProps) {
   return (
      <>
         <div className="pb-10">
            {applications.map((application) => (
               <ApplicationItem
                  key={application.id}
                  application={application}
               />
            ))}
         </div>
      </>
   );
}
