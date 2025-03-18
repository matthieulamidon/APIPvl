document.getElementById("btnLudo").addEventListener("click", async function () {
    

    let pseudo = localStorage.getItem("pseudo");
    let jeu = localStorage.getItem("jeuxSelectionner");
    const Statut = document.getElementById("statut-select").value;

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
        console.log("Id us :",id_utilisateur);
        console.log("Id us :",id_jeux);
        
        // Vérifie si on a bien récupéré les IDs avant d'envoyer la requête POST
        if (id_utilisateur !== 0 && id_jeux !== 0) {
            const LudoData = {
                id_utilisateur: id_utilisateur,
                id_jeux: id_jeux,
                statut: Statut
            };

            const postResponse = await fetch("http://localhost:3000/TestPostLudotheque", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(LudoData)
            });

            if (!postResponse.ok) {
                throw new Error(`Erreur HTTP : ${postResponse.status}`);
            }

            const result = await postResponse.json();
            alert("Le Jeu a été ajouté à votre Ludothèque !");
            console.log("Réponse API :", result);
        } else {
            alert("Erreur : Impossible de récupérer les identifiants.");
        }

    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});