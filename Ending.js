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