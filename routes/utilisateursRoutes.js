/*
* Nom: utilisateursRoutes.js
* Description: il contiennt les routes pour les utilisateurs et la gestion de la connexion, de la déconnexion et la gestion de profils
* Auteur: Matthieu Lamidon et Barthelemy Coutard
* Version: 1.0.6
* Dernière modification: 2025-03-05
*/

// Chargement des modules nécessaires
const { body, validationResult } = require('express-validator'); // Pour la validation des données
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser'); // Plus besoin de cookie-parser

// N'oublie pas d'installer les dépendances nécessaires : jsonwebtoken
// npm install jsonwebtoken

// Clé secrète pour le token JWT bah oui elle est belle ma clé secrète
const SECRET_KEY = "zelda-oot-est-un jeu-banger"; 
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();
const prisma = new PrismaClient();

// Route pour ajouter un utilisateur
router.post('/creationDutilisateurs',
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
});

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

// Route pour récupérer un utilisateur
router.get('/profils/:pseudo', async (req, res, next) => {
    try {
        const { pseudo } = req.params;

        const utilisateur = await prisma.utilisateur.findUnique({
            where: { pseudo } // Chercher un utilisateur avec ce nom
        });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json(utilisateur);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération de l'utilisateur" });
    }
});

//route pour récupérer l'id d'un utilisateur via son pseudo pour la ludotheque
router.get('/getid/:pseudo', async (req, res, next) => {
    try {
        console.log("Tentative de récupération de l'ID de l'utilisateur");
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

//route qui permet de mettre a jour les informations d'un utilisateur
router.patch('/majProfils',
    [
        // Validation des champs
        body('Actuelpseudo').exists().withMessage('Le pseudo actuel est requis.'), // Actuelpseudo est obligatoire
        
        body('pseudo')
            .optional().isLength({ min: 3, max: 20 })
            .withMessage('Le pseudo doit contenir entre 3 et 20 caractères.')
            .isString()
            .custom(async (value) => {
                if (value) {
                    const existingUser = await prisma.utilisateur.findUnique({
                        where: { pseudo: value },
                    });
                    if (existingUser) {
                        throw new Error('Ce pseudo est déjà pris.');
                    }
                }
                return true;
            }),

        body('adresse_email')
            .optional().isEmail()
            .withMessage('Adresse email invalide.'),
        
        body('nom')
            .optional().isString()
            .withMessage('Le nom doit être une chaîne de caractères.'),

        body('prenom')
            .optional().isString()
            .withMessage('Le prénom doit être une chaîne de caractères.'),

        body('description')
            .optional().isString()
            .withMessage('La description doit être une chaîne de caractères.'),

        body('date_de_naissance')
            .optional().isISO8601().toDate()
            .withMessage('La date de naissance doit être au format ISO8601.'),
        /*
        body('icone_profil')
            .optional().isString()
            .custom((value) => {
                const validIcons = [
                    "img/image_de_profile_par_default.png", 
                    "img/avatar1.png", 
                    "img/avatar2.png"
                ]; 
                if (value && !validIcons.includes(value)) {
                    throw new Error('Icône de profil invalide.');
                }
                return true;
            })*/
    ], 
    async (req, res) => {
        try {
            // Validation des erreurs
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Récupérer l'Actuelpseudo dans le corps de la requête ou depuis le token JWT
            const Actuelpseudo = req.body.Actuelpseudo || req.user.Actuelpseudo;
            if (!Actuelpseudo) {
                return res.status(400).json({ error: "Le pseudo actuel est requis." });
            }

            // Vérifier si l'utilisateur existe avec l'Actuelpseudo
            const utilisateur = await prisma.utilisateur.findUnique({
                where: { pseudo: Actuelpseudo }
            });

            if (!utilisateur) {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }

            // Mise à jour des champs modifiés
            const updatedUser = await prisma.utilisateur.update({
                where: { pseudo: Actuelpseudo }, // Utilisation de Actuelpseudo pour trouver l'utilisateur
                data: {
                    pseudo: req.body.pseudo || utilisateur.pseudo,
                    nom: req.body.nom || utilisateur.nom,
                    prenom: req.body.prenom || utilisateur.prenom,
                    description: req.body.description || utilisateur.description,
                    date_de_naissance: req.body.date_de_naissance || utilisateur.date_de_naissance,
                    //icone_profil: req.body.icone_profil || utilisateur.icone_profil
                }
            });

            // Retourner la réponse avec l'utilisateur mis à jour
            res.json({ message: "Profil mis à jour avec succès", utilisateur: updatedUser });
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la modification du profil" });
        }
    }
);

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
    // On ne supprime pas le cookie, car on n'en a plus car ça n'a jamais marcher et que cette route n'est plus utiliser que par mon seum imense de laisser d'énorme faille de securiter
    res.json({ message: "Déconnexion réussie, à bientôt !" });
});

// Route pour supprimer un utilisateur avec id donc c'est bart qui la fait
router.delete('/SupprUser/:id', async (req, res, next) => {
	try {
	const { id } = req.params;
	const deleteduser = await prisma.utilisateur.delete({
	where: { id_utilisateur: parseInt(id) },
	});
	res.json({ message: 'Test supprimé avec succès', deleteduser });
	} catch (err) {
	next(err); // Passe l'erreur au gestionnaire centralisé
	}

});

module.exports = router;
