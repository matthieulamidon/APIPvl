// Chargement des modules nécessaires
const express = require('express');
const cors = require('cors');
const path = require('path');


// Initialisation des objets principaux
const app = express();

// Middleware pour analyser le corps des requêtes

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Import du middleware de gestion des erreurs
const errorHandler = require('./middlewares/errorHandler'); 

//importation des routes d'autentification
const authRoutes = require('./routes/authRoutes');
//importation des routes pour table route
const testRoutes = require('./routes/tabletestRoutes');
//la route du mots de passe securiser
const utilisateursRoutes = require('./routes/utilisateursRoutes');

// Utilisation des routes
app.use(authRoutes); // Routes d'authentification
app.use(testRoutes); // Routes pour TableTest
app.use(utilisateursRoutes); // Routes pour utilisateurs

// Middleware de gestion des erreurs (doit être monté **après** les routes)
app.use(errorHandler);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
