// import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import ApplicationList from "@/app/components/ApplicationTracker/ApplicationList";
import { Application } from "@/app/types/types";

const ApplicationsPage = async () => {
   const applications: Application[] = await prisma.Application.findMany();

   return (
      <div>
         <ApplicationList applications={applications} />
      </div>
   );
};

export default ApplicationsPage;
