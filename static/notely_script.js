"use strict";

const trebNotes = {
    0: "E",
    1: "F",
    2: "G",
    3: "A",
    4: "B",
    5: "C",
    6: "D",
    7: "E",
    8: "F",
}

const bassNotes = {
    0: "G",
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "A",
}

// selectors
const noteEl = document.querySelector(".note")
const newGameBtn = document.querySelector(".btn--new")

// instantiating variables
let testNote, testClef, noteCount;
let gameActive = false

// game logic here

const note = function (){
    //generates random number between 0 and 8 to represent note
    return Number(Math.trunc(Math.random() * 9));}

const clef = function() {
    // generates random number between 0 and 1 to represent bass or treble clef
    const coinFlip = Number(Math.trunc(Math.random()*2));
    return coinFlip === 1? "treb":"bass"}

const renderTest = function(note, clef= "treb"){
    // renders note on player UI
    noteEl.classList.remove("hidden")
    noteEl.src =    `../static/assets/notes/0${note}_${clef}_q.jpg`
}

const renderResults = function(score){
    
}

const answer = function(renderNote, renderClef){
    // generates appropiate alphabetic representation of note
    if (renderClef === "treb"){
        return trebNotes[renderNote]
    } else {
        return bassNotes[renderNote]
    }
}

// game logic should call a note, then wait for key input, then call correct or not.

// listeners

newGameBtn.addEventListener("click", function(){
    noteCount = 8;
    gameActive = true;
    testNote = note();
    testClef = clef(); 
    newGameBtn.classList.add("hidden")
    renderTest(testNote, testClef);
})

// if correct key is pressed, "correct", if not, "incorrect".
document.onkeydown = function(e){
    if (!gameActive){
        return
    }
    answer(testNote,testClef).toLowerCase() === e.key ?
        console.log("CORRECT!"):
        console.log(`INCORRECT! Correct note is ${answer(testNote,testClef)}`)
    noteCount -=1;
    if(noteCount===0){
        console.log("Game over!")
        gameActive=false;
        newGameBtn.classList.remove('hidden')
        noteEl.classList.add("hidden")
        renderResults();
        return
    }
    testNote = note();
    testClef = clef();
    renderTest(testNote, testClef);
}