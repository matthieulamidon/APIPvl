/*
* Nom: app_barth.js
* Description: Ce ficher contient tout le systeme de recherche des page de recherche et ludotheque
* Auteur: Barthelemy Coutard
* Version: 1.0.0
* Dernière modification: 2025-03-11
*/

//systeme de recherche complet 
document.addEventListener('DOMContentLoaded', async function () {
    // Sélectionner les éléments du DOM
    const searchBox = document.getElementById('search-box');
    const gameBody = document.querySelector('#resultat-jeux');
    const yearSearch = document.querySelector('#year-search');
    const editeurSearch = document.querySelector('#editeur-search');
    const searchButton = document.getElementById('search-button');
    const GsearchBox = document.getElementById('gsearch-box');
    const tagSearch = document.getElementById('tag-search');
    const PlatSearch = document.getElementById('plat-search');



    // Récupére les données depuis un fichier JSON (ou une URL)
    fetch('http://localhost:3000/TestGetJeux') 
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {

            const sortedData = trierJeuxParAlphabet(data);

            afficherJeux(sortedData, gameBody);

            searchBox.addEventListener('input', function(event) {
                const query = event.target.value.trim().toLowerCase();
                gameBody.innerHTML = ''; // Efface les anciens résultats

                if (query.length >= 3) {
                    // Filtre les données en fonction de la requête
                    const filteredData = sortedData.filter(item => 
                        item.nom.toLowerCase().includes(query.toLowerCase()) // Vérifie le nom
                    );
                    afficherJeux(filteredData, gameBody);
                } else {
                    afficherJeux(sortedData, gameBody);
                }
            });

            yearSearch.addEventListener('input', function(event) {
                const query = event.target.value.trim().toLowerCase();
                gameBody.innerHTML = ''; // Effacer les anciens résultats

                if (query.length >= 4) {
                    // Filtre les données en fonction de la requête
                    const filteredData = sortedData.filter(item => 
                        JSON.stringify(item.date_publication)?.toLowerCase().includes(query.toLowerCase()) // Vérifie l'année
                    );
                    afficherJeux(filteredData, gameBody);
                } else {
                    afficherJeux(sortedData, gameBody);
                }
            });

            editeurSearch.addEventListener('input', function(event) {
                const query = event.target.value.trim().toLowerCase();
                gameBody.innerHTML = ''; // Efface les anciens résultats

                if (query.length >= 3) {
                    // Filtre les données en fonction de la requête
                    const filteredData = sortedData.filter(item => 
                        JSON.stringify(item.editeur)?.toLowerCase().includes(query.toLowerCase()) || // Vérifie l'énum editeur
                        JSON.stringify(item.studio)?.toLowerCase().includes(query.toLowerCase()) // Vérifie l'énum studio
                    );
                    afficherJeux(filteredData, gameBody);
                } else {
                    afficherJeux(sortedData, gameBody);
                }
            });

            tagSearch.addEventListener('input', async function(event) {
                const query = event.target.value.trim().toLowerCase();
                gameBody.innerHTML = ''; 
                if (query.length >= 3) {
                    try {
                        // Filtrer les données en fonction de la requête
                        const listeIdTag = await TriTag(query); 
                        const filteredData = sortedData.filter(item => 
                            listeIdTag.includes(item.id_jeux) // Comparer avec l'id_jeux
                        );
                        afficherJeux(filteredData, gameBody);
                    } catch (error) {
                        console.error("Erreur lors de la récupération des tags :", error);
                    }
                }else {
                afficherJeux(sortedData, gameBody);
                }
            });

            PlatSearch.addEventListener('input', async function(event) {
                const query = event.target.value.trim().toLowerCase();
                gameBody.innerHTML = ''; 
                if (query.length >= 2) {
                    try {
                        // Filtrer les données en fonction de la requête
                        const listeIdPlat = await TriPlateforme(query); 
                        const filteredData = sortedData.filter(item => 
                            listeIdPlat.includes(item.id_jeux) // Comparer avec l'id_jeux
                        );
                        afficherJeux(filteredData, gameBody);
                    } catch (error) {
                        console.error("Erreur lors de la récupération des tags :", error);
                    }
                } else {
                    afficherJeux(sortedData, gameBody);
                }
            });

            searchButton.addEventListener('click', function(event) {
                event.preventDefault();  // Empêche le rafraîchissement de la page
                
                const query = GsearchBox.value.trim().toLowerCase();
                gameBody.innerHTML = ''; // Effacer les anciens résultats

                if (query.length >= 3) {
                    // Filtrer les données en fonction de la requête
                    const filteredData = sortedData.filter(item => 
                        item.nom.toLowerCase().includes(query.toLowerCase()) ||  // Vérifie le nom
                        JSON.stringify(item.editeur)?.toLowerCase().includes(query.toLowerCase()) || // verifie l'editeur
                        JSON.stringify(item.date_publication)?.toLowerCase().includes(query.toLowerCase()) || // Vérifie la date
                        JSON.stringify(item.studio)?.toLowerCase().includes(query.toLowerCase()) //verifie le studio
                    );
                    afficherJeux(filteredData, gameBody);
                } else {
                    afficherJeux(sortedData, gameBody);
                }
            });
        
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            // Ajouter un écouteur d'événement pour chaque image
        });

    async function TriTag(recherche) {
        const listeIdTag = [];
        try {
            const response = await fetch('http://localhost:3000/TestGetTags');
            const data = await response.json();
            console.log("Données récupérées depuis l'API :", data);

            data.forEach(item => {
                console.log("Nom de l'élément:", item.nom);
                console.log("Recherche:", recherche);

                if (item.nom.toLowerCase().includes(recherche)) {
                    listeIdTag.push(item.id_jeux);
                    console.log("Match trouvé");
                }
                else{
                    console.log("Bah non");
                }
            });


            return listeIdTag; // Retourne la liste filtrée
        } catch (error) {
            console.error("Erreur lors de la récupération des tags :", error);
            return [];
        }
    } 

    async function TriPlateforme(recherche) {
        const listeIdPlat = [];
        try {
            const response = await fetch('http://localhost:3000/TestGetPlateformes');
            const data = await response.json();
            console.log("Données récupérées depuis l'API :", data);

            data.forEach(item => {
                console.log("Nom de l'élément:", item.nom);
                console.log("Recherche:", recherche);

                if (item.nom.toLowerCase().includes(recherche)) {
                    listeIdPlat.push(item.id_jeux);
                    console.log("Match trouvé");
                }
                else{
                    console.log("Bah non");
                }
            });


            return listeIdPlat; // Retourne la liste filtrée
        } catch (error) {
            console.error("Erreur lors de la récupération des tags :", error);
            return [];
        }
    } 
})

function trierJeuxParAlphabet(data) {
    return data.sort((a, b) => {
        const nomA = a.nom.toLowerCase();
        const nomB = b.nom.toLowerCase();

        if (nomA < nomB) {
            return -1; 
        }
        if (nomA > nomB) {
            return 1; 
        }
        return 0; 
    });
}

function afficherJeux(filteredData, gameBody){
     // Afficher les résultats filtrés
     if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'col-md-2';
            row.style.marginBottom = '20px';
            row.style.marginTop = '20px';
            row.innerHTML = `
                <img class="zoom-img" src="${item.src_image_jaquette}" style="height:300px" alt="${item.nom}">
                <h6 class="TitreJeu">${item.nom}</h6>
            `;
            row.addEventListener('click', function() {
                // Récupérer l'image et son nom (ou un attribut data ou alt)
                const imageSource = item.src_image_jaquette; // URL de l'image
                const imageName = item.nom || "Nom non défini"; // Utilise alt pour récupérer le nom
    
                console.log("Image sélectionnée: " + imageName);
                console.log("Source de l'image: " + imageSource);
    
                localStorage.setItem('jeuxSelectionner', imageName);
                window.location.href = 'page_du_jeu.html';
            });
            gameBody.appendChild(row);
        });
    } else {
        const row = document.createElement('div');
        row.className = 'col-md-2';
        row.style.marginBottom = '400px';
        row.innerHTML = `
            <h6 class="TitreJeu">Aucun résultat</h6>
        `;
        gameBody.appendChild(row);
    }
}
    