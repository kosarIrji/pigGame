`use strict`;

let score = document.getElementById('score');
let current1 = document.getElementById('current--0');
let current2 = document.getElementById('current--1');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let score1 = document.getElementById('score--0');
let score2 = document.getElementById('score--1');
let diceImg = document.querySelector('.dice');
let playerEl1 = document.querySelector('.player--0');
let playerEl2 = document.querySelector('.player--1');

let currentScore, activePlayer, scores, playing;

//functions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current1.textContent = 0;
  current2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;

  diceImg.classList.add('.hidden');
  playerEl1.classList.add('.player--active');
  playerEl1.classList.remove('.player--winner');
  playerEl2.classList.remove('.player--winner');
};

const roll = function () {
  return Math.trunc(Math.random() * 6 + 1);
};
init();

//swich player
const swichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  playerEl1.classList.toggle('player--active');
  playerEl2.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let diceNumber = roll();
    diceImg.src = `dice-${diceNumber}.png`;
        currentScore+=score;
    } else {
      swichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swichPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
