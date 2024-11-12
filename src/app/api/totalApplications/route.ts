// src/app/api/totalApplications/route.ts
import prisma from "@/lib/prisma";

export async function GET() {
   try {
      const totalApplications = await prisma.application.count();
      return new Response(JSON.stringify({ totalApplications }), {
         status: 200,
      });
   } catch (error) {
      console.error("Error fetching total applications:", error);
      return new Response(
         JSON.stringify({ error: "Failed to fetch total applications" }),
         {
            status: 500,
         }
      );
   }
}
