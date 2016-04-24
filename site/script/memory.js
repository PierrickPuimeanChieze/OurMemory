

var     cReturn;        //Variable pour connaitre le nombre de carte retourné
var     pairFind;       //Variable indiquand le nombre de paire trouvé
var     cardReturned;   //Variable memorisant la carte precedente retourné
var     game;         //variable contenant toute les information du joueur
var     nbtest;         //nombre de coup joué.
var     gameStarted;    //indique si la partie est commencé ou pas.
var     intervalId = null;
//var     remainingTime;  //temps restant
var     imageNumber;    //Le nombre d'images disponibles dans le repertoire image. Chaque image doit être nommée "Image-<indexNbr>.png
var     counter;
var     timegame;
var     arrayGame;
var     cards;

// Cette méthode est destiné à être appellée quand la page à fini de se charger
// Typiquement, c'est dans cette méthode que plus tard, on répartira les cartes de manière aléatoire.
function init()
{
    cReturn         = 0;
    pairFind        = 0;
    nbtest          = 0;
    cardReturned    = null;
    gameStarted     = 0;
    cards           = document.getElementsByClassName("card");
    imageNumber     = 14;
    timegame        = 0;
    //var     id;
    //On récupère tous les éléments de type card
    //r     cards = document.getElementsByClassName("card");
    //Et pour chacun d'entre eux
    var     i;

    /*arrayGame = load_data("arrayGame");
    game = arrayGame[arrayGame.length - 1];*/
    game = load_data("newGame");
    //remainingTime   = game.gameLimit;
    initCSS();
    randomPlacementCards(cards, game);

    for (i = 0; i < cards.length; i++)
    {
        //On fait en sorte que la méthode clickCard soit appellée quand on l'utilisateur clique dessus
        cards[i].onclick = clickCard;
    }

    //P.S. : on aurait pu effectuer cette association dans le code html directement, via l'attribut onclick
    //Exemple : <img class="card back-visible" src="images/sad/Image-1.png" onclick="clickCard(event);"/>
    //C'est toutefois à éviter quand tu fais une application complexe.
    // En effet, cela mélange la présentation (le code HTML) et la logique (le code javascript)
    // Ce qui pose pas mal de probleme pour maintenir ton application
    //Par exemple, dans notre cas, c'est beaucoup plus facile de renommer la méthode clickCard()

    //start.onclick = starGame;
    document.getElementById('prenom').innerHTML = game.firstname;
    starGame();
}

//Cette méthode doit être appelée quand l'utilisateur clique sur une carte
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
            if (timegame <= game.gameLimit)
                game.pairsfoundBeforGameLimit = pairFind;
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
        nbtest++;
        if (timegame <= game.gameLimit)
            game.triesBeforeGameLimit = nbtest;
        cardReturned = null;
        cReturn = 0;
    }
    if (imageNumber === pairFind)
        endGame();
}

/*
**fonction retournant les carte face cachée.
 */
function    returnCard(cardReturned, cardElement)
{
    cardReturned.className = "card back-visible";
    cardElement.className = "card back-visible";
    gameStarted = 1;
}

/*
**fonction appeller lorsque l'on veut commencer une parti
 */
function starGame()
{
    var     i;

    for (i = 0; i < cards.length; i++)
        cards[i].className = "card front-visible";
    document.getElementById("timer").innerHTML = "La partie commence dans " + game.preGameVisibilityDuration + " secondes.";
    counter = game.preGameVisibilityDuration;
    intervalId = setInterval(bip, 1000);
    setTimeout(endTimer, game.preGameVisibilityDuration * 1000);
}

/*
**fonction faisant le decompte avant le debut de la partie
 */
function bip()
{
    counter--;
    document.getElementById("timer").innerHTML = "La partie commence dans " + counter + " secondes.";
}

/*
**fonction appellé au debut de la partie
 */

function endTimer()
{
    var     i;

    for (i = 0; i < cards.length; i++)
        cards[i].className = "card back-visible";
    clearInterval(intervalId);
    gameStarted = 1;
    document.getElementById("timer").innerHTML = "La partie est en cours.";
    intervalId = setInterval(function() {timegame++;}, 1000);
    //setTimeout(endGame, time * 1000);
}

/*
**fonction appelé à la fin de la partie. Met à jour les scores et envoie à la page suivantes.
 */
function endGame()
{
    //alert("Fin de la partie");
    clearInterval(intervalId);
    game.totalTries = nbtest;
    game.totalDuration = timegame;
    /*arrayGame[arrayGame.length - 1] = game;
    val = JSON.stringify(arrayGame);
    window.localStorage.setItem("arrayGame", val);*/
    val = JSON.stringify(game);
    window.localStorage.setItem("newGame", val);
    location.href=("resultat.html");
}

/*
 *Fonction pour placer les cartes de manière aléatoires
 * Nouvelle version : Elle prend les element de carte deux par deux,leur assigne une image, puis passe à la paire
 * d'élément suivantes
 * Ceci afin de pouvoir avoir un nombre d'element carte indépendant du nombre d'image.
 */

/*
**fonction random qui renvoie un valeur compris entre min inclue et max inclue
 */
/*function getRandomIntInclusive(min, max)
{
    return Math.floor(Math.random() * (max - min +1)) + min;
}*/

/*
**change choisi un CSS suivant la version choisi.
 */
function initCSS()
{
    document.getElementById("version").href = "CSS/memory" + game.version + ".css"
}

/*function height(bloc){
    var hauteur;

    if( typeof( window.innerWidth ) == 'number' )
        hauteur = window.innerHeight;
    else if( document.documentElement && document.documentElement.clientHeight )
        hauteur = document.documentElement.clientHeight;

    document.getElementById(bloc).style.height = hauteur+"px";
}

window.onload = height("page");
window.onresize = height("page");*/

//window.onload = function(){ height("page") };
//window.onresize = function(){ height("page") };