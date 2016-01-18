

var     cReturn;        //Variable pour connaitre le nombre de carte retourné
var     nbCard;         //Variable indiquand le nombre de carte du jeu
var     pairFind;       //Variable indiquand le nombre de paire trouvé
var     cardReturned;   //Variable memorisant la carte precedente retourné
var     compte;
var     nbtest;         //nombre de coup joué.
var     gameStarted
var     cards = document.getElementsByClassName("card");    //
var     counter = 5;    //devra être contenue dans le compte admin au final
var     time = 5;      //devra être contenue dans le compte admin au final
var     intervalId = null;
var     remainingTime = time;


cReturn         = 0;
nbCard          = 6;
pairFind        = 0;
nbtest          = 0;
cardReturned    = null;
gameStarted     = 0;
// Cette méthode est destiné à être appellée quand la page à fini de se charger
// Typiquement, c'est dans cette méthode que plus tard, on répartira les cartes de manière aléatoire.
function init() 
{
    var     id;
    //On récupère tous les éléments de type card
    //r     cards = document.getElementsByClassName("card");
    //Et pour chacun d'entre eux
    var     i;
    var     start = document.getElementById("start");


    for (i = 0; i < cards.length; i++)
    {
        //On fait en sorte que la méthode clickCard soit appellée quand on l'utilisateur clique dessus
        cards[i].onclick = clickCard
    }
    //P.S. : on aurait pu effectuer cette association dans le code html directement, via l'attribut onclick
    //Exemple : <img class="card back-visible" src="images/sad/Image-1.png" onclick="clickCard(event);"/>
    //C'est toutefois à éviter quand tu fais une application complexe.
    // En effet, cela mélange la présentation (le code HTML) et la logique (le code javascript)
    // Ce qui pose pas mal de probleme pour maintenir ton application
    //Par exemple, dans notre cas, c'est beaucoup plus facile de renommer la méthode clickCard()

    start.onclick = starGame
    id = location.search.substring(temp.indexOf("id=")+1)
    compte = JSON.parse(window.localStorage.getItem(id));
    document.getElementById('prenom').innerHTML = compte.prenom;
}

//Cette méthode doit être appelée quand l'utilisateur clique sur une carte
function clickCard(mouseEvent)
{
    var     val;
    //On récupère l'élement sur lequel l'utilisateur a cliqué
    cardElement = mouseEvent.target;

    //Si les classes de cet element indique qu'elle était face cachée
    if (cardElement.className === "card back-visible" & gameStarted === 1)
    {
        //On la passe face visible
        cardElement.className = "card front-visible";
        cReturn++;
        if (cardReturned === null)
            cardReturned = cardElement;
    }
        //plus de sinon car les cartes se remettent face cachée automatiquement.
    if (cReturn === 2)
    {
        if (cardReturned.src === cardElement.src)
        {
            cardReturned.className = "pair-find";
            cardElement.className = "pair-find";
            pairFind++;
            //alert("paire trouvé " + remainingTime + "s.");
        }
        else
        {
            //alert("raté" + remainingTime + "s.");
            cardReturned.className = "card back-visible"
            cardElement.className = "card back-visible"
        }
        nbtest++;
        cardReturned = null;
        cReturn = 0;
    }
    if (nbCard/2 === pairFind)
        endGame();
}

function starGame(mouseEvent)                                       
{
    //var   cards = document.getElementsByClassName("card");
    var     i;

    for (i = 0; i < cards.length; i++)
        cards[i].className = "card front-visible";
    document.getElementById("start").style.display = 'none';
    document.getElementById("timer").innerHTML = "La partie commence dans " + counter + " secondes.";
    intervalId = setInterval(bip, 1000);
    setTimeout(endTimer, counter * 1000);
    //gameStarted = 1;

    //for (i = 0; i < cards.length; i++)
    //    cards[i].className = "card back-visible";
}

function bip()
{
    counter--;
    document.getElementById("timer").innerHTML = "La partie commence dans " + counter + " secondes.";
}

function endTimer()
{
    //var     cards = document.getElementsByClassName("card");
    var     i;

    for (i = 0; i < cards.length; i++)
        cards[i].className = "card back-visible";
    clearInterval(intervalId);
    gameStarted = 1;
    document.getElementById("timer").innerHTML = "La partie est en cours.";
    intervalId = setInterval(function() {remainingTime--;}, 1000);
    setTimeout(endGame, time * 1000);
}

function endGame()
{
    clearInterval(intervalId);
    compte.paireClassique = pairFind;
    compte.echecClassique = nbtest - pairFind;
    compte.tempsClassique = time - remainingTime;
    val = JSON.stringify(compte);
    window.localStorage.setItem(String(compte.id), val);
    alert("Félicitation, vous avez reussi");
    location.href=("resultat.html?id=" + compte.id)
}
