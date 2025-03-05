/*
* Nom: scriptPersonaLudique.js
* Description: Ce script permet de récupérer les informations du profil de l'utilisateur connecté et de les afficher dans la page profil.html
* Auteur: Matthieu Lamidon
* Version: 1.0.3
* Dernière modification: 2025-03-05
*/
document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("chargement du profil");

        const token = localStorage.getItem("token");
        const pseudo = localStorage.getItem("pseudo");

        if (!token || !pseudo) {
            throw new Error("Token ou pseudo manquant.");
        }
        //avant ça ne marchais pas mais en forsant l'encodage ça marche bien jsp pourquoi mais ok 
        const response = await fetch(`http://localhost:3000/profils/${encodeURIComponent(pseudo)}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();

    // zn gros si on n'a pas la valeur on met "Non renseigné" et oui je me suis enuiyer a faire un truc complex a la place d'une simple fonction ça ma pris 30 min j'ai trop le seum
    const checkValue = (value) => value ? value : "Non renseigné";

    document.getElementById("id").textContent = `ID : ${checkValue(data.id_utilisateur)}`;
    document.getElementById("profil").textContent = `Pseudo : ${checkValue(data.pseudo)}`;
    document.getElementById("adresse_mail").textContent = `Adresse mail : ${checkValue(data.adresse_email)}`;
    document.getElementById("nom").textContent = `Nom : ${checkValue(data.nom)}`;
    document.getElementById("prenom").textContent = `Prénom : ${checkValue(data.prenom)}`;

    document.getElementById("description").textContent = `Description : ${checkValue(data.description)}`;

    //lui il bug a voire si j'ai le temps et la detern=mination de le corriger 
    //document.getElementById("date_de_naissance").textContent = `Date de naissance : ${checkValue(data.date_de_naissance)}`;

    //n'existe pas dans le fichier html et j'ai la flemme de le faire
    //document.getElementById("date_d_inscription").textContent = `Date d'inscription : ${checkValue(data.date_inscription)}`;

    if(data.icone_profil=="Ico1"){
        document.getElementById("icone_profil").src = "img/image_de_profile_par_default.png";
    }
    

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
});

document.getElementById("modifierValider").addEventListener("click", async function () {
    const token = localStorage.getItem("token");
    const Actuelpseudo = localStorage.getItem("pseudo");

    if (!token) {
        console.error("Token manquant");
        return;
    }

    // Récupérer les valeurs du formulaire
    const pseudo = document.getElementById("nouveauPseudo").value;
    const adresse_email = document.getElementById("nouveauEmail").value;
    const nom = document.getElementById("nouveauNom").value;
    const prenom = document.getElementById("nouveauPrenom").value;
    const date_de_naissance = document.getElementById("nouveauDateDeNaissance").value;
    const description = document.getElementById("nouvelledescription").value;
    
    // Vérification de l'email et de la date de naissance
    if (adresse_email&&!validateEmail(adresse_email)) {
        alert("Adresse email invalide !");
        return;
    }

    if (date_de_naissance&&!validateDate(date_de_naissance)) {
        alert("La date de naissance doit être au format YYYY-MM-DD !");
        return;
    }

    // Vérification de l'icône de profil
    const iconeProfilElement = document.getElementById("iconeProfil");
    //le choix est un mansonge the cake is a lie
    const icone_profil = iconeProfilElement ? iconeProfilElement.value : "Ico1";

    // Préparer les données à envoyer, avec la condition de vérifier si Actuelpseudo existe
    const dataToSend = {};

    // Ajouter uniquement les champs remplis
    if (pseudo) dataToSend.pseudo = pseudo;
    if (adresse_email) dataToSend.adresse_email = adresse_email;
    if (nom) dataToSend.nom = nom;
    if (prenom) dataToSend.prenom = prenom;
    if (date_de_naissance) dataToSend.date_de_naissance = date_de_naissance;
    if (description) dataToSend.description = description;
    if (icone_profil) dataToSend.icone_profil = icone_profil;

    
    if (Actuelpseudo) {
        dataToSend.Actuelpseudo = Actuelpseudo;
    } else {
        console.error("Actuelpseudo est manquant");
        return; // Sortie de la fonction si Actuelpseudo est absent
    }

    // Si aucun champ n'a été rempli, ne pas envoyer de requête
    if (Object.keys(dataToSend).length === 0) {
        console.log("Aucune donnée à mettre à jour.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/majProfils", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Envoi du token dans les en-têtes
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur lors de la mise à jour du profil :", errorData.errors || errorData);
        } else {
            console.log("Profil mis à jour avec succès !");
            if (pseudo) localStorage.setItem("pseudo", pseudo);
            window.location.reload();
        }
    } catch (error) {
        console.error("Une erreur est survenue lors de la requête:", error);
    }
});


// Fonction de validation de l'email
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Fonction de validation de la date (format ISO8601 : YYYY-MM-DD)
function validateDate(date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
}

