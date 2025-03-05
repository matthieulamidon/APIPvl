-- AlterTable
ALTER TABLE `ludotheque` MODIFY `statut` ENUM('NON_DEFINI', 'EN_COURS', 'ABANDON', 'PREVU', 'COMPLETE') NULL DEFAULT 'NON_DEFINI',
    MODIFY `Type_completion` ENUM('NON_DEFINI', 'any_pourcent', 'main_plus_extra', 'completionniste', 'allStyle') NULL DEFAULT 'NON_DEFINI',
    MODIFY `commentaire` VARCHAR(191) NULL,
    MODIFY `note` DOUBLE NULL;
