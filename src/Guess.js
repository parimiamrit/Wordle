import React from 'react'
import "./style.css"
import {v4 as uuid} from 'uuid'

export default function Guess({word, guess, isGuessed}) {
    var bgColor = ['error','error','error','error','error'];
    var errInd = [];
    var tempWord = '';
    var tempGuess = '';
    if (isGuessed) {
        for (let index = 0; index < 5; index++) {
            if (word[index]===guess[index]) {
                bgColor[index] = 'correct';
                tempWord = tempWord + ' '
                tempGuess = tempGuess + ' '
            }
            else {
                tempWord = tempWord + word[index]
                tempGuess = tempGuess + guess[index]
                errInd.push(index);
            }
        }
        for (const index of errInd) {
            if (bgColor[index]!=='correct' && tempWord.includes(guess[index])) {
                const temp = tempGuess.substring(0,index);
                bgColor[index] = 'almost';
                if ((tempWord.match(new RegExp(guess[index], "g")) || []).length<=(temp.match(new RegExp(guess[index], "g")) || []).length) {
                    bgColor[index] = 'error';
                }
            }
        }
    }
    // console.log(guess)
    return (
    <div>
      {new Array(5).fill(0).map((_,i) => (
        <div key={uuid()} bgcolor={bgColor[i]} className='letter-box' id={bgColor[i]}>{guess[i]}</div>))}
    </div>
  )
}
