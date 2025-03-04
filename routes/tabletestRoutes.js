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
	'/TestPostUser',
	[
	  // Champs obligatoires
	  body('pseudo')
		.isLength({ min: 3, max: 20 })
		.withMessage('Le pseudo doit contenir entre 3 et 20 caractères.'),
		
	  body('adresse_email')
		.isEmail()
		.withMessage('Email invalide'),
  
	  body('mot_de_passe')
		.isLength({ min: 6 })
		.withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
  
	  // Champs optionnels
	  body('nom').optional().isString(),
	  body('prenom').optional().isString(),
	  body('description').optional().isString(),
	  body('date_de_naissance').optional(),
	  body('icone_profil').optional(),
	],
	async (req, res, next) => {
	  try {
		// Vérification des erreurs de validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}
  
		// Extraction des champs obligatoires
		const { pseudo, adresse_email, mot_de_passe } = req.body;
  
		// Vérification stricte des champs obligatoires
		if (!pseudo || !adresse_email || !mot_de_passe) {
		  return res.status(400).json({ error: 'Pseudo, adresse_email et mot_de_passe sont obligatoires.' });
		}
  
		// Construction de l'objet data avec les champs obligatoires
		const data = { pseudo, adresse_email, mot_de_passe };
  
		// Ajout des champs optionnels s'ils existent dans req.body
		const optionalFields = ['nom', 'prenom', 'description', 'date_de_naissance', 'icone_profil'];
		optionalFields.forEach((field) => {
		  if (req.body[field] !== undefined) {
			data[field] = req.body[field];
		  }
		});
  
		// Création de l'utilisateur dans la base de données
		const utilisateur = await prisma.Utilisateur.create({ data });
  
		res.status(201).json(utilisateur);
	  } catch (err) {
		next(err); // Gestion des erreurs
	  }
	}
  );

// Exemple : route pour récupérer le contenu d'un TableTest
router.get('/TestGetUser', async (req, res, next) => {
	try {
		const tests = await prisma.Jeux.findMany();
		res.json(tests);
	} catch (err) {
		next(err); // Passe l'erreur au gestionnaire centralisé
	}
});

router.post(
	'/TestPostJeu',
	[
	  body('nom').isLength({ min: 3, max: 40 }).withMessage('Le nom doit contenir entre 3 et 40 caractères.'),
	  body('src_image').isString(),
	  body('date_publication').isISO8601().withMessage('Date invalide').toDate(),

	  // Champs optionnels
	  body('tags').optional().isArray(),
	  body('studio').optional(),
	  body('plateformes').optional().isArray(),
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

  // Exemple : route pour récupérer le contenu d'un TableTest
router.get('/TestGetJeux', async (req, res, next) => {
	try {
		const tests = await prisma.Jeux.findMany();
		res.json(tests);
	} catch (err) {
		next(err); // Passe l'erreur au gestionnaire centralisé
	}
});

// Exemple : route pour récupérer le contenu d'un TableTest
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

// Exemple : route pour mettre à jour un TableTest
router.put('/Tata/:id', async (req, res, next) => {
	try {
	const { id } = req.params;
	const { nameTest, emailTest } = req.body;
	const updatedTest = await prisma.tableTest.update({
	where: { idTest: parseInt(id) },
	data: { nameTest, emailTest },
	});
	res.status(200).json({ message: 'Enregistrement mis à jour avec succès',
	data: updatedTest });
	} catch (err) {
	next(err); // Passe l'erreur au gestionnaire centralisé
	}

});

// Exemple : route pour mettre à jour emailTest d'un TableTest
router.patch('/Tete/:id', async (req, res, next) => {
	try {
	const { id } = req.params;
	const { emailTest } = req.body;
	const updatedTest = await prisma.tableTest.update({
	where: { idTest: parseInt(id) },
	data: { emailTest },
	});
	res.status(200).json({ message: 'Enregistrement mis à jour avec succès',
	data: updatedTest });
	} catch (err) {
	next(err); // Passe l'erreur au gestionnaire centralisé
	}


});

// Exemple : route pour supprimer un enregistrement de TableTest
router.delete('/Tutu/:id', async (req, res, next) => {
	try {
	const { id } = req.params;
	const deletedTest = await prisma.tableTest.delete({
	where: { idTest: parseInt(id) },
	});
	res.json({ message: 'Test supprimé avec succès', deletedTest });
	} catch (err) {
	next(err); // Passe l'erreur au gestionnaire centralisé
	}

});


module.exports = router;