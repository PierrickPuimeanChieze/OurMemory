/**Created by Shimishsar on 22/04/2016.**/
var     config;
var     val;
var     game;
var     now;
var     arrayGame = new Array;

/*
 **  fonction initialisation de la page.
 */

function init()
{
    now = new Date();

    game = newGame();
    config = load_data("config");

    if(load_data("arrayGame") !== null)
        arrayGame = load_data("arrayGame");
    if (load_data("secondGame") !== null)
    {
        game = load_data("secondGame");
        window.localStorage.removeItem("secondGame");
        prefilling();
    }
    document.getElementById('validate').onclick = validate;
}

function validate()
{
    var i;
    var tab;

    if (!(document.getElementById('firstName').value) || !(document.getElementById('name').value)
        || !(document.getElementById('birthDate').value) || !(document.getElementById('age').value)
        || !(document.getElementById('class').value))
    {
        alert("Veuillez remplir tout les champ pour continuer.");
        return ;
    }
    game.firstname = document.getElementById('firstName').value;
    game.name = document.getElementById('name').value;
    game.birthdate = document.getElementById('birthDate').value;
    game.age = document.getElementById('age').value;
    game.classe = document.getElementById('class').value;
    tab = document.getElementsByName('gender');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].checked)
        {
            game.sex = tab[i].value;
            break;
        }
        if (i === (tab.length - 1))
        {
            alert("Veuillez remplir tout les champ pour continuer.");
            return ;
        }
    }
    tab = document.getElementsByName('version');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].checked)
        {
            game.version = tab[i].value;
            break;
        }
        if (i === (tab.length - 1))
        {
            alert("Veuillez remplir tout les champ pour continuer.");
            return ;
        }
    }
    game.date = ('0'+now.getDate()).slice(-2) + "-" + ('0'+(now.getMonth()+1)).slice(-2) + "-" + now.getFullYear();
    val = JSON.stringify(game);
    window.localStorage.setItem("newGame", val);
    if (game.version === "sad")
        location.href=("Rules.html");
    else
        location.href=("RulesM.html");
}

function prefilling()
{
    var i;
    var tab;

    document.getElementById('firstName').value = game.firstname;
    document.getElementById('name').value = game.name;
    document.getElementById('birthDate').value = game.birthdate;
    document.getElementById('age').value = game.age;
    document.getElementById('class').value = game.classe;
    tab = document.getElementsByName('gender');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].value === game.sex)
        {
            tab[i].checked = true;
            break;
        }
    }
    tab = document.getElementsByName('version');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].value !== game.version)
        {
            tab[i].checked = game.version;
            break;
        }
    }
}