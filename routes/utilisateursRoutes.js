// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); // Pour la validation des données
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser'); // Plus besoin de cookie-parser

// N'oublie pas d'installer les dépendances nécessaires : jsonwebtoken
// npm install jsonwebtoken

const SECRET_KEY = "zelda-oot-est-un jeu-banger"; // Mets une clé secrète forte et garde-la cachée !
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
            console.log("Tentative de création d'utilisateur");

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
router.get('/utilisateurs', async (req, res) => {
    try {
        const utilisateurs = await prisma.utilisateur.findMany();
        res.json(utilisateurs);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des utilisateurs" });
    }
});

// Route de connexion
router.post('/loginMdp', [
    body('adresse_email')
        .isEmail()
        .withMessage('Email invalide'),
    body('mot_de_passe')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
], async (req, res) => {
    // Vérifiez les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Récupération des champs avec les bons noms
    const { adresse_email, mot_de_passe } = req.body;

    // Ajoutez un log pour vérifier les valeurs reçues
    console.log("Email reçu:", adresse_email); // Ceci doit afficher l'email reçu
    console.log("Mot de passe reçu:", mot_de_passe); // Ceci doit afficher le mot de passe reçu

    try {
        console.log("Tentative de connexion");
        const user = await prisma.utilisateur.findUnique({ where: { adresse_email: adresse_email } });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const passwordMatch = await argon2.verify(user.mot_de_passe, mot_de_passe);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe invalide' });
        }

        // Création du token
        const token = jwt.sign({ pseudo: user.pseudo }, SECRET_KEY, { expiresIn: "4h" });

        // Envoi du token au frontend (localStorage côté client)
        /*
        // Définition du cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Utiliser HTTPS en production
            maxAge: 14400000, // 4 heures
            sameSite: "strict"
        });
        */
        console.log("🔥 Token envoyé :", token); // DEBUG pour voir si le token est bien créé

        // Au lieu de set dans un cookie, nous renverrons juste le token en réponse pour que le frontend le gère
        res.status(200).json({ message: 'Connexion réussie !', token: token });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// Route pour vérifier l'authentification via le token
router.get('/checkAuth', (req, res) => {
    // On récupère le token depuis le client (localStorage)
    const token = req.headers['authorization']?.split(' ')[1];  // Utilisation de Bearer token

    if (!token) {
        console.log("Aucun token trouvé !");
        return res.status(401).json({ error: "Non connecté" });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        console.log("Utilisateur authentifié :", user);
        res.json({ pseudo: user.pseudo });
    } catch (err) {
        console.error("Erreur de vérification JWT :", err);
        res.status(401).json({ error: "Token invalide ou expiré" });
    }
});

// Déconnexion (suppression du token côté client)
router.post('/logout', (req, res) => {
    // On ne supprime pas le cookie, car on utilise localStorage côté client
    // On ne fait rien côté serveur pour la déconnexion, le token est simplement retiré du localStorage côté client
    res.json({ message: "Déconnexion réussie, à bientôt !" });
});

module.exports = router;
