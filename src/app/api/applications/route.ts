import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// POST endpoint to add a new job application
export async function POST(request: Request) {
   try {
      const { url, company, position, status, details } = await request.json();
      const newApplication = await prisma.application.create({
         data: {
            url,
            company,
            position,
            status, // Ensure this matches the "Status" enum
            details,
         },
      });
      return NextResponse.json(newApplication, { status: 201 });
   } catch (error) {
      console.error("Error entering job application: ", error);
      return NextResponse.json(
         { error: "Failed to submit application" },
         { status: 500 }
      );
   }
}

// GET endpoint to fetch the total number of applications
export async function GET() {
   try {
      const totalApplications = await prisma.application.count();
      return NextResponse.json({ totalApplications }, { status: 200 });
   } catch (error) {
      console.error("Error fetching total applications:", error);
      return NextResponse.json(
         { error: "Failed to fetch total applications" },
         { status: 500 }
      );
   }
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === "POST") {
      const { url, company, position, status, details } = req.body;

      try {
         const application = await prisma.application.create({
            data: {
               url,
               company,
               position,
               status,
               details,
               // Do not include `createdAt` or `updatedAt`; Prisma will handle these
            },
         });
         res.status(201).json(application);
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
         res.status(500).json({ error: "Error creating application" });
      }
   } else {
      res.status(405).json({ error: "Method Not Allowed" });
   }
}
