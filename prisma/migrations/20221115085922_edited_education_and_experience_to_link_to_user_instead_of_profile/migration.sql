/*
  Warnings:

  - You are about to drop the column `profileId` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Experience` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_profileId_fkey";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "profileId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "profileId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
