/*
  Warnings:

  - The primary key for the `authors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `authors` table. All the data in the column will be lost.
  - The required column `id` was added to the `authors` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_authorId_fkey";

-- AlterTable
ALTER TABLE "authors" DROP CONSTRAINT "authors_pkey",
DROP COLUMN "authorId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "authors_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
