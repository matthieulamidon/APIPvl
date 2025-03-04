const express = require('express');
const jwt = require('jsonwebtoken');

// mini-instance d'un routeur utilisée pour structurer et modulariser vos routes
const router = express.Router();

// Clé secrète pour signer le token
const SECRET_KEY = process.env.SECRET_KEY || "MaCléSecrète";

// utilisateur pour tester l'authentification avec token
const userDeTest = { username: "test", password: "12345" };

// l'ancienne Route pour la création d'un token
/*
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


router.post("/loginMdp", async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        // Vérifie si l'utilisateur existe
        const user = await prisma.utilisateur.findUnique({
            where: { adresse_email: email }, // 🔹 Correction : la clé est `adresse_email`
        });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        // Vérification du mot de passe
        const passwordMatch = await argon2.verify(user.mot_de_passe, motDePasse);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Mot de passe invalide" });
        }

        
        const token = jwt.sign({ email: user.adresse_email, id: user.id_utilisateur }, SECRET_KEY, { expiresIn: "4h" });
        console.log(`Token créé : ${token}`);
        
        // Réponse avec le token
        return res.json({ token });

    } catch (error) {
        console.error("Erreur serveur :", error);
        return res.status(500).json({ error: "Erreur lors de la connexion" });
    }
});
*/


module.exports = router;