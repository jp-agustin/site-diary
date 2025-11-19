-- CreateTable
CREATE TABLE "SiteDiary" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdBy" TEXT NOT NULL,
    "attendees" TEXT[],
    "attachments" TEXT[],
    "weather" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteDiary_pkey" PRIMARY KEY ("id")
);
