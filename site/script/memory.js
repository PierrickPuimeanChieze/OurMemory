

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
var     imageNumber;    //Le nombre d'images disponibles dans le repertoire image. Chaque image doit être nommée "Image-<indexNbr>.png

cReturn         = 0;
nbpair          = 24;
pairFind        = 0;
nbtest          = 0;
cardReturned    = null;
gameStarted     = 0;
cards           = document.getElementsByClassName("card");
counter         = 2;
time            = 30;
remainingTime   = time;
see             = "test1";
imageNumber     = 6;

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
    initCSS();
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
 * Nouvelle version : Elle prend les element de carte deux par deux,leur assigne une image, puis passe à la paire
 * d'élément suivantes
 * Ceci afin de pouvoir avoir un nombre d'element carte indépendant du nombre d'image.
 */
function randomPlacementCards()
{
    //Ici on créé un tableau modifiable d'element a modifier, ceci afin de pouvoir retirer un element carte quand il a été associé a une image
    var remainingCardElements =Array.prototype.slice.call( cards );
    var imageIndex = 1;

    //Si le nombre de cartes à placer est impair
    if (remainingCardElements.length % 2 >0) {
        //On affiche une erreur
        window.alert("WARNING ! Nombre de cartes impaire sur le tableau");
        //et on arrète la methode
        return;
    }
    Math.seedrandom(see);

    //Pour chacun des element carte restant encore a remplir
    while (remainingCardElements.length>0) {
        //Par deux fois
        for (var i =0; i<2 ;i++) {
            //On en récupère un au hasard
            var elementIndex = Math.floor(Math.random()*remainingCardElements.length);
            //On change sa source pour l'image actuellement pointée par imageIndex
            remainingCardElements[elementIndex].src = "images/" + config.version + "/Image-" + imageIndex + ".png";
            //Et one le retire de la liste
            remainingCardElements.splice(elementIndex, 1);
        }
        //Puis on incrémente l'index de l'image (on ou boucle si il a atteint la limite
        if (imageIndex == imageNumber) {
            imageIndex = 1;
        } else {
            imageIndex++;
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