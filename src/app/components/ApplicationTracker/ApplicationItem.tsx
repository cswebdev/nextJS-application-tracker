"use client";
import { Application } from "@/app/types/types";
import StatusDropdownMenu from "../StatusDropdown/StatusDropdownMenu";
import { useState } from "react";
import { Edit, SaveIcon } from "lucide-react";

interface ApplicationItemProps {
   application: Application;
}

const ApplicationItem = ({ application }: ApplicationItemProps) => {
   const [details, setDetails] = useState(application.details);
   const [error, setError] = useState<string | null>(null);
   const [isEditing, setIsEditing] = useState(false);

   const handleDetailsInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      setDetails(event.target.value);
   };

   const handleDetailsChange = async () => {
      setError(null);
      try {
         const response = await fetch(`/api/applications/${application.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ details }),
         });

         if (response.ok) {
            setIsEditing(false); // Exit edit mode upon successful save
         } else {
            const data = await response.json();
            setError(data.error || "Failed to update application details");
         }
      } catch (error) {
         setError("An error occurred while updating application details");
      }
   };

   return (
      <div className="flex flex-col ring-1 rounded-md max-w-5xl p-4 ml-5 max-h-full bg-white mb-5">
         {/* Header Section */}
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center rounded-md py-1">
               <h3 className="font-bold mr-4 text-2xl bg-yellow-300 text-black px-2 rounded-md">
                  {application.company}
               </h3>
               <div className="min-w-fit">{application.position}</div>
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
            <span className="ml-1">
               {application.dateApplied.toDateString()}
            </span>
         </div>

         {/* Grid Section for Details and Status */}
         <div className="grid grid-cols-5 gap-4 items-end">
            {/* Details Column */}
            <div className="col-span-4 ">
               <span className="text-gray-700 font-light text-sm">Notes:</span>
               <div className=" bg-neutral-50/80  rounded-md flex flex-col justify-between ring-2 ring-blue-100/80 overflow-hidden">
                  <div className="flex flex-row">
                     {isEditing ? (
                        <div className="w-full flex flex-row items-center justify-between ring-2 ring-transparent  leading-tight resize-none">
                           <textarea
                              className="w-full h-full text-sm focus-visible:outline-none content-center resize-none leading-tight pl-1 "
                              value={details}
                              onChange={handleDetailsInputChange}
                           />
                        </div>
                     ) : (
                        <div className="text-sm flex items-center align-middle pt-2.5 pl-1 w-full h-full">
                           {details}
                        </div>
                     )}
                     <div className="flex h-full py-2 px-1 bg-blue-500  text-white rounded-tr-md rounded-br-md">
                        {/* Button toggles between edit and save modes */}
                        <button
                           onClick={
                              isEditing
                                 ? handleDetailsChange
                                 : () => setIsEditing(true)
                           }
                        >
                           {isEditing ? <SaveIcon /> : <Edit />}
                        </button>
                     </div>
                  </div>
                  <div></div>
               </div>
               {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>

            {/* Status Column */}
            <div className="col-span-1 flex justify-end">
               <div className="w-full">
                  <StatusDropdownMenu application={application} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ApplicationItem;
