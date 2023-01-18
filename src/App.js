import React, {useState, useEffect, useReducer} from "react";
import { WORDS } from "./words.js";
import Guess from "./Guess.js";

const LOCAL_STORAGE_KEY = 'wordleApp'


let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase()
console.log('chosen word',rightGuessString)

var guessed = [false, false, false, false, false]
var attempt  = 0
var win  = false
var loss = false

// var audio = new Audio('sad.mp3');
function play() {
  var audio = new Audio('https://www.fesliyanstudios.com/play-mp3/5641');
  audio.play();
}

function playwon() {
  var audio = new Audio('https://www.fesliyanstudios.com/play-mp3/6976');
  audio.play();
}


function App() {

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [w] = useState(["","","","","",""])

  function handleClick() {
    forceUpdate();
  }

  function initBoard() {
    console.log('play again')
    for (let i = 0; i < w.length; i++) {
      w[i] = "";
    }
    guessed = [false, false, false, false, false]
    attempt  = 0
    rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase()
    loss = false
    win = false
    handleClick()
    return
  }

  function enterGuess() {
    if (w[attempt].length === 5) {
      guessed[attempt] = true
      // document.getElementById('word1')
      console.log('win',rightGuessString.localeCompare(w[attempt]),w[attempt],rightGuessString)
      console.log(w[attempt],guessed[attempt])
      if (rightGuessString.localeCompare(w[attempt]) === 0) {
        console.log('win')
        win = true
      }
      else if (attempt === 5) {
        console.log("loss")
        loss = true
      }
      attempt += 1
      handleClick();
    }
  }

  function handleKeys(e) {
    console.log('Handle Keys',w,attempt)
    if (win || loss) {
      return
    }
    if (e.key === "Enter") {
      return enterGuess()
    }
    if (e.key === "Backspace") {
      w[attempt] = w[attempt].slice(0,w[attempt].length-1)
      handleClick();
      return
    }
    if (w[attempt].length < 5 && e.key.match(/^[A-z]$/)) {
      w[attempt] = w[attempt] + e.key.toUpperCase()
      handleClick()
    }
  }
  
  useEffect(() =>{ 
    window.addEventListener("keyup", handleKeys)
    return () => {
      window.removeEventListener('keyup',handleKeys)
    }
  }, [])

  useEffect(() => {
    // create function to get element by id for each Guess word and update it to a new one
  }, [w])

  console.log('hi',w)
  return (
    <>
    <div className="game">
      <Guess id='word1' word={rightGuessString} guess={w[0].toUpperCase()} isGuessed={guessed[0]} />
      <Guess id='word2' word={rightGuessString} guess={w[1].toUpperCase()} isGuessed={guessed[1]} />
      <Guess id='word3' word={rightGuessString} guess={w[2].toUpperCase()} isGuessed={guessed[2]} />
      <Guess id='word4' word={rightGuessString} guess={w[3].toUpperCase()} isGuessed={guessed[3]} />
      <Guess id='word5' word={rightGuessString} guess={w[4].toUpperCase()} isGuessed={guessed[4]} />
      <Guess id='word6' word={rightGuessString} guess={w[5].toUpperCase()} isGuessed={guessed[5]} />
    </div>
    {win && <div className="play-again"> YOU WON! {playwon()} <br></br> <iframe src="https://giphy.com/embed/26tOZ42Mg6pbTUPHW" width="480" height="320" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/26tOZ42Mg6pbTUPHW"></a></p> </div>}
    {loss && <div className="play-again"> YOU LOST! {play()} <br></br> <iframe src="https://gifer.com/embed/6kk" width="480" height="406.286" frameBorder="0" allowFullScreen></iframe><p><a href="https://gifer.com"></a></p> </div>}
    <div className="play-again">
      <button onClick={initBoard}>Play Again</button>
    </div>
    </>
  );
}

export default App;
