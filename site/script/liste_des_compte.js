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
            newCell.innerHTML = compte.sex;
            newCell = newRow.insertCell(6);
            newCell.innerHTML = compte.version;
            newCell = newRow.insertCell(7);
            newCell.innerHTML = compte.date;
            newCell = newRow.insertCell(8);
            if (compte.id === "")
                newCell.innerHTML = 'Unsent';
            else
                newCell.innerHTML = 'Sent';
            newCell = newRow.insertCell(9);
            newCell.innerHTML = '<input type="checkbox" name="sent" id="' + i + '" />';
        }
    }
}
