/*
* Nom: pageDeJeu.js
* Description: Ce ficher contien le fichier de chargement de la page de jeu 
* Auteur: Matthieu Lamidon
* Version: 1.0.0
* Dernière modification: 2025-03-11
*/

//permet de charger la page de jeu
document.addEventListener("DOMContentLoaded", async function () {
    try {
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

        const imageDuJeu = document.getElementById("image-du-jeu");
        imageDuJeu.src = data.src_image || "img/img-non-trouver-16-9.jpg";
        imageDuJeu.onerror = () => {
            imageDuJeu.src = "img/img-non-trouver-16-9.jpg"; // Image de remplacement si erreur
        };

        if(data.src_image_jeu == "default-game.png"){
            [1, 2, 3, 4].forEach(i => {
                const imgElement = document.getElementById(`image-du-jeu-${i}`);
                if (imgElement) {
                    imgElement.src = "img/img-non-trouver-16-9.jpg";
                }
            });
        }else{
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
                    imgElement.src = imageDuJeuCheman[i - 1] || "img/img-non-trouver-16-9.jpg";
        
                    // Ajouter un gestionnaire d'erreurs pour chaque image
                    imgElement.onerror = () => {
                        imgElement.src = "img/img-non-trouver-16-9.jpg"; // Image par défaut si erreur
                    };
                }
            });
        }
    
        // Mise à jour des informations du jeu
        document.getElementById("nom-du-jeu").textContent = data.nom || "Nom inconnu";
        document.getElementById("description-du-jeu").textContent = data.description || "Aucune description disponible";
    
        const formatValue = (value, defaultValue = "Non défini") => value === "NON_DEFINI" ? defaultValue : value;
    
        document.getElementById("note-du-jeu").textContent = `Note globale : ${data.note !== "N/A" ? data.note : "Non disponible"}`;
        document.getElementById("plateforme-du-jeu").textContent = `Plateformes : ${data.plateformes.length > 0 ? data.plateformes.join(', ') : "Aucune plateforme définie"}`;
        document.getElementById("studio-du-jeu").textContent = `Studio : ${formatValue(data.studio)}`;
        document.getElementById("editeur-du-jeu").textContent = `Éditeur : ${formatValue(data.editeur)}`;
        
        document.getElementById("genre-du-jeu").textContent = `Genre : ${data.tags.length > 0 ? data.tags.join(', ') : "Aucune genre définie"}`;
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

//permet de verifier si il y a un jeu dans votre ludotheque
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
                
                const boutonMod = document.getElementById("containerModLudo");

                const row = document.createElement('button');
                row.className = 'btn custom-tab me-2';
                row.style.marginTop = '10px';
                row.id = 'modifieLudotheque'
                row.setAttribute('data-bs-toggle', 'modal');
                row.setAttribute('data-bs-target', '#modifieLudo');

                row.innerHTML =`Modifier le statut`;

                const row2 = document.createElement('button');
                row2.className = 'btn custom-tab me-2';
                row2.style.marginTop = '10px';
                row2.id = 'supprLudotheque'

                row2.innerHTML =`Supprimer de la ludothèque`;

                boutonMod.appendChild(row);
                boutonMod.appendChild(row2);

                //J'ai dû mettre cette fonction de suppression ici car le bouton n'est pas toujours présent sur la page.
                row2.addEventListener("click", async function () {
                    let pseudo = localStorage.getItem("pseudo");
                    let jeu = localStorage.getItem("jeuxSelectionner");
                
                    let id_utilisateur = 0;
                    let id_jeux = 0;
                
                    try {
                        const response = await fetch(`http://localhost:3000/getIdpourLudo/${encodeURIComponent(pseudo)}/${encodeURIComponent(jeu)}`);
                        console.log("Je suis dans le fetch pour trouver les id");
                
                        if (!response.ok) {
                            throw new Error(`Erreur HTTP : ${response.status}`);
                        }
                
                        const data = await response.json();
                        console.log("LudoU Data:", data);
                
                        id_utilisateur = data.utilisateur;
                        id_jeux = data.jeu1;
                        console.log("Id us :", id_utilisateur);
                        console.log("Id jeu :", id_jeux);
                
                        if (id_utilisateur !== 0 && id_jeux !== 0) {
                            const deleteResponse = await fetch(`http://localhost:3000/DeleteLudo/${encodeURIComponent(id_utilisateur)}/${encodeURIComponent(id_jeux)}`, { method: "DELETE" });
                
                            if (!deleteResponse.ok) {
                                throw new Error(`Erreur HTTP : ${deleteResponse.status}`);
                            }
                
                            const result = await deleteResponse.json();
                            alert("Le jeu a bien été supprimé de votre ludothèque !");
                            location.reload();
                            console.log("Réponse API :", result);
                        } else {
                            alert("Erreur : Impossible de récupérer les identifiants.");
                        }
                    } catch (error) {
                        console.error("Erreur :", error);
                        alert("Une erreur est survenue. Veuillez réessayer.");
                    }
                });

            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
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

// permet de verifier si un commentaire a été laiser
document.addEventListener("DOMContentLoaded", async function () {
    await commentaireLaisser(); // Attends la fin de l'appel à la fonction avant de continuer
});

//fonction qui renvoie true si un commentaire a été laisser
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


