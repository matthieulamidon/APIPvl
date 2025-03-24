/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: pvl_database
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES
('026d6f8e-4a6c-4d11-8645-297acdaef2aa','fc9a5f58073b6b111889056cfb1f3ae405affed62e70d3276d3535868e0e475e','2025-03-11 13:50:31.053','20250225125257_init',NULL,NULL,'2025-03-11 13:50:31.039',1),
('049066a0-34d9-46d1-b4aa-85eafcf68e8a','427f427d6a34079b08f4c006f6e307a36a4ac6a16775ad40af588df097beb064','2025-03-11 13:50:31.073','20250225130018_update_datetime',NULL,NULL,'2025-03-11 13:50:31.060',1),
('08b52e7b-9d04-4d7c-afc8-3ed7132e2e1a','2a6297b292f00ec358177dff71189eaa5c913412c2567a95083ad2d696b8a7be','2025-03-11 13:50:31.303','20250304141629_bonjour',NULL,NULL,'2025-03-11 13:50:31.295',1),
('0a80e147-f6e6-4d59-b2c4-70cd32da23e2','bace485a6b174b115944439d990afd18082ec8f722626ecca29ecb662c0daa5a','2025-03-11 13:50:31.012','20250205152230_init',NULL,NULL,'2025-03-11 13:50:30.777',1),
('1474bc09-3a1d-4439-af22-5f58d51ac637','ddc119ace0da266d202a5799c326c890024886618f5e5c8ec4b436fdaa88fda8','2025-03-11 14:00:53.334','20250311140053_changement',NULL,NULL,'2025-03-11 14:00:53.309',1),
('2df1cb21-3c4a-428a-8f65-a991808fbfcd','1cd6c1b6052fe270f4e0f78991f44e7e6cd623208ec9261761d04b9ba028ee59','2025-03-11 13:50:31.289','20250304134927_ma_migration',NULL,NULL,'2025-03-11 13:50:31.219',1),
('3154dc39-dabb-45e5-ad6e-41349a881c45','ee33c94a0a8909ad44711567713b16b99b1cee4b09467d1a02eaac17e81c540a','2025-03-11 13:50:31.348','20250311080621_mise_a_jour_schema_3',NULL,NULL,'2025-03-11 13:50:31.340',1),
('40855114-46b2-4cf4-958e-89cbcbed76e2','a6c009628c69fd45476598eb75496ec11f0ad73b4185fa2f4cd28dbd6cf50fd1','2025-03-11 13:50:31.210','20250304125039_ajout_en_pause',NULL,NULL,'2025-03-11 13:50:31.202',1),
('4f3307bc-006d-4b1e-a0c9-a46fffd54ff3','e949472a59e10b124c9377ae5afdd3801f71d4c475d9a353558138e31d540661','2025-03-11 13:50:31.033','20250218163002_update_date_publication_to_date',NULL,NULL,'2025-03-11 13:50:31.019',1),
('6ad0c1eb-5be3-4d24-b928-545bede9d21a','938d90c51c8ae5ee5a0fe48af9ebbee0a76bf286177422b9abce2a252e9f9305','2025-03-11 13:50:31.196','20250304095839_make_commentaire_optional',NULL,NULL,'2025-03-11 13:50:31.183',1),
('883da5a3-521c-4b8d-8bb1-a5639bc5a3aa','15873493cb82ad805f8284f96f5c98850afab7f3240ebda5ce25d216bfd2a8ce','2025-03-11 13:50:31.175','20250225131638_update_date',NULL,NULL,'2025-03-11 13:50:31.101',1),
('ebc96b65-a13c-46d6-91aa-a117b6648d92','82887e2e130c140fba8e2c0c7964483a299f4819827e2d49f8ba93bc521f7f81','2025-03-11 13:50:31.333','20250305130349_update_tag_model',NULL,NULL,'2025-03-11 13:50:31.310',1),
('ff927f4b-8b6f-48c1-85c5-eed36e306e20','fd9da8c269078a9467208e89cf339c4b4ad8c8b6c1e09bdada7bc2428bb4992e','2025-03-11 13:50:31.093','20250225130407_update_datetime',NULL,NULL,'2025-03-11 13:50:31.080',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ami`
--

DROP TABLE IF EXISTS `ami`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ami` (
  `id_utilisateur1` int(11) NOT NULL,
  `id_utilisateur2` int(11) NOT NULL,
  PRIMARY KEY (`id_utilisateur1`,`id_utilisateur2`),
  KEY `Ami_id_utilisateur2_fkey` (`id_utilisateur2`),
  CONSTRAINT `Ami_id_utilisateur1_fkey` FOREIGN KEY (`id_utilisateur1`) REFERENCES `utilisateur` (`id_utilisateur`) ON UPDATE CASCADE,
  CONSTRAINT `Ami_id_utilisateur2_fkey` FOREIGN KEY (`id_utilisateur2`) REFERENCES `utilisateur` (`id_utilisateur`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ami`
--

LOCK TABLES `ami` WRITE;
/*!40000 ALTER TABLE `ami` DISABLE KEYS */;
/*!40000 ALTER TABLE `ami` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum`
--

DROP TABLE IF EXISTS `forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forum` (
  `id_utilisateur` int(11) NOT NULL,
  `id_jeux` int(11) NOT NULL,
  `commentaire` varchar(191) NOT NULL,
  `titre` varchar(191) NOT NULL,
  `date_publication` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id_utilisateur`,`id_jeux`),
  KEY `Forum_id_jeux_fkey` (`id_jeux`),
  CONSTRAINT `Forum_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `jeux` (`id_jeux`) ON UPDATE CASCADE,
  CONSTRAINT `Forum_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum`
--

LOCK TABLES `forum` WRITE;
/*!40000 ALTER TABLE `forum` DISABLE KEYS */;
INSERT INTO `forum` VALUES
(3,10,'I\'m not a robot AI challenging you','It\'s not a game','2025-03-18 20:06:41.637');
/*!40000 ALTER TABLE `forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jeux` (
  `id_jeux` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) NOT NULL,
  `src_image` varchar(191) NOT NULL,
  `date_publication` date NOT NULL,
  `note` double DEFAULT NULL,
  `any_pourcent` double DEFAULT NULL,
  `main_plus_extra` double DEFAULT NULL,
  `completionniste` double DEFAULT NULL,
  `allStyle` double DEFAULT NULL,
  `description` varchar(191) DEFAULT NULL,
  `nb_favoris` int(11) DEFAULT NULL,
  `editeur` enum('NON_DEFINI','NINTENDO','SONY','MICROSOFT','EA','UBISOFT','ACTIVISION_BLIZZARD','TAKE_TWO_INTERACTIVE','SQUARE_ENIX','BANDAI_NAMCO','CAPCOM','SEGA','EMBRACER_GROUP','WARNER_BROS_GAMES','KOEI_TECMO','DEVOLVER_DIGITAL','ANNAPURNA_INTERACTIVE','STUDIO_505_GAMES','PARADOX_INTERACTIVE','TEAM17','FOCUS_ENTERTAINMENT','PRIVATE_DIVISION','LARIAN_STUDIOS','RAW_FURY','HUMBLE_GAMES','INFOGRAMES','LUCASARTS','EIDOS_INTERACTIVE','VIRGIN_INTERACTIVE','BULLFROG_PRODUCTIONS','PSYGNOSIS') DEFAULT 'NON_DEFINI',
  `studio` enum('NON_DEFINI','ROCKSTAR','NAUGHTY_DOG','SANTA_MONICA_STUDIO','CD_PROJEKT_RED','UBISOFT','BETHESDA','FROM_SOFTWARE','SQUARE_ENIX','CAPCOM','BANDAI_NAMCO','ELECTRONIC_ART','DICE','BIOWARE','INFINITY_YARD','TREYARCH','SUTDIO_343_INDUSTRIES','BUNGIE','INSOMNIAC_GAMES','REMEDY_INTERTAINMENT','LARIAN_STUDIOS','OBSIDIAN_ENTERTAINMENT','MOJANG','TEAM_CHERRY','DONTNOD_ENTERTAINMENT','TANGO_GAMEWORKS','PLATINUM_GAMES','KOJIMA_PRODUCTIONS','ARKANE_STUDIOS','REBELLION','BOHEMIA_INTERACTIVE','CROTEAM','HOUSEMARQUE','THE_CHINESE_ROOM','CONCERNEDAPE','TOBY_FOX','PSYONIX','KLEI_ENTERTAINMENT','MOTION_TWIN','FACEPUNCH_STUDIOS','GIANT_SQUID','PLAYDEAD','ANNAPURNA_INTERACTIVE','VLAMBEER','NO_BRAKES_GAMES','GHOST_SHIP_GAMES','IRON_GATE_STUDIO','INNERSLOTH','NINTENDO','HAL_LABORATORY','INTELLIGENT_SYSTEMS','MONOLITH_SOFT','RARE','RETRO_STUDIOS','NEXT_LEVEL_GAMES','NDCUBE','THE_1_UP_STUDIO','GAME_FREAK','CREATURES_INC','GREZZO','CAMELOT_SOFTWARE_PLANNING','SORA_LTD','VANPOOL','SEGA','WAYGORWARD','KOEI_TECMO_OMEGA_FORCE','KONAMI','SNK','ATARI','ID_SOFTWARE','ATLUS','VALVE','INFOGRAMES','LUCASARTS','THQ') DEFAULT 'NON_DEFINI',
  `src_image_jaquette` varchar(191) NOT NULL DEFAULT 'civ-7-jaquette.png',
  `src_image_jeu` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id_jeux`),
  UNIQUE KEY `Jeux_nom_key` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux`
--

LOCK TABLES `jeux` WRITE;
/*!40000 ALTER TABLE `jeux` DISABLE KEYS */;
INSERT INTO `jeux` VALUES
(1,'Hollow Knight : Silksong','images/hollow_knight_silksong.png','2050-12-11',NULL,NULL,NULL,NULL,NULL,'Il sortira un jour, je crois',NULL,'NINTENDO','TEAM_CHERRY','images/hollow_knight_silksong-jaquette.png',NULL),
(2,'Animal Crossing : New Horizons','images/acnh.png','2020-03-19',NULL,NULL,NULL,NULL,NULL,'Ce sont des animauxx',NULL,'NINTENDO','NINTENDO','images/acnh-jaquette.png',NULL),
(3,'Rayman 3','images/rayman3.png','2003-01-19',NULL,NULL,NULL,NULL,NULL,'C\'est un très bon jeu de plateformes 3D',NULL,'UBISOFT','UBISOFT','images/rayman3-jaquette.png',NULL),
(4,'Undertale','images/undertale.png','2015-09-14',NULL,NULL,NULL,NULL,NULL,'C\'est un jeu indé',NULL,'NON_DEFINI','TOBY_FOX','images/undertale-jaquette.png',NULL),
(6,'Red Dead Redemption','images/rdr.png','2010-05-18',NULL,NULL,NULL,NULL,NULL,'C\'est un jeu dans le Far-West',NULL,'NON_DEFINI','ROCKSTAR','images/rdr-jaquette.png',NULL),
(7,'Raft','images/raft.jpg','2018-05-23',NULL,NULL,NULL,NULL,NULL,'C\'est un radeau',NULL,'NON_DEFINI','NON_DEFINI','images/raft-jaquette.png',NULL),
(8,'Portal 2','images/portal2.png','2011-04-18',NULL,NULL,NULL,NULL,NULL,'C\'est des portails 2',NULL,'NON_DEFINI','VALVE','images/portal2-jaquette.png',NULL),
(9,'Metaphor : Refantazio','images/metaphor_refantazio.png','2024-10-11',100,NULL,NULL,NULL,NULL,'Le véritable GOTY 2024',NULL,'SEGA','ATLUS','images/metaphor-jaquette.png',NULL),
(10,'Persona 5 Royal','images/persona_5_royal.png','2019-10-31',NULL,NULL,NULL,NULL,NULL,'You never see it coming',NULL,'SEGA','ATLUS','images/persona5royal-jaquette.png',NULL),
(11,'Shin Megami Tensei V: Vengeance','images/shin_megami_tensei_vv.png','2024-06-14',NULL,NULL,NULL,NULL,NULL,'C\'est la réincarnation de la déesse de la mort 5 vengeance',NULL,'SEGA','ATLUS','images/shin_megami_tensei_vv-jaquette.png',NULL),
(12,'Valheim','images/valheim.png','2021-02-02',NULL,NULL,NULL,NULL,NULL,'C\'est des vikings',NULL,'NON_DEFINI','NON_DEFINI','images/valheim-jaquette.png',NULL),
(13,'Anno 1800','images/anno_1800.png','2019-04-16',NULL,NULL,NULL,NULL,NULL,'C\'est de la gestion au XVIIIème siècle',NULL,'UBISOFT','UBISOFT','images/anno_1800-jaquette.jpg',NULL),
(14,'The Legend of Zelda: Tears of the Kingdom','images/zeldatotk.png','2023-05-12',NULL,NULL,NULL,NULL,NULL,'C\'est Link il plane',NULL,'NINTENDO','NINTENDO','images/zeldatotk-jaquette.png',NULL),
(15,'The Legend of Zelda: Breath of the Wild','images/zeldabotw.png','2017-03-03',NULL,NULL,NULL,NULL,NULL,'C\'est Link il escalade',NULL,'NINTENDO','NINTENDO','images/zeldabotw-jaquette.png',NULL),
(16,'Hollow Knight','images/hollow_knight.png','2017-02-24',NULL,NULL,NULL,NULL,NULL,'C\'est des insectes',NULL,'NON_DEFINI','TEAM_CHERRY','images/hollow_knight-jaquette.png',NULL),
(17,'Super Mario Bros.','images/smb.png','1985-07-13',NULL,NULL,NULL,NULL,NULL,'Le jeu culte qui a popularisé Mario',NULL,'NINTENDO','NINTENDO','images/smb-jaquette.png',NULL),
(18,'The Forest','images/the_forest.png','2014-05-30',NULL,NULL,NULL,NULL,NULL,'C\'est un jeu de survie dans la forêt',NULL,'NON_DEFINI','NON_DEFINI','images/the_forest-jaquette.png',NULL),
(19,'Minecraft','images/minecraft.png','2011-11-18',NULL,NULL,NULL,NULL,NULL,'Juste le jeu le plus joué au monde',NULL,'MICROSOFT','MOJANG','images/minecraft-jaquette.jpg',NULL),
(20,'Sid Meier\'s Civilization VII','images/civ-7.jpg','2025-02-11',NULL,NULL,NULL,NULL,NULL,'Sid Meier\'s Civilization VII est un jeu vidéo de stratégie au tour par tour de type 4X et le septième opus de la série Civilization.',NULL,'NON_DEFINI','NON_DEFINI','images/civ7.png',NULL),
(21,'World of Warcraft','images/wow.png','2004-11-23',NULL,NULL,NULL,NULL,NULL,'World of Warcraft est un jeu vidéo de type MMORPG développé par la société Blizzard Entertainment.',NULL,'ACTIVISION_BLIZZARD','NON_DEFINI','images/wow-jaquette.png',NULL),
(22,'Elden Ring','images/elden_ring.jpg','2022-02-25',NULL,NULL,NULL,NULL,NULL,'Gagnant du GOTY 2022, Elden Ring est le frère spirituel de la saga des souls.',NULL,'BANDAI_NAMCO','FROM_SOFTWARE','images/elden_ring-jaquette.png',NULL),
(23,'Fire emblem: Three Houses','images/fe3h.png','2019-07-26',NULL,NULL,NULL,NULL,NULL,'Le choix des joueurs 2019, ce fire emblem réinvente la série et devient rapidement un classique incontournable de la Switch',NULL,'NINTENDO','INTELLIGENT_SYSTEMS','images/fe3h-jaquette.png',NULL),
(24,'Final Fantasy VII','images/final_fantasy_VII_classique.png','1997-01-31',NULL,NULL,NULL,NULL,NULL,'JRPG le plus populaire de tout les temps.',NULL,'SQUARE_ENIX','SQUARE_ENIX','images/final_fantasy_VII_classique-jaquette.png',NULL),
(25,'Grand Theft Auto: San Andreas','images/gtasa.png','2004-10-30',NULL,NULL,NULL,NULL,NULL,'Classique dans la série des GTA',NULL,'TAKE_TWO_INTERACTIVE','ROCKSTAR','images/gtasa-jaquette.png',NULL),
(26,'Grand Theft Auto V','images/gtav.png','2013-09-17',NULL,NULL,NULL,NULL,NULL,'Le cinquième opus de la saga GTA',NULL,'TAKE_TWO_INTERACTIVE','ROCKSTAR','images/gtav-jaquette.png',NULL),
(27,'Human Fall Flat','images/human_fall_flat.png','2016-07-22',NULL,NULL,NULL,NULL,NULL,'C\'est un humain qui tombe plat',NULL,'NON_DEFINI','NON_DEFINI','images/human_fall_flat-jaquette.png',NULL),
(28,'Astérix & Obélix XXL','images/asterix&obelixxxl.png','2003-11-21',NULL,NULL,NULL,NULL,NULL,'C\'est astérix et obélix qui sauvent tous leurs amis à travers le monde Romain (ils sont gros)',NULL,'NON_DEFINI','ATARI','images/asterix&obelixxxl-jaquette.png',NULL),
(29,'League of Legends','images/league_of_legends.jpg','2009-10-27',NULL,NULL,NULL,NULL,NULL,'C\'est un moba',NULL,'NON_DEFINI','NON_DEFINI','images/league_of_legends-jaquette.jpg',NULL),
(30,'Mario Kart 8 Deluxe','images/mk8d.png','2017-04-27',NULL,NULL,NULL,NULL,NULL,'Le jeu le plus vendu sur Nintendo Switch',NULL,'NINTENDO','NINTENDO','images/mk8d-jaquette.png',NULL),
(31,'Mario Kart Wii','images/mkw.png','2008-04-10',NULL,NULL,NULL,NULL,NULL,'Le jeu de course avec Mario sur Wii',NULL,'NINTENDO','NINTENDO','images/mkw-jaquette.png',NULL),
(32,'Kingdom Come: Deliverance','images/kcd.jpg','2018-02-13',NULL,NULL,NULL,NULL,NULL,'Audentes fortuna iuvat. la fortune souris au audacieux dans ce jeu incarnez un gueux qui a tout perdu suite à la guerre de succession qui se déroulait dans le Saint Empire Romain Germanique.',NULL,'NON_DEFINI','NON_DEFINI','images/kcd-jaquette.jpg',NULL);
/*!40000 ALTER TABLE `jeux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeuxaccueil`
--

DROP TABLE IF EXISTS `jeuxaccueil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jeuxaccueil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `champs` enum('NOUVEAUTE','CLASSIQUE','GRAND_CARROUSEL') NOT NULL,
  `id_jeux` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `JeuxAccueil_id_jeux_fkey` (`id_jeux`),
  CONSTRAINT `JeuxAccueil_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `jeux` (`id_jeux`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeuxaccueil`
--

LOCK TABLES `jeuxaccueil` WRITE;
/*!40000 ALTER TABLE `jeuxaccueil` DISABLE KEYS */;
INSERT INTO `jeuxaccueil` VALUES
(1,'GRAND_CARROUSEL',9),
(2,'GRAND_CARROUSEL',10),
(3,'GRAND_CARROUSEL',12),
(5,'CLASSIQUE',13),
(6,'NOUVEAUTE',3),
(7,'NOUVEAUTE',7),
(8,'CLASSIQUE',10),
(9,'NOUVEAUTE',4),
(10,'NOUVEAUTE',14),
(11,'CLASSIQUE',1),
(12,'CLASSIQUE',17),
(14,'GRAND_CARROUSEL',15);
/*!40000 ALTER TABLE `jeuxaccueil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ludotheque`
--

DROP TABLE IF EXISTS `ludotheque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ludotheque` (
  `id_utilisateur` int(11) NOT NULL,
  `id_jeux` int(11) NOT NULL,
  `statut` enum('NON_DEFINI','EN_COURS','ABANDON','PREVU','COMPLETE','EN_PAUSE') DEFAULT 'NON_DEFINI',
  `Type_completion` enum('NON_DEFINI','any_pourcent','main_plus_extra','completionniste','allStyle') DEFAULT 'NON_DEFINI',
  `commentaire` varchar(191) DEFAULT NULL,
  `note` double DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`,`id_jeux`),
  KEY `Ludotheque_id_jeux_fkey` (`id_jeux`),
  CONSTRAINT `Ludotheque_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `jeux` (`id_jeux`) ON UPDATE CASCADE,
  CONSTRAINT `Ludotheque_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ludotheque`
--

LOCK TABLES `ludotheque` WRITE;
/*!40000 ALTER TABLE `ludotheque` DISABLE KEYS */;
INSERT INTO `ludotheque` VALUES
(1,2,'COMPLETE','NON_DEFINI',NULL,NULL),
(1,3,'NON_DEFINI','NON_DEFINI',NULL,NULL),
(1,4,'EN_COURS','NON_DEFINI',NULL,NULL),
(1,7,NULL,'NON_DEFINI',NULL,NULL),
(1,8,'COMPLETE','NON_DEFINI',NULL,NULL),
(1,10,'PREVU','NON_DEFINI',NULL,NULL),
(3,1,'PREVU','NON_DEFINI',NULL,NULL),
(3,3,'COMPLETE','NON_DEFINI',NULL,NULL),
(3,7,'COMPLETE','NON_DEFINI',NULL,NULL),
(3,9,'COMPLETE','NON_DEFINI',NULL,NULL),
(3,10,'COMPLETE','NON_DEFINI',NULL,NULL),
(3,11,'COMPLETE','NON_DEFINI',NULL,NULL),
(3,12,'ABANDON','NON_DEFINI',NULL,NULL),
(3,13,'EN_PAUSE','NON_DEFINI',NULL,NULL),
(3,14,'EN_COURS','NON_DEFINI',NULL,NULL),
(3,15,'COMPLETE','NON_DEFINI',NULL,NULL);
/*!40000 ALTER TABLE `ludotheque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plateforme`
--

DROP TABLE IF EXISTS `plateforme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plateforme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_jeux` int(11) DEFAULT NULL,
  `nom` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Plateforme_id_jeux_fkey` (`id_jeux`),
  CONSTRAINT `Plateforme_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `jeux` (`id_jeux`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plateforme`
--

LOCK TABLES `plateforme` WRITE;
/*!40000 ALTER TABLE `plateforme` DISABLE KEYS */;
INSERT INTO `plateforme` VALUES
(1,1,'Nintendo Switch'),
(2,9,'PC'),
(3,9,'PS5'),
(4,10,'PC'),
(5,10,'Nintendo Switch'),
(6,10,'PS5'),
(7,10,'PS4'),
(8,10,'XBOX Series'),
(9,12,'PC'),
(10,3,'PC'),
(11,3,'PS2'),
(12,3,'PS3'),
(13,3,'XBOX 360'),
(14,3,'GameCube'),
(16,14,'Nintendo Switch'),
(18,13,'PC'),
(19,4,'PC'),
(20,4,'Nintendo Switch'),
(21,17,'NES'),
(22,18,'PC'),
(23,21,'PC'),
(24,22,'PS4'),
(25,22,'PS5'),
(26,22,'Xbox One'),
(27,22,'Xbox Series X'),
(28,22,'Xbox Series S'),
(29,22,'PC'),
(30,23,'Nintendo Switch'),
(31,24,'PS1'),
(32,24,'PS4'),
(33,24,'PC'),
(34,24,'Nintendo Switch'),
(35,24,'PSP'),
(36,24,'Xbox One'),
(37,24,'Android'),
(38,24,'iOS'),
(39,25,'PS2'),
(40,25,'PS3'),
(41,25,'PC'),
(42,25,'Nintendo Switch'),
(43,25,'Xbox'),
(44,25,'Xbox 360'),
(45,26,'PC'),
(46,26,'PS4'),
(47,26,'PS5'),
(48,28,'PC'),
(49,28,'GameCube'),
(50,28,'PS2'),
(51,30,'Nintendo Switch'),
(52,31,'Wii');
/*!40000 ALTER TABLE `plateforme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_jeux` int(11) DEFAULT NULL,
  `nom` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Tag_id_jeux_fkey` (`id_jeux`),
  CONSTRAINT `Tag_id_jeux_fkey` FOREIGN KEY (`id_jeux`) REFERENCES `jeux` (`id_jeux`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES
(1,9,'RPG'),
(2,10,'RPG'),
(3,10,'JRPG'),
(4,10,'Anime'),
(5,10,'Narration'),
(6,3,'Plateformes'),
(7,3,'Action'),
(9,13,'Gestion'),
(10,13,'Historique'),
(11,1,'Metroidvania'),
(12,1,'Souls Like'),
(13,1,'Plateformes'),
(15,14,'JRPG'),
(16,14,'Aventure'),
(17,14,'Action'),
(18,14,'Open World'),
(19,4,'RPG'),
(20,4,'Indépendant'),
(21,17,'Plateformes'),
(22,18,'Survie'),
(23,18,'Exploration'),
(24,18,'Zombie'),
(25,21,'MMORPG'),
(26,22,'Action'),
(27,22,'RPG'),
(28,22,'Souls Like'),
(29,22,'Open World'),
(30,23,'JRPG'),
(31,23,'Tactique'),
(32,23,'Stratégie'),
(33,23,'Anime'),
(34,23,'Médiéval'),
(35,23,'Guerre'),
(36,24,'JRPG'),
(37,24,'Stratégie Au Tour Par Tour'),
(38,25,'Action'),
(39,25,'Open World'),
(40,25,'Crime'),
(41,26,'Action'),
(42,26,'Open World'),
(43,26,'Crime'),
(44,28,'Plateformes'),
(45,28,'Action'),
(46,28,'Aventure'),
(47,30,'Course'),
(48,31,'Course');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(191) NOT NULL,
  `nom` varchar(191) DEFAULT NULL,
  `prenom` varchar(191) DEFAULT NULL,
  `date_naissance` datetime(3) DEFAULT NULL,
  `adresse_email` varchar(191) NOT NULL,
  `mot_de_passe` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `date_inscription` datetime(3) DEFAULT current_timestamp(3),
  `icone_profil` enum('Ico1','Ico2','Ico3','Ico4','Ico5','Ico6','Ico7','Ico8') NOT NULL DEFAULT 'Ico1',
  `role` enum('MEMBRE','ADMINISTRATEUR') NOT NULL DEFAULT 'MEMBRE',
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `Utilisateur_pseudo_key` (`pseudo`),
  UNIQUE KEY `Utilisateur_adresse_email_key` (`adresse_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES
(1,'jean-gamer',NULL,NULL,NULL,'jeangamer@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$qxtEeoI2PjvoRa487y4vXQ$5Do2fxF0cBNQHiVvxc/IXbCJrjClwLpmCIhykgPHAZc',NULL,'2025-03-11 14:02:57.733','Ico1','MEMBRE'),
(3,'Administrator',NULL,NULL,NULL,'admin@apipvl.com','$argon2id$v=19$m=65536,t=3,p=4$CheVbk75GB6U//GLyT14Gg$yH1esDyHf5ROpoJ63wC1GuELIqBNj/FBGzQePfDZ0ss',NULL,'2025-03-11 14:54:06.678','Ico1','ADMINISTRATEUR');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-03-24  9:50:50
