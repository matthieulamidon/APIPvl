/*
* Nom: scriptPageDeJeuCommentaire.js
* Description: Ce script permet de gerer tout ce qui a sur la page de jeu partie commentaire
* Auteur: Matthieu Lamidon
* Version: 1.0.3
* Dernière modification: 2025-03-05
*/

//renvoie true si le commentaire est laissé, false sinon
async function commentaireLaisser() {
    try {
        const pseudo = localStorage.getItem("pseudo");
        const nom = localStorage.getItem("jeuxSelectionner");

        const response = await fetch(`http://localhost:3000/laissercommentaire/${pseudo}/${nom}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("commentaire laisser :", data);
        
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

// permet de recuperer le commentaire laisser par l'utilisateur
document.addEventListener("DOMContentLoaded", async function () {
    try{
        const nom = localStorage.getItem("jeuxSelectionner");
    
        const response = await fetch(`http://localhost:3000/chargementPageDeJeu/${encodeURIComponent(nom)}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Données reçues :", data);
    
        const imageJaquette = document.getElementById("image-jaquette");
        imageJaquette.src = data.src_image_jaquette || "img/img-non-trouver-jaquette.jpg";
        imageJaquette.onerror = () => {
            imageJaquette.src = "img/img-non-trouver-jaquette.jpg"; // Image de remplacement si erreur
        };
    }catch{
        console.error("Erreur dans le chargement du commentaire :", error);
    }
    
    
    try {
        data = await commentaireLaisser(); // Attends la fin de la fonction avant de continuer

        if (data == true) {
            const pseudo = localStorage.getItem("pseudo");
            const nom = localStorage.getItem("jeuxSelectionner");

            const response = await fetch(`http://localhost:3000/affichercommentaire/${pseudo}/${nom}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const data = await response.json();
            console.log("Réponse du serveur :", data);

            // Sélectionne les éléments et vérifie leur existence
            const titreElement = document.getElementById("titre");
            const commentaireElement = document.getElementById("le-commentaire");
            const dateElement = document.getElementById("date-de-sortie-du-commentaire");

            if (titreElement && commentaireElement && dateElement) {
                titreElement.textContent = data.titre || "Aucun titre";
                commentaireElement.textContent = data.commentaire || "Aucun commentaire";
                dateElement.textContent = "Posté le : " + (data.date_publication || "Date inconnue");
            } else {
                console.error("Un des éléments du DOM est introuvable !");
            }
        }
    } catch (error) {
        console.error("Erreur dans le chargement du commentaire :", error);
    }
});

// permet de suprimer sont commentaire
document.getElementById("supprimercommentaire").addEventListener("click", async function () {
    try {
        const pseudo = localStorage.getItem("pseudo");
        const nom = localStorage.getItem("jeuxSelectionner");

        const response = await fetch(`http://localhost:3000/supprimercommentaire/${pseudo}/${nom}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("commentaire suprimer :", data);

        alert("Commentaire supprimé avec succès !");
        window.location.reload(); // Recharge la page pour afficher les modifications

    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});
 
//permet de poster un commentaire
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
        window.location.reload();

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

//permet de modifier un commentaire
document.getElementById("btnModifier").addEventListener("click", async function () {
    // Vérifie si un commentaire a déjà été laissé
    const commentaireDejaLaisser = await commentaireLaisser();

    if (commentaireDejaLaisser === null) {
        alert("vous n'avez pas encore laisser de commentaire pour ce jeu.");
        return;
    }

    console.log("test");
    const titre = document.getElementById("recupererTitreM").value;
    const description = document.getElementById("recupererDescriptionM").value;
    const pseudo = localStorage.getItem("pseudo");
    const nom = localStorage.getItem("jeuxSelectionner");

    if (!pseudo || !nom) {
        alert("Erreur : pseudo ou nom du jeu manquant !");
        return;
    }

    if (!titre || !description) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const userData = { pseudo, nom, titre, description };

    console.log("Données envoyées :", userData);

    try {
        const response = await fetch(`http://localhost:3000/modifiercommentaire/${pseudo}/${nom}`, { 
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        } else {
            alert("Commentaire modifié avec succès !");
        }

        const result = await response.json();

        console.log("Réponse API :", result);
        
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});
