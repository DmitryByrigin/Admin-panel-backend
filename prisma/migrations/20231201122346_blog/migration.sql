-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
