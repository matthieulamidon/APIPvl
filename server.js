/*
* Nom: server.js
* Description: ce fichier est le server qui permet de faire le lien entre le front et le back pour les utilisateurs
* Auteur: Matthieu Lamidon et Barthelemy Coutard
* Version: 1.0.6
* Dernière modification: 2025-03-05
*/
// Chargement des modules nécessaires
const express = require('express');
const cors = require('cors');
const path = require('path');
//const cookieParser = require('cookie-parser');
//const cors = require('cors');




// Initialisation des objets principaux
const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'null'], // Remplacez par l'origine de votre frontend
    //credentials: true, // Autorise l'envoi des cookies
}));

// Middleware pour analyser le corps des requêtes

//app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//app.use(cookieParser());

// Import du middleware de gestion des erreurs
const errorHandler = require('./middlewares/errorHandler'); 

//importation des routes d'autentification
const authRoutes = require('./routes/authRoutes');
//importation des routes pour table route
const testRoutes = require('./routes/tabletestRoutes');
//la route du mots de passe securiser et tout ce qui est lier aux utilisateurs
const utilisateursRoutes = require('./routes/utilisateursRoutes');
//la route des jeux
const jeuxRoutes = require('./routes/jeuxRoutes');
//la route de la ludotheque
const ludoRoutes = require('./routes/ludothequeRoutes')
//la route du forum et des commentaires
const forumRoutes = require('./routes/forumRoute');

// Utilisation des routes
app.use(authRoutes); // Routes d'authentification
app.use(testRoutes); // Routes pour TableTest
app.use(utilisateursRoutes); // Routes pour utilisateurs
app.use(jeuxRoutes); // Routes pour jeux
app.use(ludoRoutes); // Routes pour jeux
app.use(forumRoutes); // Routes pour forum

// Middleware de gestion des erreurs (doit être monté **après** les routes)
app.use(errorHandler);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Serveur démarré sur http://localhost:${PORT}`);
});