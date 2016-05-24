/**Created by Shimishsar on 22/04/2016.**/
/*
 **  fonction initialisation de la page.
 */
var config;

function init() {
    config = load_data("config");
    if (config == null)
        config = {};
    //We always pass by the init method to update old config
    initConfig(config);
    saveDataAsJson("config", config);
    updatePage();
    document.getElementById('validate').onclick = validate;
}

function testConnection() {
    if (!window.XMLHttpRequest) {
        alert("Unable to sent. XMLHttpRequest not available for this browser");
        return;
    }
    var hostToTest = document.getElementById('host').value + "/status";

    var req = new window.XMLHttpRequest();

    req.open('GET', hostToTest, false);
    try {
        req.send();
        if (req.status === 204) {
            alert("Connexion réussie");
        }
        else {
            alert("Echec de connexion : " + res.statusText);
        }
    } catch (e) {
        alert("Echec de connexion : " + e);

    }
}

/*
 **  fonction pour mettre � jour la variable de configuration.
 */
function updateConfig() {
    var val;

    config.time = document.getElementById('timeGame').value;
    config.counter = document.getElementById('timeMemo').value;
    config.seed = document.getElementById('seed').value;
    config.host = document.getElementById('host').value;
    val = JSON.stringify(config);
    window.localStorage.setItem("config", val);
}

/*
 **  fonction pour mettre � jour l'affichage de la page.
 */
function updatePage() {
    document.getElementById('timeGame').value = config.time;
    document.getElementById('txttimeGame').textContent = config.time;
    document.getElementById('timeMemo').value = config.counter;
    document.getElementById('txttimeMemo').textContent = config.counter;
    document.getElementById('seed').value = config.seed;
    document.getElementById('host').value = config.host;
}

function validate() {
    updateConfig();
    location.href = ("index.html");
}
