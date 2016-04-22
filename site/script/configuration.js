/**Created by Shimishsar on 22/04/2016.**/
/*
 **  fonction initialisation de la page.
 */
function init()
{
    config = load_data("config");
    if (config == null)
        config = create_config();

    updatePage();
    document.getElementById('validate').onclick = validate;
}

/*
 **  fonction pour mettre � jour la variable de configuration.
 */
function updateConfig()
{
    var     val;

    config.time = document.getElementById('timeGame').value;
    config.counter = document.getElementById('timeMemo').value;
    val = JSON.stringify(config);
    window.localStorage.setItem("config", val);
}

/*
 **  fonction pour mettre � jour l'affichage de la page.
 */
function updatePage()
{
    document.getElementById('timeGame').value = config.time;
    document.getElementById('timeMemo').value = config.counter;
}

function validate()
{
    updateConfig();
    location.href=("index.html");
}
