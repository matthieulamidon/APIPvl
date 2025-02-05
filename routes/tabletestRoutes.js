// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();
const prisma = new PrismaClient();



router.post('/Toto', [body('nameTest').isLength({ min: 6 }).withMessage('Le nom doit contenir au moins 6 caractères')], [body('emailTest').notEmpty().withMessage('Emailinvalide')], authenticateJWT, async (req, res, next) => {
    try {
        // Vérification des erreurs de validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

        const { nameTest, emailTest } = req.body;
        const tablet = await prisma.tableTest.create({
        data: { nameTest, emailTest },
        });
        res.status(201).json(tablet);
    } catch (err) {
    next(err); // Passe l'erreur au gestionnaire centralisé
 }
});

// Exemple : route pour récupérer le contenu d'un TableTest
router.get('/Titi', authenticateJWT, async (req, res, next) => {
	try {
		const tests = await prisma.tableTest.findMany();
		res.json(tests);
	} catch (err) {
		next(err); // Passe l'erreur au gestionnaire centralisé
	}
});


// Exemple : route pour récupérer le contenu d'un TableTest
router.get('/private', authenticateJWT, async (req, res, next) => {
try {
const tests = await prisma.tableTest.findMany();
res.json(tests);
} catch (err) {
next(err); // Passe l'erreur au gestionnaire centralisé
}
});

// Exemple : route pour mettre à jour un TableTest
router.put('/Tata/:id', authenticateJWT, async (req, res, next) => {
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
router.patch('/Tete/:id', authenticateJWT, async (req, res, next) => {
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
router.delete('/Tutu/:id', authenticateJWT, async (req, res, next) => {
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