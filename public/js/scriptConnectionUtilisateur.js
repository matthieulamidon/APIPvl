document.getElementById("btnValider").addEventListener("click", async function () {
    // Récupérer les valeurs du formulaire
    const pseudo = document.getElementById("recuperePseudoCreeUnProfile").value;
    const email = document.getElementById("recupereEmailCreeUnProfile").value;
    const password = document.getElementById("recupereMotsDePasseCreeUnProfile").value;
    const confirmPassword = document.getElementById("recupereMotsDePasseCreeUnProfileVerif").value;

    if (!pseudo || !email || !password || !confirmPassword) {
        alert("Tous les champs doivent être remplis !");
        return;
    }

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    
    const userData = {
        pseudo: pseudo,
        adresse_email: email,
        mot_de_passe: password
    };

    try {
        
        const response = await fetch("http://localhost:3000/creationDutilisateurs", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("Compte créé avec succès !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

document.getElementById("btnConnexion").addEventListener("click", async function () {
    // Récupérer les valeurs du formulaire
    const email = document.getElementById("recuperePseudo").value;
    const motDePasse = document.getElementById("recupereMotsDePasse").value;

    // Vérification des champs
    if (!email || !motDePasse) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Création de l'objet à envoyer
    const userData = {
        email: email,
        motDePasse: motDePasse
    };

    try {
        const response = await fetch("http://localhost:3000/loginMdp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("Connexion réussie !");
        console.log("Token JWT :", result.token);

        // Stocker le token JWT dans le localStorage bah oui je sais pas faire des cookies autre que ce aux pepites de chocolat
        localStorage.setItem("token", result.token);

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Identifiants incorrects ou erreur serveur.");
    }
});