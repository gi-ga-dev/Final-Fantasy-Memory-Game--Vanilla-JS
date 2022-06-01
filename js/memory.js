let arrayAnimaliEasy = ['🐵', '🐶', '🐴', '🐺', '🐷', '🐮', '🐵', '🐶', '🐴', '🐺', '🐷', '🐮'];
let arrayAnimaliNormal = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
let arrayAnimaliHard = ['🦖', '🐳', '🐢', '🐙', '🐞', '🐻', '🦈', '🦂', '🐲', '🦅', '🦃', '🦒', '🐌', '🐜', '🐟', '🐧', '🦕', '🐊', '🦖', '🐳', '🐢', '🐙', '🐞', '🐻', '🦈', '🦂', '🐲', '🦅', '🦃', '🦒', '🐌', '🐜', '🐟', '🐧', '🐊', '🦕'];
let arrayComparison = [];

let interval;
let sec = 0; 
let min = 2;
let clickCount = 0;

let snd_select = new Audio('snd/snd_select.mp3');
let snd_correct = new Audio('snd/snd_correct.mp3');
let snd_startgame = new Audio('snd/snd_startgame.mp3');
let snd_victory = new Audio('snd/snd_victory.mp3');
let snd_gameover = new Audio('snd/snd_gameover.mp3');

const grid = document.getElementById('griglia');
const start = document.querySelector('.text-center .start');
const timer = document.querySelector('.text-center .timer');
const moves = document.querySelector('.text-center .moves');
const found = document.getElementsByClassName('icon show find disabled');

document.body.onload = gamePreview(); // al caricamento della pagina chiama la funzione e genera il contenuto

//#region ---------- Buttons onclick functions ----------------

function startEasy() {   // Easy Difficulty Button
    snd_startgame.play();
    timerStop(); 
    clearTimer();
    gameInitEasy();  
    printTimer();
    timerStart();
}

function restartEasy() {
    snd_victory.pause();
    snd_gameover.pause();
    snd_startgame.play();
    stop();
    timerStop();  
    clearTimer(); 
    gameInitEasy();
    timerStart(); 
}

function startNormal() { // Normal Difficulty Button
    snd_startgame.play();
    timerStop();      // stop all'intervallo precedente
    clearTimer();     // pulizia del div
    gameInitNormal(); // caricamento contenuto del gioco
    printTimer();     // stampa il timer
    timerStart();     // caricamento nuovo intervallo
}

function restartNormal() {
    snd_victory.pause();
    snd_gameover.pause();
    snd_startgame.play();
    stop();
    timerStop();      // stop all'intervallo precedente
    clearTimer();     // pulizia del div
    gameInitNormal(); // caricamento contenuto del gioco
    timerStart();     // caricamento nuovo intervallo
}

function startHard() {  // Hard Difficulty Button
    snd_startgame.play();
    timerStop();     
    clearTimer();     
    gameInitHard(); 
    printTimer();
    timerStart();    
}

function restartHard() {
    snd_victory.pause();
    snd_gameover.pause();
    snd_startgame.play();
    stop();
    timerStop();     
    clearTimer();   
    gameInitHard();
    timerStart();   
}

//#endregion

//#region ------ Game Initialization & Buttons Creation ----------

function gamePreview() { // Schermata Preview del gioco senza input
//@desc creo i buttons nella preview e li modifico in-game cosi' da non creare buttons ogni volta che clicco
    
    timer.innerHTML = 'Memory Game: 2 minutes to win!';

    /* ---- Creazione button easy ----- */
    
    let btnEasy = document.createElement('input');
    btnEasy.type = 'button';
    btnEasy.id = 'btnEasy';
    btnEasy.value = 'Easy';                       
    btnEasy.onclick = function() {startEasy();}   
    start.appendChild(btnEasy);                    

    /* ---- Creazione button normal ----- */

    let btnNormal = document.createElement('input'); // Creazione elemento
    btnNormal.type = 'button';
    btnNormal.id = 'btnNormal';
    btnNormal.value = 'Normal';                      // Testo da inserire
    btnNormal.onclick = function() {startNormal();}  // Assegnare funzione ad evento onclick
    start.appendChild(btnNormal);                    // Scriverlo nel nodo   
    
    /* ---- Creazione button hard ----- */

    let btnHard = document.createElement('input');
    btnHard.type = 'button';
    btnHard.id = 'btnHard';
    btnHard.value = 'Hard';                       
    btnHard.onclick = function() {startHard();}   
    start.appendChild(btnHard);  
    
    grid.style.pointerEvents = 'none';                 // i div non si possono cliccare
    grid.innerHTML = '';                               // pulisce eventuale contenuto  
    moves.style.display = 'none';                      // nasconde il div delle mosse
    for(i=0; i<24; i++) {                              // div placeholders
        let divCont = document.createElement('div');          
        let divIcon = document.createElement('div');          
        divIcon.className = 'icon';                           
        grid.appendChild(divCont).appendChild(divIcon);                    
    }    
}

function gameInitEasy() {

    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    // Per selezionare e modificare un button esistente
    restartBtnEasy.value = 'Restart';               
    restartBtnNormal.style.display = 'none'; 
    restartBtnHard.style.display = 'none';    
    restartBtnEasy.onclick = function() {restartEasy();}

    /* ---- Creazione button Menu' principale ----- */

    let btnMenu = document.createElement('input');
    btnMenu.type = 'button';
    btnMenu.id = 'btnMenu';
    btnMenu.value = 'Main Menu';                       
    btnMenu.onclick = function() {
        stop(); 
        window.location.reload();
    }   
    start.appendChild(btnMenu);

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimaliEasy);                      
    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial'; // i div tornano cliccabili
    moves.style.display = 'block';        // il div delle mosse torna visibile           

    for(i=0; i<12; i++) { // creazione 12 div
        let divCont = document.createElement('div');    
        let divIcon = document.createElement('div');     
        divIcon.className = 'icon';                      
        grid.appendChild(divCont).appendChild(divIcon);  
        divIcon.innerHTML = arrayShuffle[i];             
    }

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (i=0; i<icons.length; i++) {                       
        icons[i].addEventListener('click', displayIcon);   
        icons[i].addEventListener('click', easyResult); 
        icons[i].addEventListener('click', printMoves);  // icons[i] ritorna la lista dei div
    }  
}

function gameInitNormal() {

    // Per selezionare e modificare un button esistente
    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    restartBtnNormal.value = 'Restart';                  // Modifico il button normal
    restartBtnEasy.style.display = 'none';               // Nascondo il button easy
    restartBtnHard.style.display = 'none';               // Nascondo il button hard
    restartBtnNormal.onclick = function() {restartNormal();}

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimaliNormal);      // gli passo la funzione shuffle con all'interno le icone                
    grid.innerHTML = '';                                 // pulisco tutto il contenuto
    grid.style.pointerEvents = 'initial';                // i div tornano cliccabili
    moves.style.display = 'block';                       // il div delle mosse torna visibile 

    for(i=0; i<24; i++) {                                // creazione 24 div
        let divCont = document.createElement('div');     // div contenitore
        let divIcon = document.createElement('div');     // div con icona dentro
        divIcon.className = 'icon';                      // assegno classe icon
        grid.appendChild(divCont).appendChild(divIcon);  // assegno il div alla destinazione e assegno le icone
        divIcon.innerHTML = arrayShuffle[i];             // assegno shuffle(icone) nel div delle icone
    }

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (i=0; i<icons.length; i++) {                      // itera array passato nella var icons
        icons[i].addEventListener('click', displayIcon);  // e cicla varie funzioni contemporaneamente
        icons[i].addEventListener('click', normalResult); // visualizza risultato solo con 24 risp esatte
        icons[i].addEventListener('click', printMoves);   // ritorna numero mosse e stampa ad ogni click sui div
    }                                    
}

function gameInitHard() {

    // Per selezionare e modificare un button esistente
    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    restartBtnHard.value = 'Restart';
    restartBtnEasy.style.display = 'none'; 
    restartBtnNormal.style.display = 'none'; 
    restartBtnHard.onclick = function() {restartHard();}

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimaliHard);                      
    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial'; // i div tornano cliccabili
    moves.style.display = 'block';      // il div delle mosse torna visibile                 

    for(i=0; i<36; i++) { // creazione 36 div
        let divCont = document.createElement('div');    
        let divIcon = document.createElement('div');     
        divIcon.className = 'icon';                      
        grid.appendChild(divCont).appendChild(divIcon);  
        divIcon.innerHTML = arrayShuffle[i];             
    }

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (i=0; i<icons.length; i++) {                       
        icons[i].addEventListener('click', displayIcon);   
        icons[i].addEventListener('click', hardResult); 
        icons[i].addEventListener('click', printMoves);
    }                                    
}

//#endregion

//#region ---------- Timer & Print Functions --------------

function timerInit() {   // Countdown della partita

    sec--;          // i secondi decrescono al richiamo della funzione
    if(sec <= -1) { // arriva a 0 e poi a -1 
        min--;      // scendono i minuti
        sec = 59;   // si ricaricano i sec a 59 (non 60)
    }

    printTimer();

    if(min <= -1) {      // -1 = game over
        timerStop();     // ferma intervallo
        printGameOver(); // stampa game over     
        min = 2;         // ripristina valori iniziali
        sec = 0;       
    } 
}

function timerStart() {
    min = 2;  // ripristina valori iniziali
    sec = 0; 
    interval = setInterval(timerInit, 1000);
}

function timerStop() {
    clearInterval(interval);
    /* clickCount = 0; // reset al conteggio mosse */
}

function clearTimer() {  // Cancella il testo nel div
    timer.innerHTML = '';
}

function clearMoves() {
    moves.innerHTML = '';
}

/* ------------------------------------------------------- */

function printTimer() { // tempo rimanente e mosse stampate in-game
    timer.innerHTML = 'Time: ' + +min + ' min ' + +sec + ' sec';
}

function printMoves() { // stampa numero mosse ad ogni click sui div
    clickCount += 0.5;
    moves.innerHTML = 'Number of Moves: ' + parseInt(clickCount); // stampato in-game
    console.log(parseInt(clickCount));
}

function printResult() {
    snd_correct.pause();
    snd_victory.play();
    grid.style.pointerEvents = 'none';

    let minResult = (1 - +min); // valore fisso - valore stampato
    let secResult = (60 - +sec); 
    timer.innerHTML = 'Congratulations you won!<br>Finished in: ' + minResult + ' min ' + secResult + ' sec';
    moves.innerHTML = moves.value; // prende valore numero mosse da printMoves e stampa
}

function printGameOver() {
    snd_gameover.play();
    grid.style.pointerEvents = 'none';
    moves.style.display = 'none';
    timer.innerHTML = 'Game Over. You lose!';
}

//#endregion

//#region ---- Shuffle, Mostra icone & Risultati Partita ----

function shuffle(a) {     // Mischia le icone nell'array
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

function displayIcon() {  // Comparazione icone e mostra carte
    var iconsFind = document.getElementsByClassName('find');
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];         // '...' operatore per passare array come argomento:
    this.classList.toggle("show"); // mette/toglie la classe show
    arrayComparison.push(this);    //aggiunge l'oggetto cliccato all'array del confronto
    var len = arrayComparison.length;
    snd_select.play();
    
    if (len === 2) { // se nel confronto ci sono due elementi.  // qui sotto ho aggiunto una comparazione con se stesso, altrimenti cliccando 2 volte la stessa si bloccava
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML && arrayComparison[0] !== arrayComparison[1]) { // se uguali aggiunge la classe find
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
            snd_select.pause();
            snd_correct.play();

        } else { // altrimenti (ha sbagliato)  
            icons.forEach(function(item) {  
                item.classList.add('disabled'); // aggiunge solo la classe disabled
                snd_select.play();
            });
            
            setTimeout(function() {             // timeout rimuove la classe show per nasconderli
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

function displayResult() { // Set di funzioni
    grid.style.pointerEvents = 'none';
    stop();
    timerStop(); 
    clearTimer();
    printResult();
}

function easyResult() {    // Mostra risultato Easy

    if (found.length==12) {
        displayResult();
    }
}

function normalResult() {  // Mostra risultato Normal

    if (found.length==24) { // se hai trovato tutte le carte
        displayResult();
    }
}

function hardResult() {    // Mostra risultato Hard

    if (found.length==36) {               
        displayResult();
    }
}

//#endregion