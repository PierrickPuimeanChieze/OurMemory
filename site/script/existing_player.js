/**
 * Created by Shimishsar on 22/04/2016.
 **/

var arrayGame;


function init()
{
    var compte;
    var i;
    var newRow;
    var newCell;
    var button;

    arrayGame = load_data("arrayGame");
    /*
     **  rajoute une ligne au tableau par compte avec toute les info du compte.
     */
    for (i = 0; i < arrayGame.length; i++)
    {
        compte = arrayGame[i];
        newRow = document.getElementById('tablePlayers').insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.innerHTML = compte.firstname;
        newCell = newRow.insertCell(1);
        newCell.innerHTML = compte.name;
        newCell = newRow.insertCell(2);
        newCell.innerHTML = compte.birthdate;
        newCell = newRow.insertCell(3);
        newCell.innerHTML = compte.age;
        newCell = newRow.insertCell(4);
        newCell.innerHTML = compte.classe;
        newCell = newRow.insertCell(5);
        newCell.innerHTML = compte.sex;
        newCell = newRow.insertCell(6);
        newCell.innerHTML = compte.version;
        newCell = newRow.insertCell(7);
        newCell.innerHTML = compte.date;
        newCell = newRow.insertCell(8);
        //newCell.innerHTML = '<a href="NewPlayer.html?id=' + i + '">button</a>';     /*surement mieux à faire, trouver un motyen de detecter de quelle page on vient sur New player*/
        newCell.innerHTML = '<input type="submit" id="' + i + '" name="creategame" value="Button"/>';
    }
    button = document.getElementsByName("creategame");
    for (i = 0; i < button.length; i++)
    {
        //button[i].onclick = creategame;
        button[i].onclick = secondGame;
    }
}

function secondGame(mouseEvent)
{
    var     secondGame;
    var     select;
    var     index;

    select = mouseEvent.target;
    index = select.id;
    secondGame = arrayGame[index];
    window.localStorage.setItem("secondGame", JSON.stringify(secondGame));
    location.href=("NewPlayer.html");
}

/*function creategame(mouseEvent)
{
    var     index;
    var     newindex;
    var     select;
    var     config;
    var     now;
    var     val;

    now = new Date();
    config = load_data("config");
    select = mouseEvent.target;
    index = select.id;
    newindex = arrayGame.length;
    arrayGame[arrayGame.length] = newGame();
    arrayGame[newindex].firstname = arrayGame[index].firstname;
    arrayGame[newindex].name = arrayGame[index].name;
    arrayGame[newindex].birthdate = arrayGame[index].birthdate;
    arrayGame[newindex].age = arrayGame[index].age;
    arrayGame[newindex].classe = arrayGame[index].classe;
    arrayGame[newindex].sex = arrayGame[index].sex;
    arrayGame[newindex].preGameVisibilityDuration = config.counter;
    arrayGame[newindex].gameLimit = config.time;
    arrayGame[newindex].date = now.getFullYear() + "-" + ('0'+(now.getMonth()+1)).slice(-2) + "-" + ('0'+now.getDate()).slice(-2);
    if (arrayGame[index].version === "humors")
        arrayGame[newindex].version = "sad";
    else
        arrayGame[newindex].version = "humors";
    val = JSON.stringify(arrayGame);
    window.localStorage.setItem("arrayGame", val);
    location.href=("Rules.html");
}*/

/*document.getElementsByName('creategame').onclick = function() {                     //à verifier pas sur que cela marche
 arrayGame[arrayGame.length] = newGame();
 arrayGame[arrayGame.length].firstname = arrayGame[].firstname;
 arrayGame[arrayGame.length].name = arrayGame[arrayGame.length - 1].name;
 arrayGame[arrayGame.length].birthdate = arrayGame[arrayGame.length - 1].birthdate;
 arrayGame[arrayGame.length]. = arrayGame[arrayGame.length - 1].;
 arrayGame[arrayGame.length]. = arrayGame[arrayGame.length - 1].;
 arrayGame[arrayGame.length]. = arrayGame[arrayGame.length - 1].;
 arrayGame[arrayGame.length]. = arrayGame[arrayGame.length - 1].;
 arrayGame[arrayGame.length]. = arrayGame[arrayGame.length - 1].;
 }*/
