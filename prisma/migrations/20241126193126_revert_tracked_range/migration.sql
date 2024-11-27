/*
  Warnings:

  - You are about to drop the column `dateRange` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "dateRange",
ADD COLUMN     "trackedRange" "DateRange";
