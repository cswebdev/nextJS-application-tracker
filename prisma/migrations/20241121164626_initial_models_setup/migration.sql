/*
  Warnings:

  - The `trackedRange` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "trackedRange",
ADD COLUMN     "trackedRange" "DateRange";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
