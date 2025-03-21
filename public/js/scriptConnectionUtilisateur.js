/*
* Nom: scriptConnectionUtilisateur.js
* Description: Cefichier permet de gérer la connexion et la déconnexion des utilisateurs et est utiliser par tout les fichier html
* Auteur: Matthieu Lamidon
* Version: 1.0.2
* Dernière modification: 2025-03-05
*/

//permet de créé un profile
document.getElementById("btnValider").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
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

    console.log("test");
    
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

//permet de ce connecter a sont profile
document.getElementById("btnConnexion").addEventListener("click", async function () {

    const email = document.getElementById("recuperePseudo").value;
    const motDePasse = document.getElementById("recupereMotsDePasse").value;

    if (!email || !motDePasse) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Vérifie les valeurs
    console.log("Email :", email);
    console.log("Mot de passe :", motDePasse);

    const userData = { 
        adresse_email: email,
        mot_de_passe: motDePasse 
    };

    try {
        //ci-dessous l'ensemble du seum des 6 heures de travail perdu car les cookies ne fonctionnent pas :'(
        const response = await fetch('http://localhost:3000/loginMdp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        alert("Connexion réussie !");
        
        // Sauvegarde le token dans localStorage 
        const token = data.token;  // Assurez-vous que la réponse contient le token
        localStorage.setItem('token', token);
        localStorage.setItem('pseudo', data.pseudo);
        localStorage.setItem('id_utilisateur', data.id_utilisateur);

        window.location.reload();

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Identifiants incorrects ou erreur serveur.");
    }
});

// Vérifier si l'utilisateur est connecté au chargement de la page
document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem('token');  // Récupère le token depuis localStorage

    if (!token) {
        console.log("Utilisateur non connecté.");
        document.getElementById("nomUtilisateur").textContent = "Veuillez vous connecter.";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/checkAuth", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`  // Envoie le token dans l'en-tête Authorization
            }
        });

        if (!response.ok) throw new Error("Non connecté");

        const userData = await response.json();
        console.log("Utilisateur connecté :", userData);
        localStorage.setItem('pseudo', userData.pseudo);
        document.getElementById("nomUtilisateur").textContent = `Bienvenue, ${userData.pseudo} !`;

    } catch (error) {
        console.log("Erreur lors de la vérification de l'utilisateur :", error);
        document.getElementById("nomUtilisateur").textContent = "Veuillez vous connecter.";
    }
});

// Déconnexion de l'utilisateur
document.getElementById("btnDeconnexion").addEventListener("click", async function () {
    try {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('pseudo');
        
        alert("Déconnexion réussie !");
        window.location.reload(); // Recharge la page 

    } catch (error) {
        console.error("Erreur de déconnexion :", error);
    }
});
