/**
 * Created by Shimishsar on 22/04/2016.
 **/


var game;
var config;
var arrayGame;
var tab;
var i;
var val;

arrayGame = load_data("arrayGame");
/*game = arrayGame[arrayGame.length - 1];
config = JSON.parse(window.localStorage.getItem("config"));*/
game = load_data("newGame");
document.getElementById('prenom').innerHTML = game.firstname;
document.getElementById('sends').onclick = function()
{
    tab = document.getElementsByName('likeQuestion');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].checked)
        {
            game.likeQuestion = tab[i].value;
            break;
        }
    }
    tab = document.getElementsByName('funQuestion');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].checked)
        {
            game.funQuestion = tab[i].value;
            break;
        }
    }
    tab = document.getElementsByName('replayQuestion');
    for (i=0;i<tab.length;i++)
    {
        if(tab[i].checked)
        {
            game.replayQuestion = tab[i].value;
            break;
        }
    }
    arrayGame[arrayGame.length] = game;
    val = JSON.stringify(arrayGame);
    window.localStorage.setItem("arrayGame", val);
    location.href=("index.html");   /*à changer avec la désactivation des elements de la page et/ou le rideau noir*/
};
