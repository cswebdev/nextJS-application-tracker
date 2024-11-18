-- CreateEnum
CREATE TYPE "DateRange" AS ENUM ('ONE_DAY', 'ONE_WEEK', 'ONE_MONTH', 'SIX_MONTHS', 'ONE_YEAR');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "trackedRange" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "selectedRange" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
