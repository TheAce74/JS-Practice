alert("This game begins automatically on page load");

window.addEventListener("load", start);

let time = 5;
let score = 0;
let isPlaying;

const input = document.querySelector("input");
const word = document.querySelector("h2");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#timeLeft");
const message = document.querySelector("main > p");
const seconds = document.querySelector("#totalTime");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
];

//initialize game
function start() {
  showWords(words);

  input.addEventListener("input", startMatch);

  setInterval(countDown, 1000);

  setInterval(checkStatus, 50);
}

function showWords(words) {
  let index = Math.floor(Math.random() * words.length);
  word.innerText = words[index];
}

function startMatch() {
  let match = (function () {
    if (input.value === word.innerText) {
      message.innerText = "Correct!!!";
      return true;
    } else {
      message.innerText = " ";
      return false;
    }
  })();
  if (match == true) {
    isPlaying = true;
    time = 6;
    showWords(words);
    input.value = "";
    score++;
  }

  if (score == -1) scoreDisplay.innerText = 0;
  else scoreDisplay.innerText = score;
}

function countDown() {
  if (time > 0) time--;
  else if (time === 0) isPlaying = false;

  timeDisplay.innerText = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerText = "Game Over!!!";
    score = -1;
  }
}
