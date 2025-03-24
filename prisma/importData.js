const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function importData() {
    try {
        if (!fs.existsSync('export.json')) {
            console.error("❌ Fichier export.json introuvable !");
            return;
        }

        const data = JSON.parse(fs.readFileSync('export.json', 'utf8'));

        console.log("🚨 Suppression des données existantes...");
        await prisma.ludotheque.deleteMany();
        await prisma.forum.deleteMany();
        await prisma.jeuxAccueil.deleteMany();
        await prisma.plateforme.deleteMany();
        await prisma.tag.deleteMany();
        await prisma.ami.deleteMany();
        await prisma.utilisateur.deleteMany();
        await prisma.jeux.deleteMany();

        console.log("✅ Base de données vidée avec succès !");

        console.log("📥 Importation des nouvelles données...");
        await prisma.utilisateur.createMany({ data: data.utilisateurs });
        await prisma.ami.createMany({ data: data.amis });
        await prisma.jeux.createMany({ data: data.jeux });
        await prisma.forum.createMany({ data: data.forums });
        await prisma.ludotheque.createMany({ data: data.ludotheques });
        await prisma.tag.createMany({ data: data.tags });
        await prisma.plateforme.createMany({ data: data.plateformes });
        await prisma.jeuxAccueil.createMany({ data: data.jeuxAccueil });

        console.log("✅ Importation réussie !");

    } catch (error) {
        console.error("❌ Erreur d'importation :", error);
    } finally {
        await prisma.$disconnect();
    }
}

importData();
