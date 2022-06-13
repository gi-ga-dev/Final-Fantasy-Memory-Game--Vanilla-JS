//#region ------------ Arrays, Audio, Img obj, Selectors -------------

let arrMonsters = [createImage('img/M1.png'), createImage('img/M1.png'), createImage('img/M2.png'), createImage('img/M2.png'), createImage('img/M3.png'), createImage('img/M3.png'), createImage('img/M4.png'), createImage('img/M4.png'), createImage('img/M5.png'), createImage('img/M5.png'), createImage('img/M6.png'), createImage('img/M6.png')];
let arrCharacters = [createImage('img/C1.png'), createImage('img/C1.png'), createImage('img/C2.png'), createImage('img/C2.png'), createImage('img/C3.png'), createImage('img/C3.png'), createImage('img/C4.png'), createImage('img/C4.png'), createImage('img/C5.png'), createImage('img/C5.png'), createImage('img/C6.png'), createImage('img/C6.png'), createImage('img/C7.png'), createImage('img/C7.png'), createImage('img/C8.png'), createImage('img/C8.png'), createImage('img/C9.png'), createImage('img/C9.png'), createImage('img/C10.png'), createImage('img/C10.png'), createImage('img/C11.png'), createImage('img/C11.png'), createImage('img/C12.png'), createImage('img/C12.png')];
let arrSummons = [createImage('img/S1.png'), createImage('img/S1.png'), createImage('img/S2.png'), createImage('img/S2.png'), createImage('img/S3.png'), createImage('img/S3.png'), createImage('img/S4.png'), createImage('img/S4.png'), createImage('img/S5.png'), createImage('img/S5.png'), createImage('img/S6.png'), createImage('img/S6.png'), createImage('img/S7.png'), createImage('img/S7.png'), createImage('img/S8.png'), createImage('img/S8.png'), createImage('img/S9.png'), createImage('img/S9.png'), createImage('img/S10.png'), createImage('img/S10.png'), createImage('img/S11.png'), createImage('img/S11.png'), createImage('img/S12.png'), createImage('img/S12.png'), createImage('img/S13.png'), createImage('img/S13.png'), createImage('img/S14.png'), createImage('img/S14.png'), createImage('img/S15.png'), createImage('img/S15.png'), createImage('img/S16.png'), createImage('img/S16.png'), createImage('img/S17.png'), createImage('img/S17.png'), createImage('img/S18.png'), createImage('img/S18.png')];
let arrList= [arrMonsters, arrCharacters, arrSummons];    // array contenitore di altri array
let arrayComparison = [];

let interval;
let intervalM;
let memSec = 5;
let sec = 35; 
let min = 1;
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
const text = document.getElementById('text');
const start = document.querySelector('.text-center .start');
const memorize = document.querySelector('.text-center .memorize');
const timer = document.querySelector('.text-center .timer');
const moves = document.querySelector('.text-center .moves');
const found = document.getElementsByClassName('icon show find disabled');
const disabled = document.getElementsByClassName('icon disabled');

const mobile = window.matchMedia('(max-width: 480px)');
const tablet = window.matchMedia('(max-width: 1280px)');
const desktop = window.matchMedia('(min-width: 1281px)');

document.body.onload = gamePreview(); // al caricamento della pagina chiama la funzione e genera il contenuto

//#endregion

//#region ---------- Buttons onclick functions ----------------

function startEasy() {   // Easy Difficulty Button
    functionSet1();
    gameInitEasy(); 
    functionSet2(); 
}

function startNormal() { // Normal Difficulty Button
    functionSet1();
    gameInitNormal(); 
    functionSet2();  
}

function startHard() {  // Hard Difficulty Button
    functionSet1();
    gameInitHard(); 
    functionSet2();
}

function functionSet1() { // Funzioni di pulizia
    snd_victory.pause();
    snd_gameover.pause();
    snd_startgame.play();
    timerStop();   // stop all'intervallo precedente
    clearTimer();  // pulizia div timer 
    clearMoves();  // pulizia div moves e clickCount reset
    intervalMemoStop();
}

function functionSet2() { // Funzioni Timeout/Timer
    timeout1();    // timeout al lancio mostra carte
    timeout2();    // timeout 5s dopo nascondi carte

    intervalMemoStart();

    timerStart();  // caricamento nuovo intervallo
    printTimer();  // stampa intervallo
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
    memorize.style.display = 'none';
    
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
    
    /* --- Preview Img (aggiunta dinamicamente) --- */

    grid.style.pointerEvents = 'none';                 // i div non si possono cliccare
    grid.innerHTML = '';                               // pulisce eventuale contenuto  
    moves.style.display = 'none';                      // nasconde il div delle mosse
    
    let previewImg = document.createElement('img');
    previewImg.id = 'previewImg';
    grid.appendChild(previewImg);

    /* --------- Media Queries ----------- */

    function mediaQ() { 
        if (desktop.matches) {       // se la media matcha
            previewImg.src = 'img/img-preview-portrait.png';
            previewImg.style.width = '100%';
            previewImg.style.height = '600px';
        } else if (tablet.matches) {
            previewImg.src = 'img/img-preview-landscape.png';
            previewImg.style.width = '100%';
            previewImg.style.height = '100%';
        } else if (mobile.matches) {
            previewImg.src = 'img/img-preview-landscape.png';
            previewImg.style.width = '100%';
            previewImg.style.height = '100%';
        }
    }    

    mediaQ(desktop, tablet, mobile); // chiama la funzione all'avvio
    desktop.addListener(mediaQ);     // attacca la funzione al cambiamento dello stato
    tablet.addListener(mediaQ);
    mobile.addListener(mediaQ);
}

function gameInitEasy() { // Game difficolta' Easy

    memorize.style.display = 'initial';

    // non si puo' dichiarare fuori come const perche' e' un btn che va sovrascritto dopo la preview
    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    restartBtnEasy.value = 'Restart';               
    restartBtnNormal.style.display = 'none'; 
    restartBtnHard.style.display = 'none';    
    restartBtnEasy.onclick = function() {startEasy();}
    btnMenu.style.display = 'initial';

    arrayComparison = [];
    var arrayShuffle = shuffle(arrList[0]); // shuffle delle img dell'arr selez.                 

    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial'; // i div tornano cliccabili
    moves.style.display = 'block';        // il div delle mosse torna visibile           

    for(i=0; i<12; i++) {                                   // creazione div
        let divCont = document.createElement('div');        // div contenitore
        let divIcon = document.createElement('div');        // div con icona dentro
        divCont.className = 'iconCont';
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

    /* --------- Media Queries ----------- */
    
    function mediaQ() { 
        if (mobile.matches) { // in ordine da mobile a desktop
            grid.style.width = '370px';
            text.style.width = '370px';
        } else if (tablet.matches) {
            grid.style.width = '690px';
            text.style.width = '690px';
        } else if (desktop.matches) {
            grid.style.width = '900px';
            text.style.width = '900px';
        }
    }    

    mediaQ(mobile, tablet, desktop); // chiama la funzione all'avvio
    mobile.addListener(mediaQ);      // attacca la funzione al cambiamento dello stato
    tablet.addListener(mediaQ);
    desktop.addListener(mediaQ);   
}

function gameInitNormal() { // Game difficolta' Normal

    memorize.style.display = 'initial';

    // Per selezionare e modificare un button esistente
    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    restartBtnNormal.value = 'Restart';                  // Modifico il button normal
    restartBtnEasy.style.display = 'none';               // Nascondo il button easy
    restartBtnHard.style.display = 'none';               // Nascondo il button hard
    restartBtnNormal.onclick = function() {startNormal();}
    btnMenu.style.display = 'initial';

    arrayComparison = [];
    var arrayShuffle = shuffle(arrList[1]);              // gli passo la funzione shuffle con all'interno le icone                
    grid.innerHTML = '';                                 // pulisco tutto il contenuto
    grid.style.pointerEvents = 'initial';                // i div tornano cliccabili
    moves.style.display = 'block';                       // il div delle mosse torna visibile 

    for(i=0; i<24; i++) {                                   // creazione div
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
    
    /* --------- Media Queries ----------- */
    
    function mediaQ() { 
        if (mobile.matches) { // in ordine da mobile a desktop
            grid.style.width = '370px';
            text.style.width = '370px';
        } else if (tablet.matches) {
            grid.style.width = '690px';
            text.style.width = '690px';
        } else if (desktop.matches) {
            grid.style.width = '1200px';
            text.style.width = '1200px';
        }
    }    

    mediaQ(mobile, tablet, desktop); // chiama la funzione all'avvio
    mobile.addListener(mediaQ);      // attacca la funzione al cambiamento dello stato
    tablet.addListener(mediaQ);
    desktop.addListener(mediaQ);
}

function gameInitHard() {  // Game difficolta' Hard

    memorize.style.display = 'initial';

    // Per selezionare e modificare un button esistente
    let restartBtnEasy = document.querySelector('.text-center .start #btnEasy');
    let restartBtnNormal = document.querySelector('.text-center .start #btnNormal');
    let restartBtnHard = document.querySelector('.text-center .start #btnHard');

    restartBtnHard.value = 'Restart';
    restartBtnEasy.style.display = 'none'; 
    restartBtnNormal.style.display = 'none'; 
    restartBtnHard.onclick = function() {startHard();}
    btnMenu.style.display = 'initial';

    arrayComparison = [];
    var arrayShuffle = shuffle(arrList[2]);                      
    grid.innerHTML = '';                                 
    grid.style.pointerEvents = 'initial'; // i div tornano cliccabili
    moves.style.display = 'block';        // il div delle mosse torna visibile                 

    for(i=0; i<36; i++) {
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
    
    /* --------- Media Queries ----------- */
    
    function mediaQ() { 
        if (mobile.matches) { // in ordine da mobile a desktop
            grid.style.width = '370px';
            text.style.width = '370px';
        } else if (tablet.matches) {
            grid.style.width = '690px';
            text.style.width = '690px';
        } else if (desktop.matches) {
            grid.style.width = '1280px';
            text.style.width = '1280px';
        }
    }    

    mediaQ(mobile, tablet, desktop); // chiama la funzione all'avvio
    mobile.addListener(mediaQ);      // attacca la funzione al cambiamento dello stato
    tablet.addListener(mediaQ);
    desktop.addListener(mediaQ);
}

//#endregion

//#region --- Timeout show/hide cards, Timer & Print Functions ---

/* ----------- Timeout -------------- */

function showCards() {
    // creo un ciclo per riuscire ad iterare ogni elem. di icon
    var icon = document.getElementsByClassName("icon");
    for(var i=0; i<icon.length; i++){
    icon[i].style.opacity = '1'; // per ogni icona applica style
    icon[i].style.pointerEvents = 'none';
    }
}

function hideCards() {
    var icon = document.getElementsByClassName("icon");
    for(var i=0; i<icon.length; i++){
        icon[i].style.opacity = '0'; 
        icon[i].style.pointerEvents = 'initial';
    }
}

function timeout1() {
    setTimeout(showCards, 100);
}

function timeout2() {
    setTimeout(hideCards, 5100); 
}

/* --------- Interval Memo ------------ */

function intervalMemo() {
    memSec--;
    memorize.innerHTML = 'Starts in: ' + +memSec;
    if(memSec <= -1) { 
        intervalMemoStop();
        memorize.innerHTML = '';
    }
}

function intervalMemoStart() {
    memSec = 5;
    timer.style.display = 'none';      
    intervalM = setInterval(intervalMemo, 1000);
}

function intervalMemoStop() {
    clearInterval(intervalM);
    memorize.style.display = 'none';
    timer.style.display = 'initial';
}

/* --------- Interval Timer ------------ */

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
        min = 1;         // ripristina valori iniziali
        sec = 35;       
    } 
}

function timerStart() {
    min = 1;  // ripristina valori iniziali
    sec = 35; 
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

/* --------- Print Funcs ------------ */

function printMemorize() {
    timer.innerHTML = 'Starts in: ' + +memSec + ' sec';
}

function printTimer() { // tempo rimanente e mosse stampate in-game
    timer.innerHTML = 'Time: ' + +min + ' min ' + +sec + ' sec';
    moves.innerHTML = 'Number of Moves: ' + parseInt(clickCount); // stampato al partire dell'intervallo (0)
}

function printMoves() { // stampa numero mosse ad ogni click sui div
    clickCount += 0.5;
    moves.innerHTML = 'Number of Moves: ' + parseInt(clickCount); // stampato in-game
}

function printResult() { // Schermata Vittoria
    snd_correct.pause();
    snd_victory.play();
    // ciclo per selez. icone trovate e renderle non cliccabili
    for(var i=0; i<found.length; i++){
        found[i].style.pointerEvents = 'none';
    }
    let minResult = (1 - +min); // valore fisso - valore stampato
    let secResult = (30 - +sec); // recupero i 5s di intervalMemo agg. al risultato
    timer.innerHTML = 'Congrats! Finished in: ' + minResult + ' min ' + secResult + ' sec';
    moves.innerHTML = moves.value; // prende valore numero mosse da printMoves e stampa
}

function printGameOver() { // Schermata Gameover
    snd_gameover.play();
    grid.style.pointerEvents = 'none';                 // i div non si possono cliccare
    grid.innerHTML = '';                               // pulisce eventuale contenuto  
    moves.style.display = 'none';                      // nasconde il div delle mosse
    timer.innerHTML = 'Game Over. You lose!';

    /* --- Gameover Img (aggiunta dinamicamente) --- */

    let gameoverImg = document.createElement('img');
    gameoverImg.id = 'gameoverImg';
    grid.appendChild(gameoverImg); 

    /* --------- Media Queries ----------- */

    function mediaQ() { 
        if (desktop.matches) {   
            gameoverImg.src = 'img/img-gameover-portrait.png';    
            gameoverImg.style.width = '100%';
            gameoverImg.style.height = '600px';
        } else if (tablet.matches) {
            gameoverImg.src = 'img/img-gameover-landscape.png';
            gameoverImg.style.width = '100%';
            gameoverImg.style.height = '100%';
        } else if (mobile.matches) {
            gameoverImg.src = 'img/img-gameover-landscape.png';
            gameoverImg.style.width = '100%';
            gameoverImg.style.height = '100%';
        }
    }    

    mediaQ(desktop, tablet, mobile); // chiama la funzione all'avvio
    desktop.addListener(mediaQ);     // attacca la funzione al cambiamento dello stato
    tablet.addListener(mediaQ);
    mobile.addListener(mediaQ);
}

//#endregion

//#region ---- Shuffle, Mostra icone & Risultati Partita ----

function shuffle(a) {            // Mischia le icone nell'array
    var currentIndex = a.length; // currentIndex = lunghezza dell'array dentro arg di shuffle
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
    this.style.opacity = '1';
    arrayComparison.push(this);    //aggiunge l'oggetto cliccato all'array del confronto
    var len = arrayComparison.length;
    snd_select.play();
    
    if (len === 2) { // se nel confronto ci sono due elementi.  // qui sotto ho aggiunto una comparazione con se stesso, altrimenti cliccando 2 volte la stessa si bloccava
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML && arrayComparison[0] !== arrayComparison[1]) { // se uguali aggiunge la classe find
            arrayComparison[0].classList.add("find", "disabled"); // hai trovato due elementi uguali
            arrayComparison[0].style.pointerEvents = 'none';      // i due elementi comparati non sono piu cliccabili
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison[1].style.pointerEvents = 'none';

            // ciclo per selez. icone trovate e renderle non cliccabili
            for(var i=0; i<found.length; i++){
                found[i].style.pointerEvents = 'none';
            }
            
            arrayComparison = [];
            snd_select.pause();
            snd_correct.play();

        } else { // altrimenti (ha sbagliato)  
            icons.forEach(function(item) {  
                item.classList.add('disabled');               // aggiunge solo la classe disabled
                                                              // ciclo per riuscire ad iterare una HTML Coll. di div
                for(var i=0; i<disabled.length; i++){         // lungo pari alla lunghezza icone disabled
                    disabled[i].style.pointerEvents = 'none'; // dopo 2 elem. clicc. disattivo classe icon disabled
                }
                snd_select.play();
            });
            
            setTimeout(function() {                              // timeout per nasconderli
                arrayComparison[0].classList.remove("show");     // rimuovo classe show
                arrayComparison[0].style.opacity = '0';          // opacita torna a 0
                for(var i=0; i<disabled.length; i++){            // lungo pari alla lunghezza icone disabled
                    disabled[i].style.pointerEvents = 'initial'; // i div disabled tornano cliccabili
                }
                arrayComparison[1].classList.remove("show");
                arrayComparison[1].style.opacity = '0';
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {  // per ogni icona trovata agg. classe disabled
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

function easyResult() { if (found.length==12) {displayResult(); }}

function normalResult() { if (found.length==24) { displayResult(); }}

function hardResult() { if (found.length==36) { displayResult(); }}

//#endregion