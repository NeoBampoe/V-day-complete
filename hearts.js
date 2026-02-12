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




const gameArea = document.getElementById("area");
const scoreText = document.getElementById("score");
const popSound = new Audio("sounds/Open up.mp3");
popSound.volume = 0.5;

const LooseSound = new Audio("freesound_community-wrong-47985.mp3");
LooseSound.volume = 0.5;


let score = 0;
let lives = 10;
let fallSpeed = 3.5;
let spawnRate = 1500;
let gameRunning = true;
let spawnInterval;

scoreText.textContent = "Score: 0 | Lives: 10";

// Reset game
function resetGame() {
  score = 0;
  lives = 10;
  fallSpeed = 3.5;
  spawnRate = 1500;
  gameRunning = true;

  gameArea.innerHTML = "";
  scoreText.textContent = "Score: 0 | Lives: 10";

  clearInterval(spawnInterval);
  spawnInterval = setInterval(createHeart, spawnRate);
}

function createHeart() {
  if (!gameRunning) return;

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";

  const startX = Math.random() * (window.innerWidth - 40);
  let yPos = -50;

  heart.style.left = startX + "px";
  heart.style.top = yPos + "px";

  document.body.appendChild(heart);

  const fallInterval = setInterval(() => {
    yPos += fallSpeed;
    heart.style.top = yPos + "px";

    // Missed heart → fade out
    if (yPos > window.innerHeight) {
      clearInterval(fallInterval);
      heart.classList.add("fade");

      setTimeout(() => {
        heart.remove();
        loseLife();
      }, 600);
    }
  }, 20);

  // Click heart
  heart.addEventListener("click", () => {
    clearInterval(fallInterval);
    heart.classList.add("fade");
	
	 popSound.currentTime = 0; // rewind
     popSound.play();

    setTimeout(() => {
      heart.remove();
    }, 300);

    score++;
    fallSpeed += 0.5 ;
    spawnRate = Math.max(200, spawnRate - 10);

    scoreText.textContent = `Score: ${score} | Lives: ${lives}`;

	if (score === 25) {
		
		setTimeout(()=>{
      gameRunning = false;
      clearInterval(spawnInterval);
      alert("You caught my heart ❤️");
      window.location.href = "quiz.html";
		},100);
    }
    
  });

}


// Lose life
function loseLife() {
  lives--;
  scoreText.textContent = `Score: ${score} | Lives: ${lives}`;

  if (lives === 0) {
    gameRunning = false;
    clearInterval(spawnInterval);
    
    setTimeout(() => {
		
      alert("You died 😭 Try again");
	   LooseSound.currentTime = 0; // rewind
     LooseSound.play();
      resetGame();
    }, 500);
  }
}

// Start game
spawnInterval = setInterval(createHeart, spawnRate);







