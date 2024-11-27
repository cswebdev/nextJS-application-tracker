"use client";

import { useParams } from "next/navigation";
import ApplicationsPage from "../application/page";
import SubmitApplicationPage from "../submit-application/page";
import Dashboard from "../Dashboard/page";

export default function DynamicPage() {
   const { slug } = useParams() as { slug: string };

   return (
      <div className="h-full overflow-y-auto">
         {slug === "application" && <ApplicationsPage />}
         {slug === "submit-application" && <SubmitApplicationPage />}
         {slug === "dashboard" && <Dashboard />}
      </div>
   );
}
