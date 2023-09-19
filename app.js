const newGame = document.getElementById('new-game');
const dice = document.getElementById('dice');
const diceimg = document.querySelector('#dice img');
const rollDice = document.getElementById('roll-dice');
const hold = document.getElementById('hold');
let totalScore0 = document.getElementById('total-score-0');
let totalScore1 = document.getElementById('total-score-1');
let player0 = document.querySelector('#player-0');
let player1 = document.querySelector('#player-1');

let currentscore = 0;
let activePlayer = 0;
let gamePlaying = true;
let totalScores = [0, 0];

function switchPlayer() {
    currentscore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('active');
    player1.classList.toggle('active');
}

rollDice.addEventListener('click', diceRoll);
hold.addEventListener('click', holddiceRoll);

function diceRoll() {
    if (gamePlaying) {

        let diceNumb = Math.trunc(Math.random() * 6 + 1);
        diceimg.src = `${diceNumb}.png`;

        if (diceNumb !== 1) {
            dice.style.display = 'block';
            currentscore += diceNumb;
            document.getElementById(`current-${activePlayer}`).textContent = currentscore;
        } else {
            switchPlayer();
        }
        if (totalScores[activePlayer] + currentscore >= 100) {
            document.getElementById(`player-${activePlayer}`).style.backgroundColor = 'red';
            dice.style.display = 'block';
            gamePlaying = false;
        }
    }
};
function holddiceRoll() {
    if (gamePlaying) {
        totalScores[activePlayer] += currentscore;
        document.getElementById(`total-score-${activePlayer}`).textContent = totalScores[activePlayer];
        document.getElementById(`current-${activePlayer}`).textContent = 0;
        switchPlayer();
        if (totalScores[activePlayer] + currentscore >= 100) {
            document.getElementById(`player-${activePlayer}`).style.backgroundColor = 'red';
            dice.style.display = 'block';
            gamePlaying = false;
        }
    }
};
newGame.addEventListener('click', function newGameStarts() {
    currentscore = 0;
    totalScores = [0, 0];
    dice.style.display = 'none';
    activePlayer = 0;

    document.getElementById(`current-0`).textContent = 0;
    document.getElementById(`current-1`).textContent = 0;
    document.getElementById(`total-score-0`).textContent = 0;
    document.getElementById(`total-score-1`).textContent = 0;

    player0.classList.add('active');
    player1.classList.remove('active');

    document.getElementById(`player-0`).style.backgroundColor = '#87CEEB';
    document.getElementById(`player-1`).style.backgroundColor = '#6FB0CC';

    rollDice.removeEventListener('click', diceRoll);
    hold.removeEventListener('click', holddiceRoll);

    rollDice.addEventListener('click', diceRoll);
    hold.addEventListener('click', holddiceRoll);
    gamePlaying = true;
});