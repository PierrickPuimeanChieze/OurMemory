/**Created by Shimishsar on 22/04/2016.**/
var     config;
var     val;
var     game;
var     now;
var     arrayGame = new Array;

now = new Date();

game = newGame();
/*
 **  fonction initialisation de la page.
 */

function init()
{
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
    }
    tab = document.getElementsByName('version');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].checked)
        {
            game.version = tab[i].value;
            break;
        }
    }
    game.date = now.getFullYear() + "-" + ('0'+(now.getMonth()+1)).slice(-2) + "-" + ('0'+now.getDate()).slice(-2);
    val = JSON.stringify(game);
    window.localStorage.setItem("newGame", val);
    location.href=("Rules.html");
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
    game.date = now.getFullYear() + "-" + ('0'+(now.getMonth()+1)).slice(-2) + "-" + ('0'+now.getDate()).slice(-2);
}