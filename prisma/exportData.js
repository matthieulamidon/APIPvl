/*
* Nom: exportData.js
* Description: permet d'exporter sa bdd
* Auteur: Matthieu Lamidon 
* Version: 1.0.6
* Dernière modification: 2025-03-18
*/

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function exportData() {
    try {
        const utilisateurs = await prisma.utilisateur.findMany();
        const jeux = await prisma.jeux.findMany();
        const forums = await prisma.forum.findMany();
        const ludotheques = await prisma.ludotheque.findMany();
        const amis = await prisma.ami.findMany();
        const tags = await prisma.tag.findMany();
        const plateformes = await prisma.plateforme.findMany();
        const jeuxAccueil = await prisma.jeuxAccueil.findMany();

        const data = {
            utilisateurs,
            jeux,
            forums,
            ludotheques,
            amis,
            tags,
            plateformes,
            jeuxAccueil
        };

        fs.writeFileSync('export.json', JSON.stringify(data, null, 4), 'utf8');
        console.log("✅Exportation réussie ! Données enregistrées dans export.json");
    } catch (error) {
        console.error("❌Erreur lors de l'exportation :", error);
    } finally {
        await prisma.$disconnect();
    }
}

exportData();
