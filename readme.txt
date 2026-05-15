Pour pouvoir utiliser correctement, voici quelques informations qu'il est utile de savoir:

-c'est un projet qui utilise node pour le lancer vous devez git clone le code sur votre machine 

-il faut, pour le lancer, ouvrir le terminal vous deplacer dans le dossier principal et executer la commande:

  - npm run server

-Toutes les images de notre sites sont issues de la base de données, il est donc nécessaire de l'importer pour une meilleure expérience (Fichier sauvegarde.sql ou importData.js).

-Seul le compte administrateur peut poster ou modifier des jeux sur le site via la page administrateur (email : admin@apipvl.com ; mot de passe : Ceci est le mot de passe admin)

-Ce site est un site de gestion de ludothèque virtuelle, pour ajouter un jeu à votre ludothèque, allez dans l'onglet "Recherche", taper le nom du jeu souhaité puis cliquez sur l'image du jeu qui s'affiche. Sur la page du jeu, cliquez sur "Ajouter à ma ludothèque" et définissez un statut (nécessaire pour que le jeu s'affiche dans la ludothèque). Vous pourrez ainsi le consulter dans la ludothèque dans la catégorie choisie. Pour supprimer le jeu de la ludothèque, cliquez simplement sur "Supprimer de ma ludothèque".

-En mode administrateur, pour ajouter un jeu, cliquez sur "ajouter un jeu", entrez un nom valide, une source pour l'image verticale et pour l'image horizontale, la date de sortie et une courte description. Pour ajouter un tag, une plateforme, un editeur ou un studio, d'autres options sont disponibles en bas. Les options de suppression ne sont pas encore implémentées. Pour ajouter un jeu à la page d'acceuil, entrez simplement son titre, il s'affichera dans l'endroit choisi (grand carrousel, classique ou nouveau).

-L'option rechercher dans la navbar ne fonctionne que dans l'onglet "Recherche".

-Pour pouvoir utiliser la base de donnée, il faut penser à changer le nom d'utilisateur et le mot de passe maria DB dans le fichier .env

-Procedure simplifier d'importation de base de donnée : aller dans le fichier prisma et lancer : node importData.js

-Procedure simplifier d'exportation de base de donnée : aller dans le fichier prisma et lancer : node exportData.js

-info toutes les save de la base de donnée sont stoquer dans le fichier prisma sous le nom : export.json

-Procedure classique qui marche pour implémentées notre bdd depuis MariaDB :    1/utiliser les ligne de commande de MariaDB
                                                                                2/utiliser cette commande : mysql -u root -p pvl_database < "C:\\Users\\matth\\APIPvl\\sauvegarde.sql"

