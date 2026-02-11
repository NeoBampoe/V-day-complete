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


const quizBox = document.getElementById("quiz-box");
const message = document.getElementById("message");

const ClickSound = new Audio("Double Knock.mp3");
ClickSound.volume = 0.3;

const LooseSound = new Audio("freesound_community-wrong-47985.mp3");
LooseSound.volume = 0.3;

let currentQuestion = 0;

const questions = [
  {
    question: "What was our first date ?",
    answers: ["Gym date", "Ice cream date", "Coffee date", "The movies"],
    correct: 1
  },
  {
    question: "What did you get on our first coffee date ?",
    answers: ["Just coke", "Pepermint crisp tart", "Ice cream", "Ice coffee and muffin"],
    correct: 0
  },
  {
    question: "Name of our first child",
    answers: ["Ellie the elephant", "Shrimpy the shrimp", "Duckster the duck", "Twinkie the stick"],
    correct: 3
  },
  {
    question: "First flowers I ever got you",
    answers: ["Dark red roses", "White orchids", "White Chrysanthemum", "Lavenders","Yellow daffoldis","White jasmines"],
    correct: 2
  },
  {
    question: "Who loves the other more?",
    answers: ["You", "❤❤Me❤❤", "The answer is number 2", "We both know the answer is number 2","Hint : It's not you","Pick 2","It's shocking how you havn't chosen 2 yet"],
    correct: 1
  }
];

function loadQuestion() {
  quizBox.innerHTML = "";

  const q = questions[currentQuestion];

  const title = document.createElement("h2");
  title.textContent = q.question;
  quizBox.appendChild(title);

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;

    btn.addEventListener("click", () => checkAnswer(index));
    quizBox.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].correct) {
    currentQuestion++;
	ClickSound.currentTime = 0; // rewind
     ClickSound.play();

    if (currentQuestion === questions.length) {
      message.textContent = "Perfect score 💕";
      setTimeout(() => {
        window.location.href = "final.html";
      }, 1500);
    } else {
      loadQuestion();
    }
  } else {
	   LooseSound.currentTime = 0; // rewind
     LooseSound.play();
    message.textContent = "Wrong 😝 Try again!";
    setTimeout(() => {
      currentQuestion = 0;
      message.textContent = "";
      loadQuestion();
    }, 1500);
  }
}

loadQuestion();




