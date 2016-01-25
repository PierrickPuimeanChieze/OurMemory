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

/*
**  Fonction qui crée la configuration par default. Peut être mettre cette option dans la configuration sans toucher
**  à la variable du nombre de compte.
 */
function create_config()
{
    var     config;

    config ={
        version: "humors",
        time: 30,           //durée de la partie en secondes.
        counter: 5,         //durée pendant laquelle les carte sont face visible avant le debut de la partie, en secondes.
        see: "test",        //code de disposition aléatoire
        nbpair: 6,          //Nombre de paire du jeu.
        nbUser: 0           //Nombre de compte créé.
    };

    return config;
}
