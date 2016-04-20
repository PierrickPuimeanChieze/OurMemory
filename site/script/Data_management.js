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
        //see: "test",        //code de disposition al�atoire
        //nbpair: 6,          //Nombre de paire du jeu.
        nbgame: 0           //Nombre de partie cr��.
    };

    return config;
}
