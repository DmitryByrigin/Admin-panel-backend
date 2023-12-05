/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Blog_userId_key" ON "Blog"("userId");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
