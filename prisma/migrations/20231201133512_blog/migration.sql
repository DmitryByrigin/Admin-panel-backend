/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
ADD COLUMN     "comments" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "content" SET DATA TYPE JSON,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("id");
