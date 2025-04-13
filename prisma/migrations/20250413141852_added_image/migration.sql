/*
  Warnings:

  - Added the required column `imageUrl` to the `MenuItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItems" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "imageUrl" TEXT NOT NULL;
