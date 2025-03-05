
/*
* Nom: pageDeJeu.js
* Description: Ce ficher contien le fichier de chargement de la page de jeu
* Auteur: Matthieu Lamidon
* Version: 1.0.0
* Dernière modification: 2025-03-03
*/
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:3000/utilisateurs");
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        
        const data = await response.json();
        
        // Mise à jour des éléments HTML avec les données de l'API
        document.getElementById("image-jaquette").src = data.scr_image;
        document.getElementById("mainImage").src = data.scr_image; 

        document.getElementById("image-du-jeu-1").src = data.scr_image;
        document.getElementById("image-du-jeu-2").src = data.scr_image;
        document.getElementById("image-du-jeu-3").src = data.scr_image;
        document.getElementById("image-du-jeu-4").src = data.scr_image;

        document.getElementById("nom-du-jeu").textContent = data.nom;
        document.getElementById("description-du-jeu").textContent = data.description;

        document.getElementById("note-du-jeu").textContent = `note globale : ${data.note}`;
        document.getElementById("plateforme-du-jeu").textContent = `plateforme : ${data.plateforme}`;
        document.getElementById("studio-du-jeu").textContent = `Studio : ${formatEnum(data.studio)}`;
        document.getElementById("editeur-du-jeu").textContent = `Éditeur : ${formatEnum(data.editeur)}`;
        document.getElementById("genre-du-jeu").textContent = `genre : ${data.genre}`;
        document.getElementById("date-de-sortie-du-jeu").textContent = `Sortie le : ${data.date_de_sortie}`;

        document.getElementById("temps-any-pourcent").textContent = data.temps.any_percent + " Heures";
        document.getElementById("temps-main-plus-extra").textContent = data.temps.main_plus_extra + " Heures";
        document.getElementById("temps-completioniste").textContent = data.temps.completioniste + " Heures";
        document.getElementById("temps-all-style").textContent = data.temps.all_styles + " Heures";

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
    }
);