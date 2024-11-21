import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
// import { message } from "firebase-admin";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === "POST") {
      const { email, password, displayName } = req.body;

      // input validation
      if (!email || !password) {
         return res
            .status(400)
            .json({ message: "Email and password are required" });
      }

      // check if user already exists
      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser) {
         return res.status(409).json({ message: "User already exists" });
      }

      // create a new user in the local database
      try {
         const newUser = await prisma.user.create({
            data: {
               email,
               displayName,
               ...password,
            },
         });
         return res
            .status(201)
            .json({ message: "user created successfully", user: newUser });
      } catch (error) {
         return res.status(500).json({
            message: "Error: something went wrong",
            error: error.message,
         });
      }
   } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} not allowed`);
   }
}
