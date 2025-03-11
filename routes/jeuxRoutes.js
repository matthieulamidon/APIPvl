// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { TagEnum, PlateformeEnum } = require('@prisma/client'); // Import de l'enum Prisma

const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();
const prisma = new PrismaClient();


router.post('/TestPostJeu',
	[
	  body('nom').isLength({ min: 3, max: 40 }).withMessage('Le nom doit contenir entre 3 et 40 caractères.'),
	  body('src_image').isString(),
	  body('src_image_jaquette').isString(),
	  body('date_publication').isISO8601().withMessage('Date invalide').toDate(),

	  // Champs optionnels
	  body('src_image_jeu').optional(),
	  body('studio').optional(),
	  body('editeur').optional(),
	  body('note').optional().isFloat(),
	  body('any_pourcent').optional().isFloat(),
	  body('main_plus_extra').optional().isFloat(),
	  body('completionniste').optional().isFloat(),
	  body('allStyle').optional().isFloat(),
	  body('description').optional().isString(),
	  body('nb_favoris').optional().isInt(),
	],
	async (req, res, next) => {
		try {
		  const { nom, date_publication, src_image, src_image_jaquette, tags } = req.body;
	
		  if (!nom || !date_publication || !src_image) {
			return res.status(400).json({ error: 'Nom, date de publication et src_image sont obligatoires.' });
		  }
	
		  // Vérifier si le jeu existe déjà
		  const existingGame = await prisma.jeux.findUnique({ where: { nom } });
	
		  if (existingGame) {
			return res.status(400).json({ error: 'Un jeu avec ce nom existe déjà !' });
		  }
		  
		const data={nom,date_publication,src_image}
				  
		const optionalFields = ['studio', 'editeur','any_pourcent','note','main_plus_extra','completionniste','allStyle','nb_favoris','description'];
			optionalFields.forEach((field) => {
				if (req.body[field] !== undefined) {
				data[field] = req.body[field];
				}
		});

		// Création du jeu
		const jeu = await prisma.jeux.create({data});
	
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
});

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
        const { src_image, src_image_jaquette, src_image_jeu } = req.body;

        const jeuId = parseInt(id);
        if (isNaN(jeuId)) {
            return res.status(400).json({ message: "ID invalide " });
        }

        // Création d'un objet de mise à jour dynamique (évite d'écraser `data`)
        const updateData = {};
        if (src_image) updateData.src_image = src_image;
        if (src_image_jaquette) updateData.src_image_jaquette = src_image_jaquette;
        if (src_image_jeu) updateData.src_image_jeu = src_image_jeu;

        // Vérifier si au moins un champ est fourni
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Aucune donnée à mettre à jour" });
        }

        // Mise à jour dans la base de données
        const updatedTest = await prisma.jeux.update({
            where: { id_jeux: jeuId },
            data: updateData,
        });

        res.status(200).json({
            message: "Enregistrement mis à jour avec succès",
            data: updatedTest,
        });
    } catch (err) {
        next(err); // Gestion des erreurs centralisé
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

router.get('/chargementPageDeJeu/:nom', async (req, res) => {
    try {
		console.log("test"); // Debugging

        let { nom } = req.params;

        if (!nom) {
            return res.status(400).json({ message: "Nom du jeu requis" });
        }

        console.log("Recherche du jeu :", nom); // Debugging

        // Recherche du jeu en ignorant la casse (insensitive)
        const jeu = await prisma.jeux.findFirst({
			where: {
				nom: {
					contains: nom, // Recherche approximative
				},
			},
			include: {
				plateformes: true,
				tags: true,
			},
		});
		
        if (!jeu) {
            return res.status(404).json({ message: "Jeu non trouvé" });
        }

        console.log("Jeu trouvé :", jeu); // Debugging

        // Formater la réponse
        const response = {
            nom: jeu.nom,
            src_image: jeu.src_image || "default-image.png",
            src_image_jaquette: jeu.src_image_jaquette || "default-jaquette.png",
            src_image_jeu: jeu.src_image_jeu || "default-game.png",
            date_de_sortie: jeu.date_publication ? jeu.date_publication.toISOString().split("T")[0] : "Date inconnue",
            studio: jeu.studio || "Non défini",
            editeur: jeu.editeur || "Non défini",
            note: jeu.note || "N/A",
            description: jeu.description || "Aucune description disponible",
            temps: {
                any_percent: jeu.any_pourcent || 0,
                main_plus_extra: jeu.main_plus_extra || 0,
                completioniste: jeu.completionniste || 0,
                all_styles: jeu.allStyle || 0,
            },
            plateformes: jeu.plateformes ? jeu.plateformes.map(p => p.nom) : [],
            tags: jeu.tags ? jeu.tags.map(t => t.nom) : [],
        };

        res.json(response);
    } catch (error) {
        console.error("Erreur lors de la récupération du jeu :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});



module.exports = router;
