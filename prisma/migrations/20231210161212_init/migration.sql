/*
  Warnings:

  - You are about to drop the column `comments` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `blogId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "comments";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "blogId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
