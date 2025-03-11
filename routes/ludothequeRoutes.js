// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { TagEnum, PlateformeEnum } = require('@prisma/client'); // Import de l'enum Prisma

const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/TestPostLudotheque',
	[
	  // Champs obligatoires
	  body('id_utilisateur')
		.isInt()
		.withMessage('L\'Id utilisateur est incorrecte'),
		
	  body('id_jeux')
		.isInt()
		.withMessage('L\'Id jeu est invalide'),
  
	  // Champs optionnels
	  body('statut').optional(),
	  body('type_completion').optional(),
	  body('commentaire').optional().isString(),
	  body('note').optional().isFloat()
	],
	async (req, res, next) => {
	  try {
		// Vérification des erreurs de validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}
  
		// Extraction des champs obligatoires
		const { id_utilisateur, id_jeux } = req.body;
  
		// Vérification stricte des champs obligatoires
		if (!id_utilisateur || !id_jeux) {
		  return res.status(400).json({ error: 'Veuillez renseigner l\'id d\'un jeu et d\'un utilisateur valides' });
		}
  
		// Construction de l'objet data avec les champs obligatoires
		const data = { id_utilisateur, id_jeux };
  
		// Ajout des champs optionnels s'ils existent dans req.body
		const optionalFields = ['statut', 'type_completion','commentaire','note'];
		optionalFields.forEach((field) => {
		  if (req.body[field] !== undefined) {
			data[field] = req.body[field];
		  }
		});
  
		// Création de l'utilisateur dans la base de données
		const nouvLudotheque = await prisma.ludotheque.create({ data });
  
		res.status(201).json(nouvLudotheque);
	  } catch (err) {
		next(err); // Gestion des erreurs
	  }
	});

    // Route pour récupérer le contenu de la table Ludotheque
router.get('/TestGetLudo', async (req, res, next) => {
	try {
		const tests = await prisma.ludotheque.findMany();
		res.json(tests);
	} catch (err) {
		next(err); // Passe l'erreur au gestionnaire centralisé
	}
});

// Route pour récupérer le contenu de la table Ludotheque d'un utilisateur
router.get('/TestGetLudoU/:id', async (req, res, next) => {
    try {
        const { id } = req.params; 
        const tests = await prisma.ludotheque.findMany({
            where: { id_utilisateur: parseInt(id) }
        });
        res.json(tests);
    } catch (err) {
        next(err); // Passe l'erreur au gestionnaire centralisé
    }
});

// Route pour supprimer un enregistrement de Ludotheque
router.delete('/DeleteLudo/:id1/:id2', async (req, res, next) => {
    try {
        const { id1, id2 } = req.params; 
        const deletedTest = await prisma.ludotheque.delete({
            where: { 
                id_utilisateur_id_jeux: { 
                    id_utilisateur: parseInt(id1), 
                    id_jeux: parseInt(id2)
                }
            }
        });

        res.json({ message: 'Enregistrement supprimé avec succès', deletedTest });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).json({ error: "Impossible de supprimer cet enregistrement." });
    }
});

// Route pour mettre à jour le statut d'un jeu dans la ludothèque
router.patch('/PatchStatutLudo/:id1/:id2', async (req, res, next) => {
    try {
        const { id1, id2 } = req.params; 
        const { statut } = req.body;
        const updatedTest = await prisma.ludotheque.update({
            where: { 
                id_utilisateur_id_jeux: { 
                    id_utilisateur: parseInt(id1), 
                    id_jeux: parseInt(id2)
                }
            },
        data: { statut },
        });
        res.status(200).json({ message: 'Enregistrement mis à jour avec succès',
        data: updatedTest });
        } catch (err) {
    next(err); // Passe l'erreur au gestionnaire centralisé
 }
});

router.get('/getid/:pseudo', async (req, res, next) => {
    try {
        const { pseudo } = req.params;

        const utilisateur = await prisma.utilisateur.findUnique({
            where: { pseudo } // Chercher un utilisateur avec ce nom
        });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json(utilisateur.id_utilisateur);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération de l'utilisateur" });
    }
});


router.get('/appartient/:pseudo/:jeu', async (req, res, next) => {
  try {
      const { pseudo } = req.params;
      const { jeu } = req.params;
      const utilisateur = await prisma.utilisateur.findUnique({
          where: { pseudo } // Chercher un utilisateur avec ce nom
      });
      const jeu1 = await prisma.jeux.findUnique({
          where: { nom: jeu }
      });
      const tests = await prisma.ludotheque.findMany({
        where: { 
          id_utilisateur_id_jeux: { 
              id_utilisateur: parseInt(utilisateur.id_utilisateur), 
              id_jeux: parseInt(jeu1.id_jeux)
          }
      }
      });
      res.json(true);
  } catch (err) {
      res.json(false);
      //next(err); // Passe l'erreur au gestionnaire centralisé
  }
});


module.exports = router;