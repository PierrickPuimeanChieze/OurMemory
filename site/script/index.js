/**Created by Shimishsar on 22/04/2016.**/
var     config;
var     val;

function init()
{
    config = load_data("config");
    if (config == null)
        config = create_config();
    //window.localStorage.clear();      //ligne pour effacer tout les donner rentrer dans le localStorage
    val = JSON.stringify(config);
    window.localStorage.setItem("config", val);     /*Pour le cas ou on ne passe pas par la page reglage*/

    document.getElementById('config').onclick = function() {
        location.href=("Configuration.html");
    };

    document.getElementById('newPlayer').onclick = function() {
        location.href=("NewPlayer.html");
    };

    document.getElementById('existingPlayer').onclick = function() {
        location.href=("existing_player.html");
    };
}
