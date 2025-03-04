/*
  Warnings:

  - Made the column `date_publication` on table `jeux` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `jeux` MODIFY `date_publication` DATETIME(3) NOT NULL;
