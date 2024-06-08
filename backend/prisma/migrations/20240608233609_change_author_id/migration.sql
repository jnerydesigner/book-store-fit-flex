/*
  Warnings:

  - The primary key for the `authors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `authors` table. All the data in the column will be lost.
  - The required column `authorId` was added to the `authors` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_id_fkey";

-- AlterTable
ALTER TABLE "authors" DROP CONSTRAINT "authors_pkey",
DROP COLUMN "id",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD CONSTRAINT "authors_pkey" PRIMARY KEY ("authorId");

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "authorId" DROP NOT NULL,
ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("authorId") ON DELETE SET NULL ON UPDATE CASCADE;
