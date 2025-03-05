-- AlterTable
ALTER TABLE `plateforme` MODIFY `id_jeux` INTEGER NULL,
    ALTER COLUMN `nom` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tag` MODIFY `id_jeux` INTEGER NULL,
    ALTER COLUMN `nom` DROP DEFAULT;
