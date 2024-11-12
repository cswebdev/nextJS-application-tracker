import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(request: { json: () => PromiseLike<{ status: any; }> | { status: any; }; }, { params }: any) {
   try {
      // Await params.id to ensure it's ready
      const applicationId = await params?.id;
      if (!applicationId) {
         throw new Error("Invalid application ID");
      }

      const { status } = await request.json();
      // Validate request payload
      if (!status) {
         throw new TypeError("The 'status' field is required.");
      }

      // Update application status in the database
      const updatedApplication = await prisma.application.update({
         where: { id: applicationId },
         data: { status },
      });

      return NextResponse.json(updatedApplication, { status: 200 });
   } catch (error) {
      console.error("Error updating application status:", error);
      return NextResponse.json(
         { error: "Failed to update application status" },
         { status: 500 }
      );
   }
}
