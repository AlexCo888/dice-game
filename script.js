'use strict';
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const currentScoreFirstPlayer = document.getElementById('current--0');
const currentScoreSecondPlayer = document.getElementById('current--1');
const totalScoreFirstPlayer = document.getElementById('score--0');
const totalScoreSecondPlayer = document.getElementById('score--1');
const btnDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.getElementsByClassName('dice')[0];

// Global Variables from the Game
let totalScore, currentScore, player;
let diceCounter = 0;

// Define who is the active player
const activePlayer = () => {
  if (playerOne.classList.contains('player--active')) {
    totalScore = totalScoreFirstPlayer;
    currentScore = currentScoreFirstPlayer;
    player = playerOne;
  } else {
    totalScore = totalScoreSecondPlayer;
    currentScore = currentScoreSecondPlayer;
    player = playerTwo;
  }
};

// Switching Players
const changePlayer = () => {
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// When user click on Roll Dice
const rollDice = () => {
  let randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${randomDiceNumber}.png`;
  dice.removeAttribute('hidden');
  if (randomDiceNumber === 1) {
    restartScore();
    changePlayer();
  } else {
    activePlayer();
    diceCounter += randomDiceNumber;
    currentScore.textContent = diceCounter;
    console.log(diceCounter);
  }
};

// Player choose to accumulate the current points looking for win.
const holdScore = () => {
  activePlayer();
  totalScore.textContent = Number(totalScore.textContent) + diceCounter;
  currentScore.textContent = 0;
  diceCounter = 0;
  if (totalScore.textContent >= 100) {
    player.classList.add('player--winner');
    btnDice.disabled = true;
    btnHold.disabled = true;
    currentScore.textContent = 'You win!';
    dice.hidden = true;
  }
  changePlayer();
};

const restartScore = () => {
  activePlayer();
  currentScore.textContent = 0;
  diceCounter = 0;
};

//When user click on New Game
const playAgain = () => {
  window.location.reload();
};
