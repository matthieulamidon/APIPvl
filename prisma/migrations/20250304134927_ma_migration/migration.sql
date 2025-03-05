/*
  Warnings:

  - You are about to drop the column `name` on the `plateforme` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the `plateformejeu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tagjeu` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_jeux` to the `Plateforme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_jeux` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `plateformejeu` DROP FOREIGN KEY `PlateformeJeu_jeuId_fkey`;

-- DropForeignKey
ALTER TABLE `plateformejeu` DROP FOREIGN KEY `PlateformeJeu_plateformeId_fkey`;

-- DropForeignKey
ALTER TABLE `tagjeu` DROP FOREIGN KEY `TagJeu_jeuId_fkey`;

-- DropForeignKey
ALTER TABLE `tagjeu` DROP FOREIGN KEY `TagJeu_tagId_fkey`;

-- AlterTable
ALTER TABLE `plateforme` DROP COLUMN `name`,
    ADD COLUMN `id_jeux` INTEGER NOT NULL,
    ADD COLUMN `nom` VARCHAR(191) NOT NULL DEFAULT 'default';

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `name`,
    ADD COLUMN `id_jeux` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `nom` VARCHAR(191) NOT NULL DEFAULT 'default';

-- DropTable
DROP TABLE `plateformejeu`;

-- DropTable
DROP TABLE `tagjeu`;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `Jeux`(`id_jeux`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plateforme` ADD CONSTRAINT `Plateforme_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `Jeux`(`id_jeux`) ON DELETE CASCADE ON UPDATE CASCADE;
