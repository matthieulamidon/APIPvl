const { PrismaClient } = require("@prisma/client");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const SECRET_KEY = "zelda-oot-est-un jeu-banger"; 
const authenticateJWT = require('../middlewares/authenticateJWT');

async function main() {
  const motDePasseHash = await argon2.hash("Ceci est le mot de passe admin");

  await prisma.utilisateur.upsert({
    where: { adresse_email: "admin@apipvl.com" },
    update: {}, // Ne change rien s'il existe déjà
    create: {
      adresse_email: "admin@apipvl.com",
      mot_de_passe: motDePasseHash,
      pseudo: "Administrator",
      role: "ADMINISTRATEUR",
    },
  });

  console.log("Admin créé avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });