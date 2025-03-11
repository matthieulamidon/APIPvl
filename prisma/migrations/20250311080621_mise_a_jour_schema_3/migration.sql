-- AlterTable
ALTER TABLE `jeux` ADD COLUMN `src_image_jaquette` VARCHAR(191) NOT NULL DEFAULT 'civ-7-jaquette.png',
    ADD COLUMN `src_image_jeu` VARCHAR(191) NULL;
