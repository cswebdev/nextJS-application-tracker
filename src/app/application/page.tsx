import prisma from "@/lib/prisma";
import ApplicationList from "@/app/components/ApplicationTracker/ApplicationList";
import { Application } from "@/app/types/types";

const ApplicationsPage = async () => {
   try {
      // Fetch applications from Prisma with selected fields
      const applications = await prisma.application.findMany({
         select: {
            id: true,
            url: true,
            company: true,
            position: true,
            status: true,
            details: true,
            dateApplied: true,
            trackedRange: true,
            userId: true, // Ensure userId is selected if necessary
            // createdAt: true, // Ensure createdAt is selected
            // updatedAt: true, // Ensure updatedAt is selected
         },
      });

      // Map Prisma results to the Application type
      const applicationData: Application[] = applications.map((app) => ({
         ...app, // Spread to handle common fields
         status: app.status as Application["status"], // Explicitly cast if necessary
      }));

      return (
         <div className="max-h-screen mt-10">
            <ApplicationList applications={applicationData} />
         </div>
      );
   } catch (error) {
      console.error("Error loading applications:", error);
      return <div>Error loading applications. Please try again later.</div>;
   }
};

export default ApplicationsPage;
