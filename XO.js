const message = document.getElementById("message");
const btn = document.getElementById("ButtonStart");
const statusText = document.getElementById("status");
const popSound = new Audio("freesound_community-sad-trumpet-46384.mp3");
popSound.volume = 0.5;

const WinSound = new Audio("freesound_community-woo-hoo-82843.mp3");
WinSound.volume = 0.5;

btn.addEventListener("click", () => {
  let count = 3;

  message.textContent = "Game restarting in " + count;

  const countdown = setInterval(() => {
    count--;

    message.textContent = "Game restarting in " + count;

    if (count === 0) {
      clearInterval(countdown);

      setTimeout(() => {
        window.location.href = "XO.html";
      }, 500);
    }
  }, 1000);
});




const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const Winning = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => CheckClicked(cell, index));
});

function CheckClicked(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkForResult();
  
  
  if (gameActive) {
	 setTimeout(ComTurn,500);
	}
}
 
function ComTurn() {
  if (!gameActive) return;

  currentPlayer = "O";

  // 1. Try to WIN
  let move = findBestMove("O");

  // 2. Try to BLOCK X
  if (move === null) {
    move = findBestMove("X");
  }

  // 3. Prefer center & corners
  if (move === null) {
    const preferred = [4, 0, 2, 6, 8];
    move = preferred.find(i => board[i] === "");
  }

  // 4. Random fallback
  if (move === null) {
    const empty = board
      .map((v, i) => (v === "" ? i : null))
      .filter(i => i !== null);
    move = empty[Math.floor(Math.random() * empty.length)];
  }

  board[move] = "O";
  cells[move].textContent = "O";

  checkForResult();

  if (gameActive) currentPlayer = "X";
}


function findBestMove(player) {
  for (let condition of Winning) {
    const [a, b, c] = condition;

    const values = [board[a], board[b], board[c]];

    if (
      values.filter(v => v === player).length === 2 &&
      values.includes("")
    ) {
      if (board[a] === "") return a;
      if (board[b] === "") return b;
      if (board[c] === "") return c;
    }
  }
  return null;
}


	 

function checkForResult() {
  for (let condition of Winning) {
    const [a, b, c] = condition;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      gameActive = false;

      if (currentPlayer === "X") {
        statusText.textContent = "You win ❤️ Moving on...";
		WinSound.currentTime = 0; // rewind
     WinSound.play();
        setTimeout(() => {
          window.location.href = "hearts.html";
        }, 2000);
      } else {
        statusText.textContent = "You lost 😭 Try again";
		
		popSound.currentTime = 0; // rewind
     popSound.play();
      }
      return;
    }
  }

  // switch turns
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}



const bgMusic = document.getElementById("bgMusic");


// Restore playback state
const savedTime = localStorage.getItem("musicTime");
const isPlaying = localStorage.getItem("musicPlaying");

if (savedTime) {
  bgMusic.currentTime = parseFloat(savedTime);
}

if (isPlaying === "true") {
  bgMusic.play().catch(() => {});
}

// Save time constantly
setInterval(() => {
  if (!bgMusic.paused) {
    localStorage.setItem("musicTime", bgMusic.currentTime);
    localStorage.setItem("musicPlaying", "true");
  }
}, 500);

bgMusic.volume = 0.4;
bgMusic.play();

localStorage.setItem("musicPlaying", "true");

setTimeout(() => {
  localStorage.setItem("musicTime", bgMusic.currentTime);
  
}, 100000);
