'use strict';

// Selecting elements
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const current0Ele = document.querySelector('#current--0');
const current1Ele = document.querySelector('#current--1');
const diceEle = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll'); //selects roll btn
const btnNew = document.querySelector('.btn--new'); //selects new btn
const btnHold = document.querySelector('.btn--hold'); //selects hold btn

// at start the values should be zero that is written in function

let scores, CurrentScore, activePlayer, playing;

const init = function () {
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  diceEle.classList.add('hidden');

  // rolling a dice functionality
  scores = [0, 0];
  CurrentScore = 0;
  activePlayer = 0;
  playing = true;

  // scores = [0, 0];
  // CurrentScore = 0;
  diceEle.classList.add('hidden');
  score0Ele.textContent = scores[0]; //0
  score1Ele.textContent = scores[1]; //0
  current0Ele.textContent = CurrentScore; // or 0
  current1Ele.textContent = CurrentScore; // or 0

  player1Ele.classList.remove('player--winner');
  player0Ele.classList.remove('player--winner');

  player0Ele.classList.add('player--active');
  player1Ele.classList.remove('player--active');
};
init();

// DRI principle switching the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //in which player u get 1 that current score should be 0
  CurrentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // switching
  player0Ele.classList.toggle('player--active');
  player1Ele.classList.toggle('player--active');
};

const randomNumberDice = function () {
  if (playing) {
    // producing random number
    let dice = Math.trunc(Math.random() * 6) + 1;

    // displaying the dice
    diceEle.classList.remove('hidden');
    // diceEle.src = 'dice-' + dice + '.png';
    diceEle.src = `dice-${dice}.png`;
    // console.log(dice);

    // Check for the number 1 if 1 switch to next one
    if (dice != 1) {
      // add a dice number to the score
      CurrentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        CurrentScore; // dynamically changes
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
};
// button Roll call
btnRoll.addEventListener('click', randomNumberDice); //roling functionality

// functionality of button hold
btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('hold buttton');
    // 1. add current score to active player
    scores[activePlayer] += CurrentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // scores[1] = scores[1] + CurrentScore

    // 2. chech if player score is >= 100
    // finish th game
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEle.classList.add('hidden');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// for range 5 to 10
// const r1 = () => {
//   return Math.trunc(Math.random() * (10 - 5 + 1)) + 5;
// };
// for (let i = 0; i < 10; i++) {
//   console.log(r1());
// }
// console.log('the floor' + Math.floor(-1.8));
// console.log('the floor' + Math.trunc(-1.9));

// resetting the game
const re = function () {
  location.reload();
};

btnNew.addEventListener('click', re);
