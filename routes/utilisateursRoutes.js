// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); 
// pour la validation des données

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();
const prisma = new PrismaClient();


// Route pour ajouter un utilisateur
router.post(
    '/creationDutilisateurs',
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
    async (req, res) => {
        try {
            // Vérification des erreurs de validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Extraction des champs
            const { pseudo, adresse_email, mot_de_passe} = req.body;

            // Vérification stricte des champs obligatoires
            if (!pseudo || !adresse_email || !mot_de_passe) {
                return res.status(400).json({ error: 'Pseudo, adresse_email et mot_de_passe sont obligatoires.' });
            }

            // Hachage du mot de passe
            const motDePasseHash = await argon2.hash(mot_de_passe);

            // Construction de l'objet data
            const data = { 
                pseudo, 
                adresse_email, 
                mot_de_passe: motDePasseHash, // On stocke le hash du mot de passe
            };

            // Ajout des champs optionnels
            const optionalFields = ['nom', 'prenom', 'description', 'date_de_naissance', 'icone_profil'];
            optionalFields.forEach((field) => {
                if (req.body[field] !== undefined) {
                    data[field] = req.body[field];
                }
            });

            // Création de l'utilisateur
            const utilisateur = await prisma.utilisateur.create({ data });

            res.status(201).json(utilisateur);
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la création d'un utilisateur" });
        }
    }
);


// Route pour récupérer le contenu des utilisateurs
router.get('/Utilisateurs', async (req, res) => {
    const tests = await prisma.utilisateur.findMany();
    res.json(tests);
});


router.post('/loginMdp', async (req, res) => {
    const { email, motDePasse } = req.body;
    try {
    // Trouver l'utilisateur par email
    const user = await prisma.utilisateur.findUnique({
    where: { email },
    });
    if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé'
    });
    }
    
    // Vérifier le mot de passe - renvoie True ou False
    const passwordMatch = await argon2.verify(user.motDePasse, motDePasse);
    console.log("Mot de passe vérifié : ", passwordMatch);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Mot de passe invalide'
    });
    }
    res.status(200).json({ message: 'Connexion établie', user });
    } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
    });

module.exports = router;