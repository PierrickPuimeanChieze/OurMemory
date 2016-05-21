/**
 * Created by Shimishsar on 22/04/2016.
 **/

var arrayGame;


function init()
{

    document.getElementById('return').onclick = function() {
        location.href = ("index.html");
    };
    var compte;
    var i;
    var newRow;
    var newCell;
    /*
     **  rajoute une ligne au tableau par compte avec toute les info du compte.
     */
    arrayGame = load_data("arrayGame");
    if(arrayGame !== null){
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
            if (compte.sex === "boy")
                newCell.innerHTML = "gar&ccedil;on";
            if (compte.sex === "girl")
                newCell.innerHTML = "fille";
            newCell = newRow.insertCell(6);
            if ( compte.version === "humors")
                newCell.innerHTML = "marrante";
            if ( compte.version === "sad")
                newCell.innerHTML = "classique";
            newCell = newRow.insertCell(7);
            newCell.innerHTML = compte.date;
            newCell = newRow.insertCell(8);
            newCell.innerHTML = compte.preGameVisibilityDuration;
            newCell = newRow.insertCell(9);
            newCell.innerHTML = compte.gameLimit;
            newCell = newRow.insertCell(10);
            newCell.innerHTML = compte.triesBeforeGameLimit;
            newCell = newRow.insertCell(11);
            newCell.innerHTML = compte.pairsfoundBeforGameLimit;
            newCell = newRow.insertCell(12);
            newCell.innerHTML = compte.totalTries;
            newCell = newRow.insertCell(13);
            newCell.innerHTML = compte.totalDuration;
            newCell = newRow.insertCell(14);
            newCell.innerHTML = compte.seed;
            newCell = newRow.insertCell(15);
            newCell.innerHTML = compte.likeQuestion;
            newCell = newRow.insertCell(16);
            newCell.innerHTML = compte.funQuestion;
            newCell = newRow.insertCell(17);
            newCell.innerHTML = compte.replayQuestion;
            newCell = newRow.insertCell(18);
            if (compte.id === "")
                newCell.innerHTML = 'En attente';
            else
                newCell.innerHTML = 'Envoyé';
        }
    }
}

