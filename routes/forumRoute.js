/*
* Nom: forumRoute.js
* Description: il contiennt les routes pour tout ce qui est lier au commentaire et au forum
* Auteur: Matthieu Lamidon
* Version: 1.0.6
* Dernière modification: 2025-03-05
*/

// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { TagEnum, PlateformeEnum } = require('@prisma/client'); // Import de l'enum Prisma

const router = express.Router();
const prisma = new PrismaClient();

// Route pour ajouter un commentaire
router.post('/commentaire',
    [
        // Champs obligatoires
        body('pseudo')
            .isLength({ min: 3, max: 20 })
            .withMessage('Le pseudo doit contenir entre 3 et 20 caractères.'),

        body('nom').isString().withMessage("Le nom du jeu est requis."),
        body('titre').isString().isLength({ min: 3, max: 120 }),
        body('description').isString().isLength({ min: 3, max: 240 }),
    ],
    async (req, res, next) => {
        try {
            console.log("Tentative de création de commentaire");

            // Extraction des champs
            const { pseudo, nom, titre, description } = req.body;

            // Vérifier si l'utilisateur existe
            const utilisateur = await prisma.utilisateur.findUnique({
                where: { pseudo }
            });
            if (!utilisateur) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            }

            // Vérifier si le jeu existe
            const jeu1 = await prisma.jeux.findUnique({
                where: { nom }
            });
            if (!jeu1) {
                return res.status(404).json({ error: "Jeu non trouvé." });
            }

            const data = { 
                id_utilisateur: utilisateur.id_utilisateur, 
                id_jeux: jeu1.id_jeux, 
                titre, 
                commentaire: description 
            };

            // Création du commentaire
            const laisseruncommentaire = await prisma.forum.create({ data });

            res.status(201).json(laisseruncommentaire);
        } catch (err) {
            next(err); // Gestion des erreurs
        }
    }
);

// Route pour verifier si un utilisateur a laissé un commentaire sur un jeu
router.get('/laissercommentaire/:pseudo/:jeu', async (req, res, next) => {
  try {
      const { pseudo } = req.params;
      const { jeu } = req.params;
      const utilisateur = await prisma.utilisateur.findUnique({
          where: { pseudo } // Chercher un utilisateur avec ce nom
      });
      const jeu1 = await prisma.jeux.findUnique({
          where: { nom: jeu }
      });
      
      // Vérifier si l'utilisateur a laissé un commentaire sur ce jeu
      const tests = await prisma.forum.findMany({
        where: { 
            id_utilisateur: utilisateur.id_utilisateur,
            id_jeux: jeu1.id_jeux
        }
    });

    res.json(!!tests); // Retourne `true` si trouvé, `false` sinon
} catch (err) {
    console.error(err); // Afficher l'erreur dans la console
    res.json(false);
}
});

module.exports = router;