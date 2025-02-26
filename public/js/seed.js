const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedTags() {
  const tags = [
    'NON_DEFINI',
    'ACTION',
    'RPG',
    'PLATEFORMES',
    'FPS',
    'TPS',
    'RTS',
    'HACK_N_SLASH',
    'BEAT_THEM_UP',
    'OPEN_WORLD',
    'METROIDVANIA',
    'POINT_AND_CLICK',
    'TOUR_PAR_TOUR',
    'ROGUE_LIKE',
    'ROGUE_LITE',
    'GESTION',
    'COURSE',
    'SPORT',
    'COMBAT',
    'QUATREX',
    'MOBA',
    'MUSOU',
    'NARRATIF',
    'VISUAL_NOVEL',
    'SURVIE',
    'BAC_A_SABLE',
    'MMORPG',
    'TACTICAL',
    'VR',
    'ENIGMES',
    'TOWER_DEFENSE',
    'CITY_BUILDER',
    'FARMING',
    'IDLE',
    'SIMULATION',
    'HORREUR',
    'RETRO',
    'NEO_RETRO',
    'INDEPENDANT',
    'RYTHME',
    'BATTLE_ROYALE',
    'SHOOT_THEM_UP',
    'ANIME',
    'JEU_DE_CARTES',
    'INFILTRATION',
    'HUMOUR',
    'LICENSE',
    'PARTY_GAME',
    'RAIL_SHOOTER',
    'GUERRE',
    'JRPG',
    'SOULS_LIKE',
  ];

  // Insérer chaque tag dans la table Tag
  for (let tagName of tags) {
    await prisma.Tag.create({
      data: {
        name: tagName, // Insère chaque valeur de l'énumération dans le champ name
      },
    });
  }

  console.log('Tags insérés avec succès');
}

seedTags()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });