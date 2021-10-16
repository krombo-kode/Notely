"use strict";
// DEFINING LOOKUPS
const testStr = "abcdefg"

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

// SELECTORS
const titleEl = document.querySelector(".game-title")
const noteEl = document.querySelector(".note")
const scoreEl = document.querySelector(".score")
const newGameBtn = document.querySelector(".btn--new")

// INSTANTIATING VARIABLES
let testNote, testClef, noteCount, score = 0;
let gameActive = false

// FUNCTION DECLARATIONS
const note = function (){//generates random number between 0 and 8 to represent note
    return Number(Math.trunc(Math.random() * 9));}

const clef = function() { // generates random number between 0 and 1 to represent bass or treble clef
    const coinFlip = Number(Math.trunc(Math.random()*2));
    return coinFlip === 1? "treb":"bass"}

const answer = function(renderNote, renderClef){ // returns appropiate alphabetic representation of note
    return renderClef === "treb" ? trebNotes[renderNote] : bassNotes[renderNote]
}

const newNote = function(note, clef= "treb"){ // renders note on player UI
    noteEl.classList.remove("hidden")
    noteEl.src =    `../static/assets/notes/0${note}_${clef}_q.jpg`
}

const renderNewGame = function(){ // unhides game UI during play
    newGameBtn.classList.add("hidden")
    titleEl.classList.add("title-active")
    scoreEl.classList.remove("hidden")
    scoreEl.classList.remove("game-ended")
    gameCycle();
}

const renderResults = function(){ // hides game UI, upsizes score
    newGameBtn.classList.remove("hidden")
    titleEl.classList.remove("title-active")
    noteEl.classList.add("hidden")
    scoreEl.classList.add("game-ended")
}

const gameCycle = function(){ //activates game state, generates new note and clef, passes note and clef to render function
    gameActive = true;
    testNote = note();
    testClef = clef();
    newNote(testNote, testClef); 
}

// LISTENERS
newGameBtn.addEventListener("click", function(){
    noteCount = 8;
    renderNewGame();
})

document.onkeydown = function(e){
    if (!gameActive){
        return
    } else if (!testStr.includes(e.key)){
        return
    }
    const correctNote = answer(testNote, testClef)
    if (correctNote === e.key.toUpperCase()){
    console.log("CORRECT!")
    score ++;  
    scoreEl.textContent = `${score}/8`
    } else {
        console.log(`INCORRECT! Correct note is ${correctNote}`)
    }
    gameActive = false; // setting game state to inactive to prevent spam-abuse of score during delay between notes
    noteCount -=1;
    if(noteCount===0){
        console.log("Game over!")
        renderResults();
        return
    }
    setTimeout(()=>{gameCycle()}, 2000) // wait 2 seconds to display correct/incorrect
}