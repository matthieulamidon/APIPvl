// Sélectionner les éléments du DOM
const searchBox = document.getElementById('search-box');
const gameBody = document.querySelector('#resultat-jeux');
const yearSearch = document.querySelector('#year-search');
const editeurSearch = document.querySelector('#editeur-search');
const searchButton = document.getElementById('search-button');
const GsearchBox = document.getElementById('gsearch-box');
const tagSearch = document.getElementById('tag-search');



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
							 <a href="page_du_jeu.html">
                            <img class="zoom-img" src="${item.src_image}" style="height:300px" alt="${item.nom}">
							</a>
                            <h6 class="TitreJeu">${item.nom}</h6>
                        `;
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
							 <a href="page_du_jeu.html">
                            <img class="zoom-img" src="${item.src_image}" style="height:300px" alt="${item.nom}">
							</a>
                            <h6 class="TitreJeu">${item.nom}</h6>
                        `;
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
							 <a href="page_du_jeu.html">
                            <img class="zoom-img" src="${item.src_image}" style="height:300px" alt="${item.nom}">
							</a>
                            <h6 class="TitreJeu">${item.nom}</h6>
                        `;
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

        tagSearch.addEventListener('input', function(event) {
            const query = event.target.value.trim().toLowerCase();
            gameBody.innerHTML = ''; // Effacer les anciens résultats

            if (query.length >= 3) {
                // Filtrer les données en fonction de la requête
                const filteredData = data.filter(item => 
                    item.id_jeux.includes(TriTag(query))
                );

                // Afficher les résultats filtrés
                if (filteredData.length > 0) {
                    filteredData.forEach(item => {
                        const row = document.createElement('div');
                        row.className = 'col-md-2';
                        row.style.marginBottom = '20px';
                        row.style.marginTop = '20px';
                        row.innerHTML = `
							 <a href="page_du_jeu.html">
                            <img class="zoom-img" src="${item.src_image}" style="height:300px" alt="${item.nom}">
							</a>
                            <h6 class="TitreJeu">${item.nom}</h6>
                        `;
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
							 <a href="page_du_jeu.html">
                            <img class="zoom-img" src="${item.src_image}" style="height:300px" alt="${item.nom}">
							</a>
                            <h6 class="TitreJeu">${item.nom}</h6>
                        `;
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
    });


function RedirectionJavascript(){
    document.location.href="Recherche.html"; 
    }

function TriTag(recherche){
    const listeIdTag = [];
    fetch('http://localhost:3000/TestGetTags')
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data=> {

            data.forEach(item => {
                if(item.nom.includes(recherche)){
                    listeIdTag.push(item.id_jeux);
                }
        });
    })
    return listeIdTag;
}
    



    