const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Middleware pour protéger les routes admin
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Récupérer l'ID de l'utilisateur connecté

    if (!userId) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    const user = await prisma.utilisateur.findUnique({ where: { id_utilisateur: userId } });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Accès interdit" });
    }

    next();
  } catch (error) {
    console.error("Erreur middleware isAdmin :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports = isAdmin;
