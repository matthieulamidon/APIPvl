/*
* Nom: pageDeJeu.js
* Description: Ce ficher contien le fichier de chargement de la page de jeu
* Auteur: Matthieu Lamidon
* Version: 1.0.0
* Dernière modification: 2025-03-11
*/
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const nom = localStorage.getItem("jeuxSelectionner");

        const response = await fetch(`http://localhost:3000/chargementPageDeJeu/${encodeURIComponent(nom)}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Données reçues :", data);

        // Mise à jour des éléments HTML avec les données de l'API
        document.getElementById("image-jaquette").src = data.src_image_jaquette || "img-non-trouver-jaquette.jpg";
        document.getElementById("image-du-jeu").src = data.src_image || "img-non-trouver-16-9.jpg";


        const nb_dimg = 4; // Nombre d'images du jeu

        // Vérifier si le chemin contient un nombre avant l'extension
        const parti = data.src_image_jeu.split(/(\d+)(?=\.\w+$)/);

        console.log("Parties du chemin :", parti);

        // Découpe du chemin en trois parties : préfixe, nombre, suffixe
        const prefix = parti[0];
        const nbParti = parti[1];
        const sufix = parti[2];

        // Générer la liste des chemins d'image du jeu 
        const imageDuJeuCheman = [];
        for (let i = 1; i <= nb_dimg; i++) {
            const fNb = String(i).padStart(nbParti.length, '0');
            imageDuJeuCheman.push(`${prefix}${fNb}${sufix}`);
        }

        [1, 2, 3, 4].forEach(i => {
            const imgElement = document.getElementById(`image-du-jeu-${i}`);
            if (imgElement) {
                imgElement.src = imageDuJeuCheman[i - 1] || "img-non-trouver-16-9.jpg";
        
                // la securiter est notre prioriter bah oui je vais pas laisser une image qui ne charge pas ça ferais totu planter et c'est chiants
                imgElement.onerror = () => {
                    imgElement.src = "img-non-trouver-16-9.jpg"; 
                };
            }
        });

        // Mise à jour des informations du jeu
        document.getElementById("nom-du-jeu").textContent = data.nom || "Nom inconnu";
        document.getElementById("description-du-jeu").textContent = data.description || "Aucune description disponible";

        const formatValue = (value, defaultValue = "Non défini") => value === "NON_DEFINI" ? defaultValue : value;

        document.getElementById("note-du-jeu").textContent = `Note globale : ${data.note !== "N/A" ? data.note : "Non disponible"}`;
        document.getElementById("plateforme-du-jeu").textContent = `Plateformes : ${data.plateformes.length > 0 ? data.plateformes.join(', ') : "Aucune plateforme définie"}`;
        document.getElementById("studio-du-jeu").textContent = `Studio : ${formatValue(data.studio)}`;
        document.getElementById("editeur-du-jeu").textContent = `Éditeur : ${formatValue(data.editeur)}`;
        document.getElementById("genre-du-jeu").textContent = `Genre : ${data.genre || "Non défini"}`;
        document.getElementById("date-de-sortie-du-jeu").textContent = `Sortie le : ${data.date_de_sortie || "Date inconnue"}`;

        // Temps de jeu
        const temps = data.temps || {}; // Assurer que `temps` est un objet
        document.getElementById("temps-any-pourcent").textContent = (temps.any_percent || 0) + " Heures";
        document.getElementById("temps-main-plus-extra").textContent = (temps.main_plus_extra || 0) + " Heures";
        document.getElementById("temps-completioniste").textContent = (temps.completioniste || 0) + " Heures";
        document.getElementById("temps-all-style").textContent = (temps.all_styles || 0) + " Heures";

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const pseudo = localStorage.getItem("pseudo");
        const nom = localStorage.getItem("jeuxSelectionner");

        fetch(`http://localhost:3000/appartient/${pseudo}/${nom}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Réponse du serveur :", data);
            
            // Vérifie si le jeu est dans la ludothèque
            if (data === true) {
                const bouton = document.getElementById("rajouteLudotheque");
                bouton.style.backgroundColor = "#FF5733";
                bouton.textContent = "Dans votre ludothèque"; // Correction ici
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
});

document.getElementById("btnPoster").addEventListener("click", async function () {
    // Vérifie si un commentaire a déjà été laissé
    const commentaireDejaLaisser = await commentaireLaisser();

    if (commentaireDejaLaisser === true) {
        alert("Vous avez déjà laissé un commentaire pour ce jeu.");
        return;
    }

    console.log("test");
    const titre = document.getElementById("recupererTitre").value;
    const description = document.getElementById("recupererDescription").value;
    const pseudo = localStorage.getItem("pseudo");
    const nom = localStorage.getItem("jeuxSelectionner");

    if (!titre || !description) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const userData = { pseudo, nom, titre, description };

    console.log("Données envoyées :", userData);

    try {
        const response = await fetch("http://localhost:3000/commentaire", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("Commentaire posté avec succès !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    await commentaireLaisser(); // Attends la fin de l'appel à la fonction avant de continuer
});

async function commentaireLaisser() {
    try {
        const pseudo = localStorage.getItem("pseudo");
        const nom = localStorage.getItem("jeuxSelectionner");

        const response = await fetch(`http://localhost:3000/laissercommentaire/${pseudo}/${nom}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Réponse du serveur :", data);
        
        // Vérifie si le jeu est dans la ludothèque
        if (data === true) {
            const bouton = document.getElementById("commentaireLaisser");
            if (bouton) {  // Vérifie si l'élément existe dans le DOM
                bouton.style.backgroundColor = "#FF5733";
                bouton.textContent = "Commentaire Laissé";
                return true; // Retourne true si le commentaire est déjà laissé
            } else {    
                console.error("L'élément #commentaireLaisser n'a pas été trouvé dans le DOM.");
            }
        }
        return false; // Retourne false si le commentaire n'a pas encore été laissé
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return false; // En cas d'erreur, retourne false
    }
}
