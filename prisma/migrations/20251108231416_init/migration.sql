-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Influencer" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER,
    "recordType" TEXT,
    "fullName" TEXT NOT NULL,
    "preferredName" TEXT,
    "gender" TEXT,
    "birthDate" TIMESTAMP(3),
    "email" TEXT,
    "phone" TEXT,
    "city" TEXT,
    "country" TEXT,
    "occupation" TEXT,
    "influencerCategory" TEXT,
    "primaryPlatform" TEXT,
    "followersCount" INTEGER,
    "totalFollowersCount" INTEGER,
    "engagementRate" DOUBLE PRECISION,
    "engagementRateTier" TEXT,
    "interests" TEXT[],
    "notes" TEXT,
    "secondaryPlatform" TEXT,
    "secondaryFollowersCount" INTEGER,
    "averageMonthlyReach" INTEGER,
    "collaborationStatus" TEXT,
    "languages" TEXT[],
    "portfolioUrl" TEXT,
    "lastContactDate" TIMESTAMP(3),
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
