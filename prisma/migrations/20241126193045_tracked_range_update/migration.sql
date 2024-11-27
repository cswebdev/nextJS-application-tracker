/*
  Warnings:

  - You are about to drop the column `trackedRange` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "trackedRange",
ADD COLUMN     "dateRange" "DateRange";
