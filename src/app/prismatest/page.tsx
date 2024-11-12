// src/app/prismatest/page.tsx

import { Application } from "../types/types"; // Adjust the path if needed
import prisma from "@/lib/prisma";

export const metadata = {
   title: "Applications",
};

const PrismaTest = async () => {
   const applications: Application[] = await prisma.Application.findMany();

   return (
      <div>
         <h1>Applications</h1>
         {applications.map((application) => (
            <div key={application.id}>{application.company}</div>
         ))}
      </div>
   );
};

export default PrismaTest;
