const express = require('express');
const jwt = require('jsonwebtoken');

// mini-instance d'un routeur utilisée pour structurer et modulariser vos routes
const router = express.Router();

// Clé secrète pour signer le token
const SECRET_KEY = process.env.SECRET_KEY || "MaCléSecrète";

// utilisateur pour tester l'authentification avec token
const userDeTest = { username: "test", password: "12345" };

// Route pour la création d'un token
router.post('/login', (req, res) => {
const { username, password } = req.body;    
// Vérifie les identifiants

if (username === userDeTest.username && password === userDeTest.password) {
    // Génère un token JWT valide pour 1 heure
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    console.log(`Token créé ${token}`);
    res.json({ token });
} else {
    res.status(401).json({ message: "Identifiants invalides" });
}
});

module.exports = router;