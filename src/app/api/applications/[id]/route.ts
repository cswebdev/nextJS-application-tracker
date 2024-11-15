import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
   request: Request,
   { params }: { params: { id: string } }
) {
   try {
      const applicationId = params.id; // UUID as string
      if (!applicationId) {
         throw new Error("Invalid application ID");
      }

      const body = await request.json();
      const { status } = body;
      if (!status) {
         throw new TypeError("The 'status' field is required.");
      }

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

export async function PATCH(
   request: Request,
   { params }: { params: { id: string } }
) {
   try {
      const applicationId = params.id;
      if (!applicationId) throw new Error("Invalid application ID");

      const body = await request.json();
      const { details } = body;
      if (!details) {
         throw new TypeError("The 'details' field is required.");
      }

      const updatedApplication = await prisma.application.update({
         where: { id: applicationId },
         data: { details },
      });

      return NextResponse.json(updatedApplication, { status: 200 });
   } catch (error) {
      console.error("Error updating application details:", error);
      return NextResponse.json(
         { error: "Failed to update application details" },
         { status: 500 }
      );
   }
}
