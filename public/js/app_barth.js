// Sélectionner les éléments du DOM
const searchBox = document.getElementById('search-box');
const gameBody = document.querySelector('#resultat-jeux');

// Récupérer les données depuis un fichier JSON (ou une URL)
fetch('http://localhost:3000/Titi') // Remplace par l'URL où se trouve ton fichier JSON
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {

        searchBox.addEventListener('input', function(event) {
            const query = event.target.value.trim().toLowerCase();
            gameBody.innerHTML = ''; // Effacer les anciens résultats

            if (query.length >= 3) {
                // Filtrer les données en fonction de la requête
                const filteredData = data.filter(item => 
                    item.nameTest.toLowerCase().includes(query) //Include permet de comparer le nom dans la BDD avec la requête
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
                            <img class="zoom-img" src="${item.srcTest}" style="height:300px" alt="${item.nameTest}">
							</a>
                            <h6 class="TitreJeu">${item.nameTest}</h6>
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