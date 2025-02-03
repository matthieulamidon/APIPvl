document.addEventListener('DOMContentLoaded', () => {
    const gameBody = document.getElementById('containerJeux');

    if (!gameBody) {
        console.error("L'élément avec l'ID 'containerJeux' est introuvable.");
        return;
    }

    fetch('http://localhost:3000/Titi')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Les données reçues ne sont pas un tableau.");
            }

            data.forEach(item => {
                const row = document.createElement('div');
                row.className = 'col-md-2';
                row.style.marginBottom = '20px';
					
				row.innerHTML = `
						<img class="zoom-img" src="${item.srcTest}" style="height:300px" alt="${item.nameTest}">
						<h6 class="TitreJeu">${item.nameTest}</h6>
				`;
                gameBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données JSON :', error);
        });
});