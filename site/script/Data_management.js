/*
** Created by Shimishsar on 25/01/2016.
*/

/*
**  fonction pour charger les donn�s sauvegarder
 */
function load_data(id)
{
    var     data;

    data = JSON.parse(window.localStorage.getItem(String(id)));

    return data;
}

/*
**  Fonction qui cr�e la configuration par default. Peut �tre mettre cette option dans la configuration sans toucher
**  � la variable du nombre de compte.
 */
function create_config()
{
    var     config;

    config ={
        //version: "humors",
        time: 45,           //dur�e du chrono en secondes.
        counter: 45,         //dur�e pendant laquelle les carte sont face visible avant le debut de la partie, en secondes.
        seed: "test"        //code de disposition al�atoire
        //nbpair: 6,          //Nombre de paire du jeu.
        //nbgame: 0           //Nombre de partie cr��.
    };

    return config;
}

function newGame()
{
    var config;
    var newGame;

    config = load_data("config");
    newGame = {
        "firstname": "firstname", //Pr�nom
        "name": "name", //Nom
        "birthdate": "2015-16-02", //Date de naissance au format ISO : YYYY-MM-DD
        "age": 32, //age. Pas de controle par rapport � la date de naissance
        "classe": "CM2",
        "sex": "M | F", //le sexe du joueur
        "version": "standard | humor", // la version jou�
        "date": "2015-12-31", //Date de la partie  au format ISO : YYYY-MM-DD
        "preGameVisibilityDuration": 45, // le nombre de secondes pendant lesquelles les cartes ont �t� visibles
        "gameLimit": 45, //Dur�e de comptabilisation interm�diaires
        "triesBeforeGameLimit": 999, //Nombres de couprs jou�s avant la limitre de comptabilisation
        "pairsfoundBeforGameLimit": 999, //Nombre de paires trouv�es avant la limite de comptabilisation
        "totalTries": 0, // Nombre d'essai total
        "totalDuration": 0, //Dur�e total de la partie en secondes
        "seed": "",
        "likeQuestion": "",
        "funQuestion": "",
        "replayQuestion": "",
        "id": "" //identifiant g�n�r�s par le serveur
    };

    newGame.preGameVisibilityDuration = config.counter;
    newGame.gameLimit = config.time;
    newGame.seed = config.seed;
    return newGame;
}

function randomPlacementCards(cards, game)
{
    //Ici on cr�� un tableau modifiable d'element a modifier, ceci afin de pouvoir retirer un element carte quand il a �t� associ� a une image
    var remainingCardElements = Array.prototype.slice.call(cards);
    var imageIndex = 1;

    //Si le nombre de cartes � placer est impair
    if (remainingCardElements.length % 2 >0) {
        //On affiche une erreur
        window.alert("WARNING ! Nombre de cartes impaire sur le tableau");
        //et on arr�te la methode
        return;
    }
    Math.seedrandom(game.seed);

    //Pour chacun des element carte restant encore a remplir
    while (remainingCardElements.length>0) {
        //Par deux fois
        for (var i =0; i<2 ;i++) {
            //On en r�cup�re un au hasard
            var elementIndex = Math.floor(Math.random()*remainingCardElements.length);
            //On change sa source pour l'image actuellement point�e par imageIndex
            remainingCardElements[elementIndex].src = "images/" + game.version + "/Image-" + imageIndex + ".jpg";
            //Et one le retire de la liste
            remainingCardElements.splice(elementIndex, 1);
        }
        //Puis on incr�mente l'index de l'image (on ou boucle si il a atteint la limite
        if (imageIndex == imageNumber) {
            imageIndex = 1;
        } else {
            imageIndex++;
        }

    }
}
