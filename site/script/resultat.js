/**
 * Created by Shimishsar on 22/04/2016.
 **/


var game;
var config;
var arrayGame = new Array;
var tab;
var i;
var val;

/*game = arrayGame[arrayGame.length - 1];
config = JSON.parse(window.localStorage.getItem("config"));*/
function init() {
    if(load_data("arrayGame") !== null)
        arrayGame = load_data("arrayGame");
    game = load_data("newGame");
    document.getElementById('prenom').innerHTML = game.firstname;
    document.getElementById('sends').onclick = function () {
        tab = document.getElementsByName('likeQuestion');
        for (i = 0; i < tab.length; i++) {
            if (tab[i].checked) {
                game.likeQuestion = tab[i].value;
                break;
            }
            if (i === (tab.length - 1))
            {
                alert("Veuillez r\u00E9pondre aux questions.");
                return ;
            }
        }
        tab = document.getElementsByName('funQuestion');
        for (i = 0; i < tab.length; i++) {
            if (tab[i].checked) {
                game.funQuestion = tab[i].value;
                break;
            }
            if (i === (tab.length - 1))
            {
                alert("Veuillez r\u00E9pondre aux questions.");
                return ;
            }
        }
        tab = document.getElementsByName('replayQuestion');
        for (i = 0; i < tab.length; i++) {
            if (tab[i].checked) {
                game.replayQuestion = tab[i].value;
                break;
            }
            if (i === (tab.length - 1))
            {
                alert("Veuillez r\u00E9pondre aux questions.");
                return ;
            }
        }
        arrayGame[arrayGame.length] = game;
        val = JSON.stringify(arrayGame);
        window.localStorage.setItem("arrayGame", val);
        window.localStorage.removeItem("newGame");
        document.getElementById('body').style.display="none";
        document.getElementById('body').style.background="black";
        //location.href = ("index.html");
        /*à changer avec la désactivation des elements de la page et/ou le rideau noir*/
    };
    //document.getElementById('body').style.display="none";
    //document.getElementById('body').style.display="block";
}
