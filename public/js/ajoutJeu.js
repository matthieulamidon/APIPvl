
document.getElementById("btnAjoutJeu").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
    const nom = document.getElementById("recupereNomJeu").value;
    const image = document.getElementById("recupereSrcJeu").value;
    let date = document.getElementById("recupereDateJeu").value;
    let description = document.getElementById("recupereDescriptionDuJeu").value;

    if (!nom || !image || !date) {
        alert("Le nom l'image, et la date sont obligatoires !");
        return;
    }

    console.log("Date :", date);

    let [annee, mois, jour] = date.split("-"); // Sépare la date
    let dateConvertie = `${mois}-${jour}-${annee}`; // Reformate en MM-DD-YYYY
    date = dateConvertie

    console.log("Date convertie :", date);

    if (!description){
        description = "Pas de description"
    };

    let image_defaut = "images/civ-7.jpg"

    const userData = {
        nom: nom,
        src_image_jaquette: image,
        src_image: image_defaut,
        date_publication: date,
        description: description
    };

    console.log("test");
    
    try {
        const response = await fetch("http://localhost:3000/TestPostJeu", { 
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
        alert("Enregistrement créé avec succés !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

