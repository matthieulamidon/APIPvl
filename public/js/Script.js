document.addEventListener('DOMContentLoaded', async function () {
    const EnCoursBody = document.getElementById('containerJeuxEnCours');
    const AbandonBody = document.getElementById('containerJeuxAbandon');
    const PrevuBody = document.getElementById('containerJeuxPrevu');
    const CompleteBody = document.getElementById('containerJeuxComplete');
    const EnPauseBody = document.getElementById('containerJeuxEnPause');


    const listeIdEnCours = [];
    const listeIdAbandon = [];
    const listeIdPrevu = [];
    const listeIdComplete = [];
    const lisetIdEnPause = [];

    try {
        console.log("chargement du profil");
    
        const token = localStorage.getItem("token");
        const pseudo = localStorage.getItem("pseudo");
    
        if (!token || !pseudo) {
            throw new Error("Token ou pseudo manquant.");
        }
    
        const response = await fetch(`http://localhost:3000/getid/${encodeURIComponent(pseudo)}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Id:", data);
    
        const userId = data
    

        fetch(`http://localhost:3000/TestGetLudoU/${encodeURIComponent(userId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("LudoU Data:", data);
                data.forEach(item => {
                    if (item.statut == "EN_COURS") {
                        listeIdEnCours.push(item.id_jeux);
                    } else if (item.statut == "ABANDON") {
                        listeIdAbandon.push(item.id_jeux);
                    } else if (item.statut == "PREVU") {
                        listeIdPrevu.push(item.id_jeux);
                    } else if (item.statut == "COMPLETE") {
                        listeIdComplete.push(item.id_jeux);
                    } else if (item.statut == "EN_PAUSE") {
                        lisetIdEnPause.push(item.id_jeux);
                    }
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données JSON :', error);
            });
    
        fetch('http://localhost:3000/TestGetJeux')
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
    
                const jeuxEnCours = data.filter(item => listeIdEnCours.includes(item.id_jeux));
                const jeuxAbandon = data.filter(item => listeIdAbandon.includes(item.id_jeux));
                const jeuxPrevu = data.filter(item => listeIdPrevu.includes(item.id_jeux));
                const jeuxComplete = data.filter(item => listeIdComplete.includes(item.id_jeux));
                const jeuxEnPause = data.filter(item => lisetIdEnPause.includes(item.id_jeux));
    
                afficherJeux(jeuxEnCours, EnCoursBody);
                afficherJeux(jeuxAbandon, AbandonBody);
                afficherJeux(jeuxPrevu, PrevuBody);
                afficherJeux(jeuxComplete, CompleteBody);
                afficherJeux(jeuxEnPause, EnPauseBody);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données JSON :', error);
            });
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
})

function afficherJeux(listeJeux, container) {
    listeJeux.forEach(item => {
        const row = document.createElement('div');
        row.className = 'col-md-2';
        row.style.marginBottom = '20px';

        row.innerHTML = `
            <img class="zoom-img" src="${item.src_image_jaquette}" style="height:300px" alt="${item.nom}">
            <h6 class="TitreJeu">${item.nom}</h6>
        `;

        container.appendChild(row);
    });
}