/*
* Nom: adminRoute.js
* Description: il contiennt les routes pour tout ce qui conserne les actions des administateurs sur la page d'acueil mais pas sur les jeux
* Auteur: Matthieu Lamidon 
* Version: 1.0.6
* Dernière modification: 2025-03-18
*/
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const isAdmin = require("../middlewares/isAdmin");
const { PrismaClient } = require('@prisma/client');
const { TagEnum, PlateformeEnum } = require('@prisma/client'); // Import de l'enum Prisma

const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();
const prisma = new PrismaClient();


//fait en sorte que le jeu choisis est afficher dans l'accueil
router.post('/affecterALAccueil', 
    [
      body('nom').isLength({ min: 3, max: 40 }).withMessage('Le nom doit contenir entre 3 et 40 caractères.'),
      body('type').not().isEmpty().withMessage('Le type doit être renseigné'), // Validation pour 'type'
    ],
    isAdmin,
    async (req, res, next) => {
        try {
            const { nom, type } = req.body;

            if (!nom || !type) {
                return res.status(400).json({ error: 'Le nom et le type du jeu doivent impérativement être remplis' });
            }
            console.log("Tentative de lier un jeu à l'accueil");

            // Vérifier si le jeu existe déjà
            const jeu1 = await prisma.jeux.findUnique({
                where: { nom: nom } // Utilise 'nom' ici au lieu de 'jeu'
            });

            if (!jeu1) {
                return res.status(404).json({ error: "Jeu non trouvé." });
            }

            // Vérifier si le jeu existe déjà dans la table d'accueil
            const existingGame = await prisma.jeux.findFirst({
                where: {
                    nom: {
                        contains: nom, // Recherche approximative
                    },
                }});
            console.log("le jeu est deja dans la table d'accueil", existingGame);

            //if (existingGame) {
            //    return res.status(400).json({ error: 'Le jeu est déjà affecté à la page d\'accueil.' });
            //}

            // Création du jeu dans la table JeuxAccueil
            const data = { 
                champs: type, 
                id_jeux: existingGame.id_jeux
            };

            const jeu = await prisma.jeuxAccueil.create({
                data
            });

            res.status(201).json({ success: true, jeu });
        } catch (err) {
            next(err);
        }
});

//permet de recuperer le nom des jeux a afficher dans la page d'accueil pour la page admin
router.get('/afficherLesJeuxDeLaPageDAccueil/:type', async (req, res, next) => {
    console.log("Route appelée avec : ", req.params);
    try {
        const { type } = req.params;  // Récupère le paramètre 'type'

        console.log("Type : ", type);  // Affiche la valeur de 'type'

        // Assurez-vous que 'type' est bien une valeur valide dans l'énumération
        const accueil = await prisma.jeuxAccueil.findMany({
            where: {
                champs: type.toUpperCase() // Assurez-vous que la valeur est en majuscule si nécessaire
            }
        });

        if (accueil.length === 0) {
            return res.json({ error: "Il n'y a rien d'enregistré dans la base de données" });
        }
    
        console.log("Jeux trouvés :", accueil);
        res.json(accueil);
    } catch (err) {
        console.error("Erreur :", err);
        res.json({ error: "Erreur lors de la récupération des jeux." });
    }
});

//permet de recuperer le nom et les image des jeux a afficher dans la page d'accueil pour la page accueil 
router.get('/recuperationPourLAccueil/:type', async (req, res, next) => {
    console.log("Route appelée avec : ", req.params);
    try {
        const { type } = req.params;  // Récupère le paramètre 'type'

        console.log("Type : ", type);  // Affiche la valeur de 'type'

        // Assurez-vous que 'type' est bien une valeur valide dans l'énumération
        const accueil = await prisma.jeuxAccueil.findMany({
            where: {
                champs: type.toUpperCase() // Assurez-vous que la valeur est en majuscule si nécessaire
            },
            include: {
                jeu: {
                    select: {
                        nom: true,         // Nom du jeu
                        src_image: true    // Lien vers l'image du jeu (utilisez le bon nom ici)
                    }
                }
            }
        });

        if (accueil.length === 0) {
            return res.json({ error: "Il n'y a rien d'enregistré dans la base de données" });
        }

        // Transformer le résultat pour renvoyer uniquement les informations nécessaires
        const jeuxAvecInfos = accueil.map(item => ({
            nom: item.jeu.nom,         // Nom du jeu
            src_img: item.jeu.src_image // Lien vers l'image du jeu (assurez-vous que le champ est correct)
        }));

        console.log("Jeux trouvés :", jeuxAvecInfos);
        res.json(jeuxAvecInfos); // Renvoyer le résultat avec le nom du jeu et le lien vers l'image
    } catch (err) {
        console.error("Erreur :", err);
        res.json({ error: "Erreur lors de la récupération des jeux." });
    }
});

//fait en sorte que le jeu choisis estuprimer de l'affichage de l'accueil
router.delete('/supprimerJeuDeLaPageDAccueil/:type/:nom', isAdmin, async (req, res, next) => {
    try {
        const { type, nom } = req.params;

        if (!nom || !type) {
            return res.status(400).json({ error: 'Le nom et le type du jeu doivent être fournis.' });
        }

        console.log("Tentative de suppression d'un jeu de la page d'accueil.");

        // Trouver l'ID du jeu dans la table 'jeux'
        const jeu = await prisma.jeux.findUnique({
            where: { nom }
        });

        if (!jeu) {
            return res.status(404).json({ error: "Jeu non trouvé." });
        }

        // Trouver l'entrée spécifique dans 'jeuxAccueil'
        const jeuAccueil = await prisma.jeuxAccueil.findFirst({
            where: {
                id_jeux: jeu.id_jeux,
                champs: type
            }
        });

        if (!jeuAccueil) {
            return res.status(404).json({ error: "Le jeu n'est pas affiché sur la page d'accueil." });
        }

        // Suppression en utilisant l'ID unique
        await prisma.jeuxAccueil.delete({
            where: { id: jeuAccueil.id }
        });

        return res.json({ success: true, message: `Le jeu '${nom}' a été retiré de la page d'accueil.` });

    } catch (err) {
        console.error("Erreur lors de la suppression du jeu de la page d'accueil :", err);
        next(err); // Gère l'erreur proprement via le middleware d'erreur
    }
});

module.exports = router;