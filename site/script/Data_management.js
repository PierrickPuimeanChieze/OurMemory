/*
** Created by Shimishsar on 25/01/2016.
*/

/*
**  fonction pour charger les donnés sauvegarder
 */
function load_data(id)
{
    var     data;

    data = JSON.parse(window.localStorage.getItem(String(id)));

    return data;
}

function saveDataAsJson(id, data )
{
    var dataAsJson = JSON.stringify(data);
    window.localStorage.setItem(String(id), dataAsJson);
}

/*
**  Fonction qui crée la configuration par default. Peut être mettre cette option dans la configuration sans toucher
**  à la variable du nombre de compte.
 */
function create_config()
{
    var     config;

    config ={
        //version: "humors",
        time: 45,           //durée du chrono en secondes.
        counter: 45,         //durée pendant laquelle les carte sont face visible avant le debut de la partie, en secondes.
        seed: "test",        //code de disposition aléatoire
        //nbpair: 6,          //Nombre de paire du jeu.
        //nbgame: 0           //Nombre de partie créé.
        host: "http://192.168.99.100:9090/"
    };

    return config;
}

function initConfig(config)
{
    if(!config.time) {
        config.time = 45;
    }
    if(!config.counter) {
        config.counter = 45;
    }
    if(!config.seed) {
        config.seed = "test";
    }
    if(!config.host) {
        config.host = "http://192.168.99.100:9090/";
    }
    return config;
}

function newGame()
{
    var config;
    var newGame;

    config = load_data("config");
    newGame = {
        "firstname": "firstname", //Prénom
        "name": "name", //Nom
        "birthdate": "2015-16-02", //Date de naissance au format ISO : YYYY-MM-DD
        "age": 32, //age. Pas de controle par rapport à la date de naissance
        "classe": "CM2",
        "sex": "M | F", //le sexe du joueur
        "version": "standard | humor", // la version joué
        "date": "2015-12-31", //Date de la partie  au format ISO : YYYY-MM-DD
        "preGameVisibilityDuration": 45, // le nombre de secondes pendant lesquelles les cartes ont été visibles
        "gameLimit": 45, //Durée de comptabilisation intermédiaires
        "triesBeforeGameLimit": 999, //Nombres de couprs joués avant la limitre de comptabilisation
        "pairsfoundBeforGameLimit": 999, //Nombre de paires trouvées avant la limite de comptabilisation
        "totalTries": 0, // Nombre d'essai total
        "totalDuration": 0, //Durée total de la partie en secondes
        "seed": "",
        "likeQuestion": "",
        "funQuestion": "",
        "replayQuestion": "",
        "id": "" //identifiant générés par le serveur
    };

    newGame.preGameVisibilityDuration = config.counter;
    newGame.gameLimit = config.time;
    newGame.seed = config.seed;
    return newGame;
}

function randomPlacementCards(cards, game)
{
    //Ici on créé un tableau modifiable d'element a modifier, ceci afin de pouvoir retirer un element carte quand il a été associé a une image
    var remainingCardElements = Array.prototype.slice.call(cards);
    var imageIndex = 1;

    //Si le nombre de cartes à placer est impair
    if (remainingCardElements.length % 2 >0) {
        //On affiche une erreur
        window.alert("WARNING ! Nombre de cartes impaire sur le tableau");
        //et on arrète la methode
        return;
    }
    Math.seedrandom(game.seed);

    //Pour chacun des element carte restant encore a remplir
    while (remainingCardElements.length>0) {
        //Par deux fois
        for (var i =0; i<2 ;i++) {
            //On en récupère un au hasard
            var elementIndex = Math.floor(Math.random()*remainingCardElements.length);
            //On change sa source pour l'image actuellement pointée par imageIndex
            remainingCardElements[elementIndex].src = "images/" + game.version + "/Image-" + imageIndex + ".jpg";
            //Et one le retire de la liste
            remainingCardElements.splice(elementIndex, 1);
        }
        //Puis on incrémente l'index de l'image (on ou boucle si il a atteint la limite
        if (imageIndex == imageNumber) {
            imageIndex = 1;
        } else {
            imageIndex++;
        }

    }
}
