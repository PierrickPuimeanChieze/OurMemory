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
        counter: 45         //dur�e pendant laquelle les carte sont face visible avant le debut de la partie, en secondes.
        //see: "test",        //code de disposition al�atoire
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
        "likeQuestion": "",
        "funQuestion": "",
        "replayQuestion": "",
        "id": "" //identifiant g�n�r�s par le serveur
    };

    newGame.preGameVisibilityDuration = config.counter;
    newGame.gameLimit = config.time;
    return newGame;
}
