/*
* Nom: verifAdmin.js
* Description: permet de rajouter le bouton Page admin si tu est admin
* Auteur: Barthelemy Coutard
* Version: 1.0.0
* Dernière modification: 2025-03-11
*/

//rajoute le bouton Page admin si tu est admin
document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem("token"); 

    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/VerifAdmin", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },  
      });

      if (response.ok) {
        document.getElementById("admin-link").style.display = "block"; // Affiche le lien si l'utilisateur est administrateur
      }
    } catch (error) {
      console.error("Erreur lors de la vérification admin :", error);
    }
})