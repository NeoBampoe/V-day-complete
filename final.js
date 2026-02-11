const bgMusic = document.getElementById("bgMusic");

const NopeSound = new Audio("freesound_community-wrong-47985.mp3");
NopeSound.volume = 0.5;


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



const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const yesBtn2 = document.getElementById("yesBtn2");
const message = document.getElementById("message");

const messages = [
  "What you doing ?????",
  "Don’t do that twin",
  "Did you mean to go to the other buttons",
  "It's fine twin,everyone makes mistakes",
  "Aight ,last chance,try again",
  "I was lying ,but dont pick no",
  "You play too much",
  "Charissa Naidoo that's not very cool of you",
  "You funny, now answer for real",
  "Bruhhhh",
  "You want me to cry, because I will don't test me",
  "Neo not happy",
  "You tryna make some typa joke or something?",
  "Jokes are meant to be funny",
  "This is not very funny"];

let msgIndex = 0;

// Move NO button
noBtn.addEventListener("click", () => {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);

NopeSound.currentTime = 0; // rewind
     NopeSound.play();

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  message.textContent = messages[msgIndex % messages.length];
  msgIndex++;
});

// YES button
function acceptLove() {
  document.body.innerHTML = `
    <div style="text-align:center;">
      <h1>YAYYYYY 💖💖💖</h1>
      <p>You just made me the happiest person alive 😘</p>
      <p>Happy Valentine’s Day ❤️</p>
    </div>
  `;
  window.location.href = "Ending.html";
}

yesBtn.addEventListener("click", acceptLove);
yesBtn2.addEventListener("click", acceptLove);
