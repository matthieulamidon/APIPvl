

document.getElementById("btnAjoutJeuALAccuil").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
    const nom = document.getElementById("recupereNomJeuPageDAccueil").value;
    const type = document.getElementById("recupereLEndroisChoisi").value;
    const token = localStorage.getItem("token");    

    if (!nom || !type) {
        alert("Tous les champs doivent être remplis !");
        return;
    }

    const jeuData = {
        nom: nom,
        type: type
    };

    console.log("liason du jeu a l'accueil");
    
    try {
        const response = await fetch("http://localhost:3000/affecterALAccueil", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(jeuData)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("le jeu a bien ete lier a l'accueil !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Définition des catégories et leur nombre max de jeux
        const categories = {
            "CLASSIQUE": { max: 8, jeux: [] },
            "NOUVEAUTE": { max: 8, jeux: [] },
            "GRAND_CARROUSEL": { max: 4, jeux: [] }
        };

        // Fonction pour récupérer les jeux d'une catégorie
        const fetchGames = async (category) => {
            try {
                const response = await fetch(`http://localhost:3000/recuperationPourLAccueil/${category}`, { method: "GET" });

                if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

                return await response.json();
            } catch (error) {
                console.error(`Erreur lors de la récupération des jeux (${category}) :`, error);
                return [];
            }
        };

        // Récupération des jeux pour chaque catégorie
        for (const category of Object.keys(categories)) {
            categories[category].jeux = await fetchGames(category);
        }

        // Sélection du tbody du tableau
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ""; // Efface le contenu existant

        // Création dynamique des lignes du tableau
        for (let i = 0; i < categories.CLASSIQUE.max; i++) {
            let row = document.createElement("tr");

            // Ajout des cellules pour CLASSIQUE et NOUVEAUTÉ
            row.innerHTML = `
                <td>${categories.CLASSIQUE.jeux[i]?.nom || "N/A"}</td>
                <td>${categories.NOUVEAUTE.jeux[i]?.nom || "N/A"}</td>
            `;

            // Ajout de GRAND CARROUSEL (fusion de 2 lignes)
            if (i % 2 === 0 && i / 2 < categories.GRAND_CARROUSEL.max) {
                let td = document.createElement("td");
                td.textContent = categories.GRAND_CARROUSEL.jeux[i / 2]?.nom || "N/A";
                td.rowSpan = 2; // Fusionne 2 lignes
                row.appendChild(td);
            }

            tbody.appendChild(row);
        }

    } catch (error) {
        console.error("Erreur générale lors du chargement des jeux :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

document.getElementById("btnSuprimerDeLaPageDaccueil").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
    const nom = document.getElementById("recupereNomJeuPageDAccueilS").value;
    const type = document.getElementById("recupereLEndroisChoisiS").value;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`http://localhost:3000/supprimerJeuDeLaPageDAccueil/${type}/${nom}`, { 
        method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("le jeu n'est plus afficher sur la page d'accueil !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});
