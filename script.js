'use strict';
const $ = document;

//
const player0El = $.querySelector('.player--0');
const player1El = $.querySelector('.player--1');
const score1 = $.getElementById('score--0');
const score2 = $.getElementById('score--1');
const current0El = $.getElementById('current--0');
const current1El = $.getElementById('current--1');
const dicEl = $.querySelector('.dice');
const btnNew = $.querySelector('.btn--new');
const btnRoll = $.querySelector('.btn--roll');
const btnHold = $.querySelector('.btn--hold');

let scores, activPlayer, playing, currentScore;
//functions

const init = function () {
  scores = [0, 0];
  activPlayer = 0;
  playing = true;
  currentScore = 0;

  score1.textContent = 0;
  score2.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dicEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  $.getElementById(`current--${activPlayer}`).textContent = 0;
  currentScore = 0;
  activPlayer = activPlayer == 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

//press btn Roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //genrate random number
    let diceNumber = Math.trunc(Math.random() * 6 + 1);
    //display dice
    dicEl.classList.remove('hidden');
    dicEl.src = `dice-${diceNumber}.png`;
    //check for roll
    if (diceNumber !== 1) {
      //add dice to current score
      currentScore = currentScore + diceNumber;
      $.getElementById(`current--${activPlayer}`).textContent = currentScore;
    } else {
      //swich to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activPlayer] += currentScore;
    $.getElementById(`score--${activPlayer}`).textContent = scores[activPlayer];

    //check if player's score is>=100
    if (scores[activPlayer] >= 100) {
      playing = false;
      dicEl.classList.add('hidden');
      $.querySelector(`.player--${activPlayer}`).classList.add(
        'player--winner'
      );
      $.querySelector(`.player--${activPlayer}`).classList.remove(
        'player--active'
      );
    } else {
      //swich to the next player
      switchPlayer();
    }
  }
});

// new game
btnNew.addEventListener('click', init);
