const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const SECRET_KEY = "zelda-oot-est-un jeu-banger";

const isAdmin = async (req, res, next) => {
  try {
    console.log("Middleware isAdmin exécuté");

    // Récupération du token depuis le header Authorization
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Aucun token fourni." });
    }

    console.log("Token reçu par le serveur :", token);

    let user;
    try {
      user = jwt.verify(token, SECRET_KEY);
      console.log("Utilisateur décodé :", user);
    } catch (error) {
      console.error("Erreur JWT :", error.message);
      return res.status(401).json({ error: "Token invalide ou expiré." });
    }

    // Vérifie si `user` contient bien `id_utilisateur`
    if (!user.id_utilisateur) {
      console.error("Erreur: `id_utilisateur` manquant dans le token !");
      return res.status(400).json({ error: "`id_utilisateur` manquant dans le token" });
    }

    // Vérification de l'utilisateur dans la BDD
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: user.id_utilisateur },  // 
    });

    if (!utilisateur || utilisateur.role !== "ADMINISTRATEUR") {
      return res.status(403).json({ error: "Accès interdit, vous devez être un administrateur." });
    }

    next(); 
  } catch (error) {
    console.error("Erreur middleware isAdmin :", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

module.exports = isAdmin;