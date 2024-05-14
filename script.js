'use strict';
// Selecting elements
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentElement0 = document.querySelector('#current--0');
const currentElement1 = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, indexPlayer, playing;

// Start consditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  indexPlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;

  diceElement.classList.add('hidden');
  playerElement0.classList.remove('player--winner');
  playerElement1.classList.remove('player--winner');
  playerElement0.classList.add('player--active');
  playerElement1.classList.remove('player--active');
};
init();
/* this variable 'currentScore' is used to keep tracking the current score (accumulate), that's why it is created out side of the function.
 -  It's NOT possible sum numbers directly in the text.content because JavaScript get this like a string (the sequence of numbers like this ... 1, 2, 5, 6 would be like 1256 and not the sum of them that would be 14). So that's why this variable is important too.
let currentScore = 0;
*/

const updateScore = function (indexPlayer) {
  document.querySelector(`#current--${indexPlayer}`).textContent = currentScore;
};

const switchPlayer = function () {
  document.querySelector(`#current--${indexPlayer}`).textContent = 0;
  currentScore = 0;
  updateScore(indexPlayer);
  indexPlayer = indexPlayer === 0 ? 1 : 0;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

// Rolling the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate a random number to the dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display the dice accordingly to the dice image
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      updateScore(indexPlayer);
    } else {
      switchPlayer();
    }
  }
  // 3. check if dice is NOT 1 then add the result to current score
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[indexPlayer] += currentScore;

    document.querySelector(`#score--${indexPlayer}`).textContent =
      scores[indexPlayer];

    if (scores[indexPlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${indexPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${indexPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// 1. if the current player gets 1, he does NOT get points and pass the turn to the next player;
// 2. it is necessary to know some how, which is the current player. to do that, it is necessary validate if there is a class active--player.
