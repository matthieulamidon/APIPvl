// Sélectionner les éléments du DOM
const searchBox = document.getElementById('search-box');
const gameBody = document.querySelector('#resultat-jeux');
const yearSearch = document.querySelector('#year-search');
const editeurSearch = document.querySelector('#editeur-search');
const searchButton = document.getElementById('search-button');
const GsearchBox = document.getElementById('gsearch-box');
const tagSearch = document.getElementById('tag-search');
const PlatSearch = document.getElementById('plat-search');



// Récupérer les données depuis un fichier JSON (ou une URL)
fetch('http://localhost:3000/TestGetJeux') // Remplace par l'URL où se trouve ton fichier JSON
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {

        searchBox.addEventListener('input', function(event) {
            const query = event.target.value.trim().toLowerCase();
            gameBody.innerHTML = ''; // Effacer les anciens résultats

            if (query.length >= 3) {
                // Filtrer les données en fonction de la requête
                const filteredData = data.filter(item => 
                    item.nom.toLowerCase().includes(query.toLowerCase()) ||  // Vérifie le nom
                    JSON.stringify(item.editeur)?.toLowerCase().includes(query.toLowerCase()) // Vérifie l'énum studio
                );

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
                            const imageName = item.nom || "Nom non défini"; // Utilisez alt pour récupérer le nom
                
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
                    row.style.marginBottom = '20px';
                    row.innerHTML = `
                        <h6 class="TitreJeu">Aucun résultat</h6>
                    `;
                    gameBody.appendChild(row);
                }
            }
        });

        yearSearch.addEventListener('input', function(event) {
            const query = event.target.value.trim().toLowerCase();
            gameBody.innerHTML = ''; // Effacer les anciens résultats

            if (query.length >= 4) {
                // Filtrer les données en fonction de la requête
                const filteredData = data.filter(item => 
                    JSON.stringify(item.date_publication)?.toLowerCase().includes(query.toLowerCase()) // Vérifie l'année
                );

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
                            const imageName = item.nom || "Nom non défini"; // Utilisez alt pour récupérer le nom
                
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
                    row.style.marginBottom = '20px';
                    row.innerHTML = `
                        <h6 class="TitreJeu">Aucun résultat</h6>
                    `;
                    gameBody.appendChild(row);
                }
            }
        });

        editeurSearch.addEventListener('input', function(event) {
            const query = event.target.value.trim().toLowerCase();
            gameBody.innerHTML = ''; // Effacer les anciens résultats

            if (query.length >= 3) {
                // Filtrer les données en fonction de la requête
                const filteredData = data.filter(item => 
                    JSON.stringify(item.editeur)?.toLowerCase().includes(query.toLowerCase()) || // Vérifie l'énum editeur
                    JSON.stringify(item.studio)?.toLowerCase().includes(query.toLowerCase()) // Vérifie l'énum studio
                );

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
                            const imageName = item.nom || "Nom non défini"; // Utilisez alt pour récupérer le nom
                
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
                    row.style.marginBottom = '20px';
                    row.innerHTML = `
                        <h6 class="TitreJeu">Aucun résultat</h6>
                    `;
                    gameBody.appendChild(row);
                }
            }
        });

        tagSearch.addEventListener('input', async function(event) {
            const query = event.target.value.trim().toLowerCase();
            gameBody.innerHTML = ''; 
            if (query.length >= 3) {
                try {
                    // Filtrer les données en fonction de la requête
                    const listeIdTag = await TriTag(query); 
                    const filteredData = data.filter(item => 
                        listeIdTag.includes(item.id_jeux) // Comparer avec l'id_jeux
                    );
        
                 
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
                                const imageName = item.nom || "Nom non défini"; // Utilisez alt pour récupérer le nom
                    
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
                        row.style.marginBottom = '20px';
                        row.innerHTML = `
                            <h6 class="TitreJeu">Aucun résultat</h6>
                        `;
                        gameBody.appendChild(row);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des tags :", error);
                }
            }
        });

        PlatSearch.addEventListener('input', async function(event) {
            const query = event.target.value.trim().toLowerCase();
            gameBody.innerHTML = ''; 
            if (query.length >= 2) {
                try {
                    // Filtrer les données en fonction de la requête
                    const listeIdPlat = await TriPlateforme(query); 
                    const filteredData = data.filter(item => 
                        listeIdPlat.includes(item.id_jeux) // Comparer avec l'id_jeux
                    );
        
                 
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
                                const imageName = item.nom || "Nom non défini"; // Utilisez alt pour récupérer le nom
                    
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
                        row.style.marginBottom = '20px';
                        row.innerHTML = `
                            <h6 class="TitreJeu">Aucun résultat</h6>
                        `;
                        gameBody.appendChild(row);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des tags :", error);
                }
            }
        });

        searchButton.addEventListener('click', function(event) {
            event.preventDefault();  // Empêche le rafraîchissement de la page
            
            const query = GsearchBox.value.trim().toLowerCase();
            gameBody.innerHTML = ''; // Effacer les anciens résultats

            if (query.length >= 3) {
                // Filtrer les données en fonction de la requête
                const filteredData = data.filter(item => 
                    item.nom.toLowerCase().includes(query.toLowerCase()) ||  // Vérifie le nom
                    JSON.stringify(item.editeur)?.toLowerCase().includes(query.toLowerCase()) || // verifie l'editeur
                    JSON.stringify(item.date_publication)?.toLowerCase().includes(query.toLowerCase()) || // Vérifie la date
                    JSON.stringify(item.studio)?.toLowerCase().includes(query.toLowerCase()) //verifie le studio
                );

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
                            const imageName = item.nom || "Nom non défini"; // Utilisez alt pour récupérer le nom
                
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
                    row.style.marginBottom = '20px';
                    row.innerHTML = `
                        <h6 class="TitreJeu">Aucun résultat</h6>
                    `;
                    gameBody.appendChild(row);
                }
            }
        });
    
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        // Ajouter un écouteur d'événement pour chaque image
    });


function RedirectionJavascript(){
    document.location.href="Recherche.html"; 
    }

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

function Redirection(){
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
}


    