// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { TagEnum, PlateformeEnum } = require('@prisma/client'); // Import de l'enum Prisma

const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();
const prisma = new PrismaClient();


router.post(
	'/TestPostJeu',
	[
	  body('nom').isLength({ min: 3, max: 40 }).withMessage('Le nom doit contenir entre 3 et 40 caractères.'),
	  body('src_image').isString(),
	  body('date_publication').isISO8601().withMessage('Date invalide').toDate(),

	  // Champs optionnels
	  body('studio').optional(),
	  body('editeur').optional(),
	  body('note').optional().isFloat(),
	  body('any_pourcent').optional().isFloat(),
	  body('main_plus_extra').optional().isFloat(),
	  body('completionniste').optional().isFloat(),
	  body('allStyle').optional().isFloat(),
	  body('description').optional().isString(),
	  body('nb_favoris').optional().isInt()
	],
	async (req, res, next) => {
		try {
		  const { nom, date_publication, src_image, tags } = req.body;
	
		  if (!nom || !date_publication || !src_image) {
			return res.status(400).json({ error: 'Nom, date de publication et src_image sont obligatoires.' });
		  }
	
		  // Vérifier si le jeu existe déjà
		  const existingGame = await prisma.jeux.findUnique({ where: { nom } });
	
		  if (existingGame) {
			return res.status(400).json({ error: 'Un jeu avec ce nom existe déjà !' });
		  }
	
		  // Création du jeu
		  const jeu = await prisma.jeux.create({
			data: {
			  nom,
			  date_publication,
			  src_image
			}
		  });
	
		  // Associer les tags existants
		  if (tags && Array.isArray(tags)) {
			// Convertir les tags en valeurs de `TagEnum`
			console.log('Tags reçus:', tags);
			console.log('Valeurs enum:', Object.values(TagEnum));

			const tagEnumValues = tags.map(tag => TagEnum[tag.toUpperCase()]).filter(Boolean);
	
			if (tagEnumValues.length === 0) {
			  return res.status(400).json({ error: 'Aucun tag valide trouvé.' });
			}
	
			const existingTags = await prisma.tag.findMany({
			  where: { name: { in: tagEnumValues } }
			});
	
			await prisma.tagJeu.createMany({
			  data: existingTags.map(tag => ({
				tagId: tag.id,
				jeuId: jeu.id_jeux
			  }))
			});
		  }
	
		  res.status(201).json({ success: true, jeu });
		} catch (err) {
		  next(err);
		}
	  }
	);

  // Route pour récupérer le contenu de la table Jeux
router.get('/TestGetJeux', async (req, res, next) => {
	try {
		const tests = await prisma.Jeux.findMany();
		res.json(tests);
	} catch (err) {
		next(err); // Passe l'erreur au gestionnaire centralisé
	}
});

// Exemple : route pour récupérer le contenu d'un TableTest private
router.get('/private', async (req, res, next) => {
try {
const tests = await prisma.tableTest.findMany();
res.json(tests);
} catch (err) {
next(err); // Passe l'erreur au gestionnaire centralisé
}
});

// Route pour mettre à jour l'image d'un Jeu
router.patch('/PatchImg/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { src_image } = req.body;
		const updatedTest = await prisma.Jeux.update({
		where: { id_jeux: parseInt(id) },
		data: { src_image },
		});
		res.status(200).json({ message: 'Enregistrement mis à jour avec succès',
		data: updatedTest });
		} catch (err) {
	next(err); // Passe l'erreur au gestionnaire centralisé
 }
});

// Route pour mettre à jour le studio
router.patch('/PatchStudio/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { studio } = req.body;
		const updatedTest = await prisma.Jeux.update({
		where: { id_jeux: parseInt(id) },
		data: { studio },
		});
		res.status(200).json({ message: 'Enregistrement mis à jour avec succès',
		data: updatedTest });
		} catch (err) {
	next(err); // Passe l'erreur au gestionnaire centralisé
 }
});

router.post('/addTag',
[
	body('nom').isString(),
	body('id_jeux').isInt(),
],
async (req, res) => {
try {

	const { id_jeux, nom } = req.body; // Récupérer l'ID du jeu et le nom du tag depuis le corps de la requête

	if (!id_jeux || !nom) {
		return res.status(400).json({ error: "Les champs 'id_jeux' et 'nom' sont requis" });
	}

	// Ajouter un tag dans la base de données
	const newTag = await prisma.tag.create({
		data: {
			id_jeux: id_jeux,
			nom: nom,
		},
	});

	res.status(201).json(newTag);  // Retourner le tag ajouté
} catch (error) {

}
});

router.post('/addPlateforme',
	[
		body('nom').isString(),
		body('id_jeux').isInt(),
	],
	async (req, res) => {
	try {
	
		const { id_jeux, nom } = req.body; // Récupérer l'ID du jeu et le nom du tag depuis le corps de la requête
	
		if (!id_jeux || !nom) {
			return res.status(400).json({ error: "Les champs 'id_jeux' et 'nom' sont requis" });
		}
	
		// Ajouter un tag dans la base de données
		const nouvPlat = await prisma.plateforme.create({
			data: {
				id_jeux: id_jeux,
				nom: nom,
			},
		});
	
		res.status(201).json(nouvPlat);  // Retourner le tag ajouté
	} catch (error) {
	
	}
	});

router.get('/TestGetTags', async (req, res, next) => {
    try {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    } catch (err) {
        console.error("Erreur lors de la récupération des tags :", err);
        res.status(500).json({ error: "Erreur serveur lors de la récupération des tags" });
        next(err);
    }
});

router.get('/TestGetPlateformes', async (req, res, next) => {
    try {
        const tags = await prisma.plateforme.findMany();
        res.json(tags);
    } catch (err) {
        console.error("Erreur lors de la récupération des tags :", err);
        res.status(500).json({ error: "Erreur serveur lors de la récupération des tags" });
        next(err);
    }
});



module.exports = router;
