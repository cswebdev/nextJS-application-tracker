import { Application } from "@/app/types/types";
import StatusDropdown from "../StatusDropdown/StatusDropdown";

interface ApplicationItemProps {
   application: Application;
}

export default function ApplicationItem({ application }: ApplicationItemProps) {
   return (
      <div className="flex flex-col ring-1 rounded-md max-w-3xl p-4 m-3 max-h-fit">
         {/* Header Section */}
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center rounded-md py-1">
               <h3 className="font-bold mr-4 text-2xl bg-neutral-600 text-white px-2 rounded-md">
                  {application.company}
               </h3>
               <div>{application.position}</div>
            </div>
         </div>

         {/* URL Section */}
         <div className="mb-1">
            <a
               href={application.url}
               className="text-blue-500 cursor-default"
               target="_blank"
               rel="noopener noreferrer"
            >
               {application.url}
            </a>
         </div>

         {/* Date Section */}
         <div className="flex items-center mb-2 text-sm">
            <span className="text-gray-600">Applied on:</span>
            <span className="ml-1">{application.date.toDateString()}</span>
         </div>

         {/* Grid Section for Details and Status */}
         <div className="grid grid-cols-5 gap-4 items-end">
            {/* Details Column */}
            {application.details && (
               <div className="col-span-4">
                  <span className="text-gray-700 font-light text-sm">
                     Details:
                  </span>
                  <div className="mt-1 bg-white ring-1 ring-neutral-500/20 rounded-md py-2 text-wrap">
                     <div className="text-sm">{application.details}</div>
                  </div>
               </div>
            )}

            {/* Status Column */}
            <div className="col-span-1 flex justify-end">
               <button className="bg-neutral-600 text-white text-sm font-semibold rounded-md px-4 py-2 text-center w-full cursor-default">
                  {/* {application.status.toUpperCase()} */}
                  <StatusDropdown application={application} />
               </button>
            </div>
         </div>
      </div>
   );
}
