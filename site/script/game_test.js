/**
 * Created by Shimishsar on 24/04/2016.
 **/
var     cards;
var     imageNumber;
var     intervalId = null;
var     counter;
var     gameStarted;    //indique si la partie est commencé ou pas.
//var     timegame;
var     cReturn;
var     pairFind;
var     cardReturned;   //Variable memorisant la carte precedente retourné
var     game;         //variable contenant toute les information du joueur

function init(){
    var     i;

    cards = document.getElementsByClassName("card");
    imageNumber     = 2;
    gameStarted     = 0;
    cReturn         = 0;
    pairFind        = 0;
    cardReturned    = null;
    game = load_data("newGame");

    randomPlacementCards(cards, game);
    for (i = 0; i < cards.length; i++)
    {
        //On fait en sorte que la méthode clickCard soit appellée quand on l'utilisateur clique dessus
        cards[i].onclick = clickCard;
    }
    starGame();

    document.getElementById('rules').onclick = function() {
        location.href=("Rules.html");
    };
    document.getElementById('memory').onclick = function() {
        location.href=("memory.html");
    };
}

function starGame()
{
    var     i;

    for (i = 0; i < cards.length; i++)
        cards[i].className = "card front-visible";
    //document.getElementById("timer").innerHTML = "La partie commence dans 10 secondes.";
    counter = 10;
    intervalId = setInterval(bip, 1000);
    setTimeout(endTimer, 10 * 1000);
}

function bip()
{
    counter--;
    document.getElementById("timer").innerHTML = "La partie commence dans " + counter + " secondes.";
}

function endTimer()
{
    var     i;

    for (i = 0; i < cards.length; i++)
        cards[i].className = "card back-visible";
    clearInterval(intervalId);
    gameStarted = 1;
    //intervalId = setInterval(function() {timegame++;}, 1000);
    //setTimeout(endGame, time * 1000);
}

function clickCard(mouseEvent)
{
    //var     val;
    //On récupère l'élement sur lequel l'utilisateur a cliqué
    var     cardElement = mouseEvent.target;

    //Si les classes de cet element indique qu'elle était face cachée
    if (cardElement.className === "card back-visible" && gameStarted === 1)
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
            /*if (timegame <= game.gameLimit)
                game.pairsfoundBeforGameLimit = pairFind;*/
            //alert("paire trouvé " + remainingTime + "s.");
        }
        else
        {
            //alert("raté" + remainingTime + "s.");
            gameStarted = 0;                                            // je met la valeur à zero pour que le joueur
                                                                        // ne puisse modifier les cartes pendant le
                                                                        // moment ou on laisse la pair afficher
            setTimeout(returnCard, 2000, cardReturned, cardElement);    // laisse les carte retourné, à voir si on
                                                                        // laisse la durée en dure on si on peut la
                                                                        // la modifier avec une variable.
            //cardReturned.className = "card back-visible";
            //cardElement.className = "card back-visible";
            //alert("raté" + remainingTime + "s.");
        }
        cardReturned = null;
        cReturn = 0;
    }
    if (imageNumber === pairFind)
        endGame();
}

function    returnCard(cardReturned, cardElement)
{
    cardReturned.className = "card back-visible";
    cardElement.className = "card back-visible";
    gameStarted = 1;
}

function endGame()
{
    clearInterval(intervalId);
    alert("Bravo, tu a réussi");
    location.href=("memory.html");
}