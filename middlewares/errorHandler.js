// middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err); // Affiche l'erreur dans la console pour le débogage
    // Format de la réponse
    const statusCode = err.statusCode || 500; // Définit le code de statut HTTP (par défaut : 500)
    const message = err.message || "Erreur interne du serveur"; // Définit le message d'erreur
    res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null, // Ajoute des détails supplémentaires si disponibles
    });
   }
   module.exports = errorHandler;