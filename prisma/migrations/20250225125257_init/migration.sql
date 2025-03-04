-- AlterTable
ALTER TABLE `jeux` MODIFY `date_publication` DATE NULL,
    MODIFY `note` DOUBLE NULL,
    MODIFY `any_pourcent` DOUBLE NULL,
    MODIFY `main_plus_extra` DOUBLE NULL,
    MODIFY `completionniste` DOUBLE NULL,
    MODIFY `allStyle` DOUBLE NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `nb_favoris` INTEGER NULL;
