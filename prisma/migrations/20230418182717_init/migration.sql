-- CreateEnum
CREATE TYPE "RemoteType" AS ENUM ('Full', 'Hybrid', 'None');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('fullTime', 'fourDaysWeek', 'partTime', 'shortTerm');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('Startup', 'Corporation', 'Business');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Europe', 'Australia', 'NorthAmerica', 'SouthAmerica', 'Africa', 'Asia', 'MiddleEast', 'Worldwide');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('Usd', 'Eur', 'Pound');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Engineering', 'Marketing', 'Design', 'Support', 'DevOps', 'Other');

-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "fromSalary" INTEGER,
    "toSalary" INTEGER,
    "location" "Location" NOT NULL,
    "remoteType" "RemoteType" NOT NULL,
    "workType" "WorkType" NOT NULL,
    "currency" "Currency" NOT NULL,
    "jobType" "JobType" NOT NULL,
    "applyLink" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyName" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_tags" (
    "jobId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "job_tags_pkey" PRIMARY KEY ("jobId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_slug_key" ON "job"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- AddForeignKey
ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
