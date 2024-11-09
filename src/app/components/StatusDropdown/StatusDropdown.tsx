"use client";
import { useState } from "react";
import { Application } from "@/app/types/types";

interface ApplicationStatusProps {
   application: Application;
}

export default function StatusDropdown({
   application,
}: ApplicationStatusProps) {
   const [applicationStatus, setApplicationStatus] = useState(
      application.status
   );
   console.log(applicationStatus);

   return (
      <>
         <div>status</div>
      </>
   );
}
