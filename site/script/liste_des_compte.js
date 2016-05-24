/**
 * Created by Shimishsar on 22/04/2016.
 **/

var host = 'http://192.168.99.100:9090/games';
//This array will hold all the status cells. Useful for dynamically updating status when sending information
var statusCells = [];
var checkCells = [];
function init() {

    document.getElementById('return').onclick = function () {
        location.href = ("index.html");
    };
    var compte;
    var i;
    var newRow;
    var newCell;
    var arrayGame;
    /*
     **  rajoute une ligne au tableau par compte avec toute les info du compte.
     */
    arrayGame = load_data("arrayGame");
    if (arrayGame !== null) {
        for (i = 0; i < arrayGame.length; i++) {
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
            if (compte.sex === "boy")
                newCell.innerHTML = "gar&ccedil;on";
            if (compte.sex === "girl")
                newCell.innerHTML = "fille";
            newCell = newRow.insertCell(6);
            if (compte.version === "humors")
                newCell.innerHTML = "marrante";
            if (compte.version === "sad")
                newCell.innerHTML = "classique";
            newCell = newRow.insertCell(7);
            newCell.innerHTML = compte.date;
            var statusCell = newRow.insertCell(8);
            statusCells[i] = statusCell;
            if (compte.id === "")
                statusCell.innerHTML = 'En attente';
            else
                statusCell.innerHTML = 'Envoyé. Id:' + compte.id;
            var checkCell = newRow.insertCell(9);
            if (compte.id === "")
                checkCell.innerHTML = '<input type="checkbox" name="sent" id="' + i + '" value="' + i + '"/>';
            checkCells[i] = checkCell;
        }
    }
}

function sendGame(gameToSent) {
    var gameJson = JSON.stringify(gameToSent);
    var req = new window.XMLHttpRequest();

    req.open('POST', host, false);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(gameJson);
    var returnedGame = JSON.parse(req.response);
    return returnedGame.id;
}
function sentSelectedGames() {
    if (!window.XMLHttpRequest) {
        alert("Unable to sent. XMLHttpRequest not available for this browser");
        return;
    }
    var arrayGames = load_data("arrayGame");
    //We retrieve the selected checkboxes
    var checkedBoxes = document.querySelectorAll('input[name=sent]:checked');
    for (var i = 0; i < checkedBoxes.length; i++) {
        // We verify that the selector was correct (just for us)
        if (checkedBoxes[i].checked) {
            //We retrieve the corresponding game
            var gameIndex = checkedBoxes[i].value;
            var gameToSent = arrayGames[gameIndex];
            if (gameToSent.id !== "") {
                alert("game " + gameToSent.id + " cannot be sent. Already Sent");
                return;
            }
            var newId = sendGame(gameToSent);
            gameToSent.id = newId;
            arrayGames[gameIndex] = gameToSent;
            statusCells[gameIndex].innerHTML = 'Envoyé. Id:' + newId;
            checkCells[gameIndex].innerHTML = '';
        }
    }
    save_data_as_json("arrayGame", arrayGames);
    
}
