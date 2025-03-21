/*
* Nom: ajoutJeu.js
* Description: contient des fonction lier a l'admin pour ajouter des jeu a la BDD
* Auteur: Barthelemy Coutard
* Version: 1.0.0
* Dernière modification: 2025-03-11
*/

//permet d'ajouter un jeu de maniere rapide mais incomplete
document.getElementById("btnAjoutJeu").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
    const nom = document.getElementById("recupereNomJeu").value;
    const image = document.getElementById("recupereSrcJeu").value;
    const grandeImage = document.getElementById("recupereGrandeSrcJeu").value;
    let date = document.getElementById("recupereDateJeu").value;
    let description = document.getElementById("recupereDescriptionDuJeu").value;

    if (!nom || !image || !date) {
        alert("Le nom l'image, et la date sont obligatoires !");
        return;
    }

    console.log("Date :", date);

    //let [annee, mois, jour] = date.split("-"); // Sépare la date
    //let dateConvertie = `${mois}-${jour}-${annee}`; // Reformate en MM-DD-YYYY
    //date = dateConvertie

    console.log("Date convertie :", date);

    if (!description){
        description = "Pas de description"
    };



    const userData = {
        nom: nom,
        src_image_jaquette: image,
        src_image: grandeImage,
        date_publication: date,
        description: description
    };

    console.log("test");

    const token = localStorage.getItem("token");
    console.log("Token récupéré :", token);
    
    try {
        const response = await fetch("http://localhost:3000/TestPostJeu", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("Enregistrement créé avec succès !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

//permet de modifier un jeu
document.getElementById("btnModJeu").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
    const id = document.getElementById("nom-jeu-select").value;
    const nomMod = document.getElementById("recupereNomModJeu").value.trim();
    const imageMod = document.getElementById("recupereSrcModJeu").value.trim();
    let dateMod = document.getElementById("recupereDateModJeu").value.trim();
    let descriptionMod = document.getElementById("recupereDescriptionModJeu").value.trim();
    const EditeurMod = document.getElementById("editeur-jeu-select").value.trim();
    const StudioMod = document.getElementById("studio-jeu-select").value.trim();
    const grandeImage = document.getElementById("recupereGrandeSrcModJeu").value.trim();

    const userData = {};

    // Ajoute uniquement les valeurs non nulles et non vides
    if (nomMod) userData.nom = nomMod;
    if (imageMod) userData.src_image_jaquette = imageMod;
    if (dateMod) userData.date_publication = dateMod;
    if (descriptionMod) userData.description = descriptionMod;
    if (EditeurMod) userData.editeur = EditeurMod;
    if (StudioMod) userData.studio = StudioMod;
    if (grandeImage) userData.src_image = grandeImage;

    console.log("id:", id);

    const token = localStorage.getItem("token");
    console.log("Token récupéré :", token);
    
    console.log("Données filtrées :", userData);

    try {
        const response = await fetch(`http://localhost:3000/TestPutJeu/${encodeURIComponent(id)}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("Enregistrement modifié avec succès !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

//ce commentaire est encore a faire
document.addEventListener("DOMContentLoaded", async function () {
    try {
        fetch(`http://localhost:3000/TestGetJeux`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Réponse du serveur :", data);
            const formBody = this.getElementById("nom-jeu-select");
            const TagBody = this.getElementById("nom-jeu-select-tag");
            const PlateformeBody = this.getElementById("nom-jeu-select-plateforme");
            // Vérifie si le jeu est dans la ludothèque
            if (data.length > 0) {
                data.forEach(item => {
                    const row = document.createElement('option');
                    row.value = `${item.id_jeux}`
                    row.innerHTML = `${item.nom}`;
                    formBody.appendChild(row);

                    const row2 = document.createElement('option');
                    row2.value = `${item.id_jeux}`
                    row2.innerHTML = `${item.nom}`;
                    TagBody.appendChild(row2);

                    const row3 = document.createElement('option');
                    row3.value = `${item.id_jeux}`
                    row3.innerHTML = `${item.nom}`;
                    PlateformeBody.appendChild(row3);
                });
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
});

//enum de la liste des editeur
const ListeEditeurs = ['NON_DEFINI', 'NINTENDO', 'SONY', 'MICROSOFT', 'EA','UBISOFT','ACTIVISION_BLIZZARD','TAKE_TWO_INTERACTIVE','SQUARE_ENIX','BANDAI_NAMCO','CAPCOM','SEGA','EMBRACER_GROUP', 'WARNER_BROS_GAMES', 'KOEI_TECMO','DEVOLVER_DIGITAL','ANNAPURNA_INTERACTIVE','STUDIO_505_GAMES','PARADOX_INTERACTIVE', 'TEAM17', 'FOCUS_ENTERTAINMENT', 'PRIVATE_DIVISION','LARIAN_STUDIOS','RAW_FURY', 'HUMBLE_GAMES', 'INFOGRAMES',  'LUCASARTS','EIDOS_INTERACTIVE','VIRGIN_INTERACTIVE', 'BULLFROG_PRODUCTIONS','PSYGNOSIS'];

//enum de la liste des studio
const ListeStudios  = [
    "NON_DEFINI", "ROCKSTAR", "NAUGHTY_DOG", "SANTA_MONICA_STUDIO", "CD_PROJEKT_RED",
    "UBISOFT", "BETHESDA", "FROM_SOFTWARE", "SQUARE_ENIX", "CAPCOM", "BANDAI_NAMCO",
    "ELECTRONIC_ART", "DICE", "BIOWARE", "INFINITY_YARD", "TREYARCH",
    "SUTDIO_343_INDUSTRIES", "BUNGIE", "INSOMNIAC_GAMES", "REMEDY_INTERTAINMENT",
    "LARIAN_STUDIOS", "OBSIDIAN_ENTERTAINMENT", "MOJANG", "TEAM_CHERRY",
    "DONTNOD_ENTERTAINMENT", "TANGO_GAMEWORKS", "PLATINUM_GAMES", "KOJIMA_PRODUCTIONS",
    "ARKANE_STUDIOS", "REBELLION", "BOHEMIA_INTERACTIVE", "CROTEAM", "HOUSEMARQUE",
    "THE_CHINESE_ROOM", "CONCERNEDAPE", "TOBY_FOX", "PSYONIX", "KLEI_ENTERTAINMENT",
    "MOTION_TWIN", "FACEPUNCH_STUDIOS", "GIANT_SQUID", "PLAYDEAD", "ANNAPURNA_INTERACTIVE",
    "VLAMBEER", "NO_BRAKES_GAMES", "GHOST_SHIP_GAMES", "IRON_GATE_STUDIO", "INNERSLOTH",
    "NINTENDO", "HAL_LABORATORY", "INTELLIGENT_SYSTEMS", "MONOLITH_SOFT", "RARE",
    "RETRO_STUDIOS", "NEXT_LEVEL_GAMES", "NDCUBE", "THE_1_UP_STUDIO", "GAME_FREAK",
    "CREATURES_INC", "GREZZO", "CAMELOT_SOFTWARE_PLANNING", "SORA_LTD", "VANPOOL",
    "SEGA", "WAYFORWARD", "KOEI_TECMO_OMEGA_FORCE", "KONAMI", "SNK", "ATARI",
    "ID_SOFTWARE", "ATLUS", "VALVE", "INFOGRAMES", "LUCASARTS", "THQ"
  ];

  const ListeTags = [
    "Action", "Aventure", "RPG", "JRPG", "WRPG", "FPS", "TPS", "Plateformes", "Stratégie",
    "Stratégie Temps Réel", "Stratégie Au Tour Par Tour", "Survie", "Horreur", "Puzzle", "Simulation",
    "Gestion", "City Builder", "Course", "Combat", "Party Game", "Rogue Like", "Rogue Lite",
    "Metroidvania", "Hack And Slash", "MMORPG", "MOBA", "Battle Royale", "Tactique", "Narratif",
    "Point And Click", "Sandbox", "Shoot Em Up", "Souls Like", "Exploration", "Infiltration",
    "Open World", "Coopératif", "Multijoueur", "Solo", "VR", "Indépendant", "Sport", "Musical",
    "Réalité Augmentée", "Tower Defense", "Deck Building", "Auto Battler", "Dungeon Crawler",
    "Textuel", "Survival Horror", "Visual Novel", "Farming", "Dating Sim", "Tycoon",
    "Cartes", "Jeu de Rythme", "Beat Them Up", "Battle Chess", "Mecha", "Stealth",
    "Bullet Hell", "Clicker", "Idle Game", "Education", "Cuisine", "Pêche", "Physics Game","Historique",
    "Construction", "Histoire Interactive", "Anime", "Cyberpunk", "Steampunk",
    "Post Apocalyptique", "Fantastique", "Science Fiction", "Médiéval",
    "Western", "Pirates", "Zombie", "Cthulhu", "Detective", "Crime",
    "Guerre", "Politique", "Espionnage", "Artisanat", "Exploration Sous Marine" ,"Narration"
];

const ListePlateformes = [
    "PC", "PS5", "PS4", "PS3", "PS2", "PS1", "PSP", "PS Vita",
    "Xbox Series X", "Xbox Series S", "Xbox One", "Xbox 360", "Xbox",
    "Nintendo Switch", "Wii U", "Wii", "GameCube", "N64", "SNES", "NES",
    "Game Boy", "Game Boy Color", "Game Boy Advance", "DS", "3DS", "2DS",
    "Steam Deck", "Meta Quest", "Oculus Rift", "HTC Vive", "PS VR",
    "Atari 2600", "Atari 5200", "Atari 7800", "Atari Jaguar", "Atari Lynx",
    "Sega Mega Drive", "Sega Genesis", "Sega Saturn", "Sega Dreamcast",
    "Neo Geo", "Neo Geo Pocket", "TurboGrafx-16", "Amiga", "Commodore 64",
    "MSX", "ZX Spectrum", "Arcade", "Mobile", "iOS", "Android", "Cloud Gaming","CD-i"
];

//les menue deroulant pour choisir l'editeur
function RemplissageEditeurs(){
    const EditeurBody = document.getElementById("editeur-jeu-select")
    ListeEditeurs.forEach(item => {
        const row = document.createElement('option');
        row.value = item;
        row.innerHTML = item
        EditeurBody.appendChild(row);
    });
}

//les menue deroulant pour choisir les studio de dev
function RemplissageStudios(){
    const StudioBody = document.getElementById("studio-jeu-select")
    ListeStudios.forEach(item => {
        const row = document.createElement('option');
        row.value = item;
        row.innerHTML = item
        StudioBody.appendChild(row);
    });
}

function RemplissageTags(){
    const TagsBody = document.getElementById("tags-jeu-select")
    ListeTags.forEach(item => {
        const row = document.createElement('option');
        row.value = item;
        row.innerHTML = item
        TagsBody.appendChild(row);
    });
}

function RemplissagePlateformes(){
    const PlatBody = document.getElementById("plateformes-jeu-select")
    ListePlateformes.forEach(item => {
        const row = document.createElement('option');
        row.value = item;
        row.innerHTML = item
        PlatBody.appendChild(row);
    });
}
document.addEventListener("DOMContentLoaded", RemplissageEditeurs);
document.addEventListener("DOMContentLoaded", RemplissageStudios);
document.addEventListener("DOMContentLoaded", RemplissageTags);
document.addEventListener("DOMContentLoaded", RemplissagePlateformes);

//permet d'ajouter un tag a un jeu en gros un jeu est un FPS,STRATEGIQUE,...
document.getElementById("btnAjoutTag").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
    const id = document.getElementById("nom-jeu-select-tag").value;
    const nom = document.getElementById("tags-jeu-select").value;

    if (!nom) {
        alert("Veuillez entrer un Tag.");
        return;
    }

    const dataTag = {
        nom: nom,
        id_jeux: parseInt(id)
    };

    console.log("test");
    console.log(dataTag);

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Veuillez vous connecter pour ajouter un tag.");
        return;
    }

    console.log("Token récupéré :", token);
    
    try {
        const response = await fetch("http://localhost:3000/addTag", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataTag)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("Enregistrement modifié avec succès !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

//pour rajouter une plateforme de jeu
document.getElementById("btnAjoutPlateforme").addEventListener("click", async function () {
    // Récupère les valeurs du formulaire
    const id = document.getElementById("nom-jeu-select-plateforme").value;
    const nom = document.getElementById("plateformes-jeu-select").value;

    if (!nom) {
        alert("Veuillez entrer une plateforme.");
        return;
    }

    const dataTag = {
        nom: nom,
        id_jeux: parseInt(id)
    };

    console.log("test");
    console.log(dataTag);

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Veuillez vous connecter pour ajouter un tag.");
        return;
    }

    console.log("Token récupéré :", token);
    
    try {
        const response = await fetch("http://localhost:3000/addPlateforme", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataTag)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        alert("Enregistrement modifié avec succès !");
        console.log("Réponse API :", result);

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});