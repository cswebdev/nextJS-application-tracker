import prisma from "@/lib/prisma"; // Assuming you are using Prisma for data fetching

export async function GET() {
   try {
      const statusCounts = await prisma.application.groupBy({
         by: ["status"],
         _count: {
            status: true,
         },
      });

      // Transform data into an object with status as the key
      const result = statusCounts.reduce<Record<string, number>>(
         (acc, { status, _count }) => {
            acc[status] = _count.status;
            return acc;
         },
         {} // Empty object that will be typed as Record<string, number>
      );

      return new Response(JSON.stringify(result), { status: 200 });
   } catch (error) {
      console.error("Error fetching application status counts:", error);
      return new Response(
         JSON.stringify({ error: "Failed to fetch status counts" }),
         { status: 500 }
      );
   }
}
