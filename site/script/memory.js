

var     cReturn;        //Variable pour connaitre le nombre de carte retourné
var     nbpair;         //Variable indiquand le nombre de paires de carte du jeu.Devrat peut être contenue
                        // dans les parametre.
var     pairFind;       //Variable indiquand le nombre de paire trouvé
var     cardReturned;   //Variable memorisant la carte precedente retourné
var     compte;         //variable contenant toute les information du joueur
var     nbtest;         //nombre de coup joué.
var     gameStarted;    //indique si la partie est commencé ou pas.
var     cards;          //contient les balise des cartes.
var     counter;        //durée pendant laquelle les carte sont face visible avant le debut de la partie, en secondes.
                        //Devra être contenue dans le compte admin au final
var     time;           //Durée de la partie en secondes. Devra être contenue dans le compte admin au final
var     intervalId = null;
var     remainingTime;  //temps restant
var     see;            //graine pour le placement alétoire, devra être dans la variable admin.
var     config;


cReturn         = 0;
nbpair          = 6;
pairFind        = 0;
nbtest          = 0;
cardReturned    = null;
gameStarted     = 0;
cards           = document.getElementsByClassName("card");
counter         = 2;
time            = 30;
remainingTime   = time;
see             = "test1";
// Cette méthode est destiné à être appellée quand la page à fini de se charger
// Typiquement, c'est dans cette méthode que plus tard, on répartira les cartes de manière aléatoire.
function init() 
{
    var     id;
    //On récupère tous les éléments de type card
    //r     cards = document.getElementsByClassName("card");
    //Et pour chacun d'entre eux
    var     i;
    var     start;
    var     url;

    start = document.getElementById("start");
    url = location.search;

    id = url.substring(url.indexOf("=")+1);
    compte = JSON.parse(window.localStorage.getItem(id));
    config = JSON.parse(window.localStorage.getItem("0"));
    randomPlacementCards();

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

    start.onclick = starGame;
    document.getElementById('prenom').innerHTML = compte.prenom;
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
        cardReturned = null;
        cReturn = 0;
    }
    if (nbpair === pairFind)
        endGame();
}

function    returnCard(cardReturned, cardElement)
{
    cardReturned.className = "card back-visible";
    cardElement.className = "card back-visible";
    gameStarted = 1;
}

function starGame()
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
    alert("Fin de la partie");
    clearInterval(intervalId);
    compte.paireClassique = pairFind;
    compte.echecClassique = nbtest - pairFind;
    compte.tempsClassique = time - remainingTime;
    val = JSON.stringify(compte);
    window.localStorage.setItem(String(compte.id), val);
    location.href=("resultat.html?id=" + compte.id)
}

/*
*Fonction pour placer les cartes de manière aléatoires
 */
function randomPlacementCards()
{
    var placedCard;                 //compteur indiquant le nombre de carte placé.
    var img;                        //sert à stocké le numero de l'image tiré
    var placedImg;                   //variable gardant en mémoire les image déjà utiliser.

    placedImg = {};

    for (img=1; img <= nbpair; img++)
    {
        placedImg[img] = 0;
    }

    Math.seedrandom(see);

    for (placedCard = 0; placedCard < nbpair * 2;)
    {
        img = getRandomIntInclusive(1, nbpair);
        if (placedImg[img] < 2)
        {
            cards[placedCard].src = "images/" + config.version + "/Image-" + img + ".png";
            placedImg[img]++;
            placedCard++;
        }
    }
}

function getRandomIntInclusive(min, max)
{
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function initCSS()
{
    document.getElementById("version").href = "CSS/memory" + config.version + ".css"
}