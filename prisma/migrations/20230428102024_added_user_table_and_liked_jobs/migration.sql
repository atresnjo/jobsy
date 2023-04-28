/*
  Warnings:

  - You are about to drop the column `workType` on the `job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job" DROP COLUMN "workType";

-- DropEnum
DROP TYPE "CompanyType";

-- DropEnum
DROP TYPE "WorkType";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "external_provider_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liked_jobs" (
    "jobId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "liked_jobs_pkey" PRIMARY KEY ("jobId","userId")
);

-- AddForeignKey
ALTER TABLE "liked_jobs" ADD CONSTRAINT "liked_jobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_jobs" ADD CONSTRAINT "liked_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
