let arrayEasy = [ // usare funzione per creare img direttamente in un array
    createImage('img/9-ifrit.png'), createImage('img/1-anima.png'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/9-ifrit.png'), createImage('img/1-anima.png'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg')
];

let arrayNormal = [
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg')
];

let arrayHard = [
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg'),
    createImage('img/1-aerith.png'), createImage('img/2-cloud.jpg'), createImage('img/3-sephiroth.png'), createImage('img/4-tifa.jpg'), createImage('img/5-rinoa.jpg'), createImage('img/6-squall.jpg')
];

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

snd_select.volume = 0.3; // valori audio di default
snd_correct.volume = 0.3;
snd_startgame.volume = 0.3;
snd_victory.volume = 0.3;
snd_gameover.volume = 0.3;

const grid = document.getElementById('griglia');
const start = document.querySelector('.text-center .start');
const timer = document.querySelector('.text-center .timer');
const moves = document.querySelector('.text-center .moves');
const found = document.getElementsByClassName('icon show find disabled');

document.body.onload = gamePreview(); // al caricamento della pagina chiama la funzione e genera il contenuto

//#region ---------- Buttons onclick functions ----------------

function startFuncSet() { // Set di funzioni Start
    snd_startgame.play();
    timerStop();  // stop all'intervallo precedente
    clearTimer(); // pulizia div timer
    printTimer(); // stampa intervallo
    timerStart(); // caricamento nuovo intervallo
}

function restartFuncSet() { // Set di funzioni Restart
    snd_victory.pause();
    snd_gameover.pause();
    snd_startgame.play();
    stop();       // stop al caricamento della pagina
    timerStop();  // stop all'intervallo precedente
    clearTimer(); // pulizia div timer
    clearMoves(); // pulizia div moves e clickCount reset
    timerStart(); // caricamento nuovo intervallo
}

/* ---------------------------------------- */

function startEasy() {   // Easy Difficulty Button
    startFuncSet();
    gameInitEasy();
}

function startNormal() { // Normal Difficulty Button

    startFuncSet();
    gameInitNormal();
}

function startHard() {  // Hard Difficulty Button
    startFuncSet();
    gameInitHard();     
}

/* ---------------------------------------- */

function restartEasy() {
    restartFuncSet(); // Set di funzioni
    gameInitEasy();   // caricamento contenuto del gioco 
}

function restartNormal() {
    restartFuncSet(); // Set di funzioni    
    gameInitNormal(); // caricamento contenuto del gioco     
}

function restartHard() {
    restartFuncSet(); // Set di funzioni  
    gameInitHard();   // caricamento contenuto del gioco
}

//#endregion

//#region ------ Game Initialization & Buttons Creation ----------

function createImage(src) { // al lancio della funzione creare un img di 100x100, (arg1 e' la src)
    var img = new Image(100,100);
    img.src = src;
    return img;
}

function gamePreview() { // Schermata Preview del gioco senza input
//@desc creo i buttons nella preview e li modifico in-game cosi' da non creare buttons ogni volta che clicco
    
    timer.innerHTML = 'Memory Game: 2 minutes to win!';
    
    /* ---- Creazione button Menu' principale ----- */

    let btnMenu = document.createElement('input');
    btnMenu.type = 'button';
    btnMenu.id = 'btnMenu';
    btnMenu.value = 'Main Menu';                       
    btnMenu.onclick = function() {
        snd_startgame.play();
        stop(); 
        window.location.reload();
    }   
    start.appendChild(btnMenu);
    btnMenu.style.display = 'none';

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

    /* ---- Creazione button Mute/Unmute ----- */

    generateBtn1();

    function generateBtn1() {
        let btnMute = document.createElement('input');
        btnMute.type = 'button';
        btnMute.id = 'btnMute';
        btnMute.value = 'Mute Audio';
        btnMute.onclick = function(){
            btnMute.remove(); // al click rimuovo il button
            muteVolume();     // muto il volume
            generateBtn2();   // genero secondo button 
        }
        start.appendChild(btnMute);
    }

    function generateBtn2() {

        let btnUnmute = document.createElement('input');
        btnUnmute.type = 'button';
        btnUnmute.id = 'btnUnmute';
        btnUnmute.value = 'Unmute Audio';
        btnUnmute.onclick = function(){
            btnUnmute.remove(); // al click rimuovo il button        
            unmuteVolume();     // riattivo il volume
            generateBtn1();     // genero primo button 
        }
        start.appendChild(btnUnmute);
    }

    function muteVolume() {
        snd_select.volume = 0;
        snd_correct.volume = 0;
        snd_startgame.volume = 0;
        snd_victory.volume = 0;
        snd_gameover.volume = 0;
    }

    function unmuteVolume() {
        snd_select.volume = 0.3;
        snd_correct.volume = 0.3;
        snd_startgame.volume = 0.3;
        snd_victory.volume = 0.3;
        snd_gameover.volume = 0.3;
    }
    
    /* ------------------------------------- */

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
    btnMenu.style.display = 'initial';

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayEasy);                      
    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial'; // i div tornano cliccabili
    moves.style.display = 'block';        // il div delle mosse torna visibile           

    for(i=0; i<12; i++) {                                   // creazione 24 div
        let divCont = document.createElement('div');        // div contenitore
        let divIcon = document.createElement('div');        // div con icona dentro
        divIcon.className = 'icon';                         // assegno classe icon
        divIcon.ondragstart = function() { return false; }; // non permette alle icone di essere spostate                      
        grid.appendChild(divCont).appendChild(divIcon);     // appendere divCont alla griglia, e divIcon al divCont
        divIcon.appendChild(arrayShuffle[i]);               // ritorna l'elemento contenuto nell'array (iterato);
    }

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (i=0; i<icons.length; i++) {                      // itera array passato nella var icons
        icons[i].addEventListener('click', displayIcon);  // e cicla varie funzioni contemporaneamente
        icons[i].addEventListener('click', easyResult);   // visualizza risultato solo con 24 risp esatte
        icons[i].addEventListener('click', printMoves);   // ritorna numero mosse e stampa ad ogni click sui div
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
    btnMenu.style.display = 'initial';

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayNormal);             // gli passo la funzione shuffle con all'interno le icone                
    grid.innerHTML = '';                                 // pulisco tutto il contenuto
    grid.style.pointerEvents = 'initial';                // i div tornano cliccabili
    moves.style.display = 'block';                       // il div delle mosse torna visibile 

    for(i=0; i<24; i++) {                                   // creazione 24 div
        let divCont = document.createElement('div');        // div contenitore
        let divIcon = document.createElement('div');        // div con icona dentro
        divIcon.className = 'icon';                         // assegno classe icon
        divIcon.ondragstart = function() { return false; }; // non permette alle icone di essere spostate                      
        grid.appendChild(divCont).appendChild(divIcon);     // appendere divCont alla griglia, e divIcon al divCont
        divIcon.appendChild(arrayShuffle[i]);               // ritorna l'elemento contenuto nell'array (iterato);
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
    btnMenu.style.display = 'initial';

    arrayComparison = [];
    var arrayShuffle = shuffle(arrayHard);                      
    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial'; // i div tornano cliccabili
    moves.style.display = 'block';        // il div delle mosse torna visibile                 

    for(i=0; i<36; i++) { // creazione 36 div
        let divCont = document.createElement('div');    
        let divIcon = document.createElement('div');     
        divIcon.className = 'icon';    
        divIcon.ondragstart = function() { return false; };                  
        grid.appendChild(divCont).appendChild(divIcon);  
        divIcon.appendChild(arrayShuffle[i]);                    
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
}

function clearTimer() {
    timer.innerHTML = ''; // pulisco div timer
}

function clearMoves() {
    clickCount = 0;       // reset al conteggio mosse
    moves.innerHTML = ''; // pulisco div moves
}

/* ------------------------------------------------------- */

function printTimer() { // tempo rimanente e mosse stampate in-game
    timer.innerHTML = 'Time: ' + +min + ' min ' + +sec + ' sec';
}

function printMoves() { // stampa numero mosse ad ogni click sui div
    clickCount += 0.5;
    moves.innerHTML = 'Number of Moves: ' + parseInt(clickCount); // stampato in-game
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

/* ------------------------------------------------- */

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