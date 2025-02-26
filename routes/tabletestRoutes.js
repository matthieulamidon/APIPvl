// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const { PrismaClient } = require('@prisma/client');

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
	  // Champs obligatoires
	  body('nom')
		.isLength({ min: 3, max: 40 })
		.withMessage('Le nom doit contenir entre 3 et 40 caractères.'),
		
	  body('date_publication')
	  	.isISO8601() // Valide un datetime au format ISO 8601
      	.withMessage('Date invalide')
      	.toDate(), // Convertit automatiquement en objet Date valide si possible
	  // Champs optionnels
	  body('src_image').optional().isString(),
	  body('tags').optional(),
	  body('studio').optional(),
	  body('plateformes').optional(),
	  body('editeur').optional(),
	  body('note').optional(),
	  body('any_pourcent').optional(),
	  body('main_plus_extra').optional(),
	  body('completionniste').optional(),
	  body('allStyle').optional(),
	  body('description').optional(),
	  body('nb_favoris').optional()
	],
	async (req, res, next) => {
	  try {
		// Vérification des erreurs de validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}
  
		// Extraction des champs obligatoires
		const { nom, date_publication } = req.body;
  
		// Vérification stricte des champs obligatoires
		if (!nom || !date_publication) {
		  return res.status(400).json({ error: 'Nom et date de publication sont obligatoires.' });
		}
  
		// Construction de l'objet data avec les champs obligatoires
		const data = { nom, date_publication };
  
		// Ajout des champs optionnels s'ils existent dans req.body
		const optionalFields = ['src_image', 'tags', 'studio', 'plateformes', 'editeur','note','any_pourcent','main_plus_extra','completionniste','allStyle','description','nb_favoris'];
		optionalFields.forEach((field) => {
		  if (req.body[field] !== undefined) {
			data[field] = req.body[field];
		  }
		});
  
		// Création de l'utilisateur dans la base de données
		const jeu = await prisma.Jeux.create({ data });
  
		res.status(201).json(jeu);
	  } catch (err) {
		next(err); // Gestion des erreurs
	  }
	}
  );

// Exemple : route pour récupérer le contenu d'un TableTest
router.get('/private', async (req, res, next) => {
try {
const tests = await prisma.tableTest.findMany();
res.json(tests);
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