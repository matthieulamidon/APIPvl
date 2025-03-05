/*
* Nom: scriptSelectionDuJeu.js
* Description: Ce fichier permet lorsque l'on click sur une image de jeu de nous rediriger vers la page du jeu
* Auteur: Matthieu Lamidon
* Version: 1.0.2
* Dernière modification: 2025-03-05
*/
document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner toutes les images du carrousel
    const images = document.querySelectorAll('.carousel-item img');

    // Ajouter un écouteur d'événement pour chaque image
    images.forEach(image => {
        image.addEventListener('click', function() {
            // Récupérer l'image et son nom (ou un attribut data ou alt)
            const imageSource = image.src; // URL de l'image
            const imageName = image.alt || "Nom non défini"; // Utilisez alt pour récupérer le nom

            console.log("Image sélectionnée: " + imageName);
            console.log("Source de l'image: " + imageSource);

            localStorage.setItem('jeuxSelectionner', imageName);
            window.location.href = 'page_du_jeu.html';
        });
    });
});