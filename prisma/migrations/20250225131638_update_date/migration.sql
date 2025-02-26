/*
  Warnings:

  - You are about to drop the column `editeurId` on the `plateformejeu` table. All the data in the column will be lost.
  - You are about to drop the `editeur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `editeurjeu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studiojeu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `editeurjeu` DROP FOREIGN KEY `EditeurJeu_EditeurId_fkey`;

-- DropForeignKey
ALTER TABLE `editeurjeu` DROP FOREIGN KEY `EditeurJeu_jeuId_fkey`;

-- DropForeignKey
ALTER TABLE `plateformejeu` DROP FOREIGN KEY `PlateformeJeu_editeurId_fkey`;

-- DropForeignKey
ALTER TABLE `studiojeu` DROP FOREIGN KEY `StudioJeu_jeuId_fkey`;

-- DropForeignKey
ALTER TABLE `studiojeu` DROP FOREIGN KEY `StudioJeu_studioId_fkey`;

-- DropIndex
DROP INDEX `PlateformeJeu_editeurId_fkey` ON `plateformejeu`;

-- AlterTable
ALTER TABLE `jeux` ADD COLUMN `editeur` ENUM('NON_DEFINI', 'NINTENDO', 'SONY', 'MICROSOFT', 'EA', 'UBISOFT', 'ACTIVISION_BLIZZARD', 'TAKE_TWO_INTERACTIVE', 'SQUARE_ENIX', 'BANDAI_NAMCO', 'CAPCOM', 'SEGA', 'EMBRACER_GROUP', 'WARNER_BROS_GAMES', 'KOEI_TECMO', 'DEVOLVER_DIGITAL', 'ANNAPURNA_INTERACTIVE', 'STUDIO_505_GAMES', 'PARADOX_INTERACTIVE', 'TEAM17', 'FOCUS_ENTERTAINMENT', 'PRIVATE_DIVISION', 'LARIAN_STUDIOS', 'RAW_FURY', 'HUMBLE_GAMES', 'INFOGRAMES', 'LUCASARTS', 'EIDOS_INTERACTIVE', 'VIRGIN_INTERACTIVE', 'BULLFROG_PRODUCTIONS', 'PSYGNOSIS') NULL DEFAULT 'NON_DEFINI',
    ADD COLUMN `studio` ENUM('NON_DEFINI', 'ROCKSTAR', 'NAUGHTY_DOG', 'SANTA_MONICA_STUDIO', 'CD_PROJEKT_RED', 'UBISOFT', 'BETHESDA', 'FROM_SOFTWARE', 'SQUARE_ENIX', 'CAPCOM', 'BANDAI_NAMCO', 'ELECTRONIC_ART', 'DICE', 'BIOWARE', 'INFINITY_YARD', 'TREYARCH', 'SUTDIO_343_INDUSTRIES', 'BUNGIE', 'INSOMNIAC_GAMES', 'REMEDY_INTERTAINMENT', 'LARIAN_STUDIOS', 'OBSIDIAN_ENTERTAINMENT', 'MOJANG', 'TEAM_CHERRY', 'DONTNOD_ENTERTAINMENT', 'TANGO_GAMEWORKS', 'PLATINUM_GAMES', 'KOJIMA_PRODUCTIONS', 'ARKANE_STUDIOS', 'REBELLION', 'BOHEMIA_INTERACTIVE', 'CROTEAM', 'HOUSEMARQUE', 'THE_CHINESE_ROOM', 'CONCERNEDAPE', 'TOBY_FOX', 'PSYONIX', 'KLEI_ENTERTAINMENT', 'MOTION_TWIN', 'FACEPUNCH_STUDIOS', 'GIANT_SQUID', 'PLAYDEAD', 'ANNAPURNA_INTERACTIVE', 'VLAMBEER', 'NO_BRAKES_GAMES', 'GHOST_SHIP_GAMES', 'IRON_GATE_STUDIO', 'INNERSLOTH', 'NINTENDO', 'HAL_LABORATORY', 'INTELLIGENT_SYSTEMS', 'MONOLITH_SOFT', 'RARE', 'RETRO_STUDIOS', 'NEXT_LEVEL_GAMES', 'NDCUBE', 'THE_1_UP_STUDIO', 'GAME_FREAK', 'CREATURES_INC', 'GREZZO', 'CAMELOT_SOFTWARE_PLANNING', 'SORA_LTD', 'VANPOOL', 'SEGA', 'WAYGORWARD', 'KOEI_TECMO_OMEGA_FORCE', 'KONAMI', 'SNK', 'ATARI', 'ID_SOFTWARE', 'ATLUS', 'VALVE', 'INFOGRAMES', 'LUCASARTS', 'THQ') NULL DEFAULT 'NON_DEFINI',
    MODIFY `date_publication` DATE NOT NULL;

-- AlterTable
ALTER TABLE `plateformejeu` DROP COLUMN `editeurId`;

-- DropTable
DROP TABLE `editeur`;

-- DropTable
DROP TABLE `editeurjeu`;

-- DropTable
DROP TABLE `studio`;

-- DropTable
DROP TABLE `studiojeu`;
