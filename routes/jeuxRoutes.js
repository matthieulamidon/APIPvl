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
      body('nom')
        .isLength({ min: 3, max: 20 })
        .withMessage('Le nom doit contenir entre 3 et 20 caractères.'),
        
      //le nom d'origine des images
      body('scr_image')
        .isString()
        .withMessage('Le nom de l\'image doit être une chaine de caractère'),
  
      body('date_de_sortie')
        .isDate()
        .withMessage('La date de sortie doit être une date valide'),
  
      // Champs optionnels
      body('tags').optional(),
      body('studio').optional(),
      body('plateformes').optional(),
      body('editeur').optional(),
      body('note').optional().isFloat(),
      body('any_pourcent').optional().isFloat(),
      body('main_plus_extra').optional().isFloat(),
      body('completionniste').optional().isFloat(),
      body('all_style').optional().isFloat(),
      body('description').optional().isString(),
      body('nb_favoris').optional().isInt(),
      body('forums').optional(),
      body('ludotheques').optional(),
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


module.exports = router;
