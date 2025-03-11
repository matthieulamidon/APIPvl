const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");  
const prisma = new PrismaClient();
const SECRET_KEY = "zelda-oot-est-un-jeu-banger";  


const isAdmin = async (req, res, next) => {
  try {

    console.log("coucou");

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

 
    const decoded = jwt.verify(token, SECRET_KEY);

 
    const user = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: decoded.id_utilisateur },  
    });

    if (!user || user.role !== "ADMINISTRATEUR") {
      return res.status(403).json({ error: "Accès interdit, vous devez être un administrateur" });
    }

  
    req.user = user; 
    next();
  } catch (error) {
    console.error("Erreur middleware isAdmin :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports = isAdmin;