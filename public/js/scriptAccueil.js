/*
* Nom: scriptAccueuil.js
* Description: Ce ficher les script lier a qu'elle jeu dois etre afficher dans la page d'accueil
* pour que l'administrateur n'est pas a toucher a l'HTML de la page
* Auteur: Matthieu Lamidon
* Version: 1.0.0
* Dernière modification: 2025-03-11
*/

//permet d'afficher les jeux dans la page d'accueil sans qu'il est besoin pour l'admin de modifier les page HTML
document.addEventListener("DOMContentLoaded", async () => {
    const categories = {
        "NOUVEAUTE": "carouselnouveauter",
        "CLASSIQUE": "carouselclassique",
    };

    for (const [category, carouselId] of Object.entries(categories)) {
        try {
            // Récupérer les jeux pour le carrousel général
            const response = await fetch(`http://localhost:3000/recuperationPourLAccueil/GRAND_CARROUSEL`);
            if (!response.ok) throw new Error(`Erreur lors du chargement des jeux GRAND_CARROUSEL`);
            
            const jeux = await response.json();
            console.log(`Jeux ${category} :`, jeux);
            updateGrandCarousel(jeux);
        } catch (error) {
            console.error(`Erreur chargement ${category} :`, error);
            const jeuxDefaut = [{
                nom: "Jeu non trouvé",
                image: "img/img-non-trouver-16-9.jpg",
                description: "Aucun jeu disponible.",
                sortie: "Date inconnue"
            }];
            updateGrandCarousel(jeuxDefaut);
        }

        try{
            // Récupérer les jeux pour la catégorie NOUVEAUTE
            const response2 = await fetch(`http://localhost:3000/recuperationPourLAccueil/NOUVEAUTE`);
            const jeux2 = response2.ok ? await response2.json() : [];
            console.log(`Jeux ${category} :`, jeux2);
            updateCarousel(jeux2, "NOUVEAUTE", categories["NOUVEAUTE"]);
        } catch (error) {
            console.error(`Erreur chargement ${category} :`, error);

            // Gestion des erreurs : si l'API échoue, on utilise des jeux par défaut
            const jeuxDefaut = [{
                nom: "Jeu non trouvé",
                image: "img/img-non-trouver-16-9.jpg",
                description: "Aucun jeu disponible.",
                sortie: "Date inconnue"
            }];
            console.log("nouveaute afficher");
            updateCarousel(jeuxDefaut, "NOUVEAUTE", categories["NOUVEAUTE"]);
        }
        try {
            // Récupérer les jeux pour la catégorie CLASSIQUE
            const response3 = await fetch(`http://localhost:3000/recuperationPourLAccueil/CLASSIQUE`);
            const jeux3 = response3.ok ? await response3.json() : [];
            console.log(`Jeux ${category} :`, jeux3);
            console.log("classique afficher");
            if(jeux3.length === 0){
                console.log("jeux3 est vide");
            }else{
            updateCarousel(jeux3, "CLASSIQUE", categories["CLASSIQUE"]);
            }
        } catch (error) {
            console.error(`Erreur chargement ${category} :`, error);

            // Gestion des erreurs : si l'API échoue, on utilise des jeux par défaut
            const jeuxDefaut = [{
                nom: "Jeu non trouvé",
                image: "img/img-non-trouver-16-9.jpg",
                description: "Aucun jeu disponible.",
                sortie: "Date inconnue"
            }];
            
            updateCarousel(jeuxDefaut, "CLASSIQUE", categories["CLASSIQUE"]);
        }
    }
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

//fonction qui gere l'affichage du grand caroucelle 
function updateGrandCarousel(jeux) {
    const carouselInner = document.querySelector(`#carouselDeBase .carousel-inner`);
    
    if (!carouselInner) return;
    console.log("Le carrousel est bien là");

    // Si la liste de jeux est vide, fournir plusieurs jeux par défaut
    if (jeux.length === 0) {
        jeux = [{ 
            nom: "Jeu non trouvé", 
            image: "img/img-non-trouver-16-9.jpg", 
            description: "Aucun jeu disponible.", 
            sortie: "Date inconnue" 
        }];
    }

    // Obtenir tous les éléments carousel-item existants
    const carouselItems = carouselInner.querySelectorAll('.carousel-item');
    let indice = 0;

    // Pour chaque jeu, mettre à jour un élément existant si possible
    jeux.forEach((jeu, index) => {
        // Si on a un élément existant, on le met à jour
        const slideDiv = carouselItems[index] || document.createElement("div");
        slideDiv.className = `carousel-item ${index === 0 ? "active" : ""}`;

        slideDiv.innerHTML = `  
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-8">
                        <img src="${jeu.src_img || 'img/img-non-trouver-16-9.jpg'}" class="img-fluid rounded-start" alt="${jeu.nom}">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">${jeu.nom}</h5>
                            <p class="card-text">${jeu.description || "Pas de description disponible."}</p>
                            <p class="card-text"><small class="text-muted">Sortie le : ${jeu.date_de_sortie || "Date inconnue"}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (!carouselItems[index]) {
            carouselInner.appendChild(slideDiv); // Si c'est un nouvel élément, on l'ajoute
        }

        indice++;
    });

    // Compléter le carrousel avec des éléments par défaut si nécessaire
    for (let i = indice; i < carouselItems.length; i++) {
        const slideDiv = carouselItems[i];
        slideDiv.className = `carousel-item`;
        slideDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-8">
                        <img src="img/img-non-trouver-16-9.jpg" class="img-fluid rounded-start" alt="civilization7">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">N/A</h5>
                            <p class="card-text">Pas de description disponible.</p>
                            <p class="card-text"><small class="text-muted">Sortie le :  Date inconnue</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (!carouselItems[i]) {
            carouselInner.appendChild(slideDiv); // Si c'est un nouvel élément, on l'ajoute
        }

        indice++;
    }
}
//fonction qui gere l'affichage des deux autre caroucelle
function updateCarousel(jeux, type, carouselId) {
    // Cibler le carrousel selon l'ID passé en paramètre
    const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);

    if (!carouselInner) return;
    console.log(`Le carrousel ${type} est bien là`);

    // Si la liste de jeux est vide, fournir plusieurs jeux par défaut
    if (jeux.length === 0) {
        jeux = [{
            nom: "Jeu non trouvé",
            image: "img/img-non-trouver-16-9.jpg",
            description: "Aucun jeu disponible.",
            sortie: "Date inconnue"
        }];
    }

    // Compléter la liste de jeux pour avoir 8 jeux (même si la liste est plus petite)
    const jeuxComplets = [];
    for (let i = 0; i < 8; i++) {
        jeuxComplets.push(jeux[i % jeux.length]);
    }

    // Vider le carrousel avant d'ajouter les nouveaux éléments
    carouselInner.innerHTML = '';

    // Créer les groupes de 4 jeux pour chaque page du carrousel
    for (let i = 0; i < jeuxComplets.length; i += 4) {
        const groupeJeux = jeuxComplets.slice(i, i + 4); // Obtenir un sous-ensemble de 4 jeux

        // Créer une nouvelle page du carrousel
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (i === 0) {
            carouselItem.classList.add("active"); // Ajouter la classe active à la première page
        }

        // Créer le contenu du carrousel pour cette page (avec 4 jeux)
        let innerHTML = '<div class="d-flex">';

        // Pour chaque jeu dans le groupe de 4, créer une image
        groupeJeux.forEach(jeu => {
            const imageUrl = jeu.src_img || "img/img-non-trouver-16-9.jpg"; // Image par défaut si aucune n'est fournie
            console.log(jeu.nom);
            innerHTML += `
                <div class="image-container w-25 me-2">
                    <img src="${imageUrl}" class="d-block w-100" alt="${jeu.nom}">
                </div>
            `;
        });

        innerHTML += '</div>'; // Fin du conteneur de la ligne de jeux
        carouselItem.innerHTML = innerHTML;

        // Ajouter la page au carrousel
        carouselInner.appendChild(carouselItem);
    }
}
