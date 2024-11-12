import prisma from "@/lib/prisma";
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
            status,
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
