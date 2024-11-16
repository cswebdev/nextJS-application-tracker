import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const statuses = [
         "applied",
         "interview",
         "offer",
         "accepted",
         "pending",
         "rejected",
      ];

      // Batch all count queries using $transaction
      const counts = await prisma.$transaction(
         statuses.map((status) =>
            prisma.application.count({
               where: { status },
            })
         )
      );

      // Create statusCounts object dynamically
      const statusCounts = statuses.reduce(
         (acc, status, index) => ({
            ...acc,
            [status]: counts[index],
         }),
         {}
      );

      return NextResponse.json(statusCounts, { status: 200 });
   } catch (error) {
      console.error("Error fetching status counts:", error);
      return NextResponse.json(
         { error: "Failed to fetch status counts" },
         { status: 500 }
      );
   }
}
