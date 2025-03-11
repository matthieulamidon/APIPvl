-- AlterTable
ALTER TABLE `utilisateur` ADD COLUMN `role` ENUM('MEMBRE', 'ADMINISTRATEUR') NOT NULL DEFAULT 'MEMBRE';

-- CreateTable
CREATE TABLE `JeuxAccueil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `champs` ENUM('NOUVEAUTE', 'CLASSIQUE', 'GRAND_CARROUSEL') NOT NULL,
    `id_jeux` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JeuxAccueil` ADD CONSTRAINT `JeuxAccueil_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `Jeux`(`id_jeux`) ON DELETE CASCADE ON UPDATE CASCADE;
