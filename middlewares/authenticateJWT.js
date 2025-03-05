const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "zelda-oot-est-un jeu-banger"; // Utilisation du fichier .env pour stocker la clé
function authenticateJWT(req, res, next) {
const authHeader = req.headers.authorization;
if (authHeader) {
const token = authHeader.split(' ')[1]; // Récupère le token après "Bearer "
jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
        return res.status(403).json({ message: "Accès interdit : Token invalide" });
        }
        req.user = user; // Ajoute les données du token décrypté à req
        next(); // Passe au middleware suivant ou à la route
        });
    } else {
        res.status(401).json({ message: "Authentification requise" });
    }
}
module.exports = authenticateJWT;