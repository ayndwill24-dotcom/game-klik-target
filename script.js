const target = document.getElementById("target");
const startBtn = document.getElementById("startBtn");
const arena = document.getElementById("arena");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const statusEl = document.getElementById("status");

let score = 0;
let timeLeft = 15;
let timer = null;
let playing = false;

bestEl.textContent = localStorage.getItem("bestScore") || "0";

function moveTarget() {
  const maxX = arena.clientWidth - 64;
  const maxY = arena.clientHeight - 64;

  const x = Math.floor(Math.random() * Math.max(maxX, 1));
  const y = Math.floor(Math.random() * Math.max(maxY, 1));

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function startGame() {
  score = 0;
  timeLeft = 15;
  playing = true;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  statusEl.textContent = "Ketuk target sebanyak mungkin!";
  startBtn.textContent = "Main Lagi";
  target.hidden = false;

  moveTarget();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  playing = false;
  clearInterval(timer);
  target.hidden = true;

  const currentBest = Number(localStorage.getItem("bestScore") || 0);

  if (score > currentBest) {
    localStorage.setItem("bestScore", score);
    bestEl.textContent = score;
    statusEl.textContent = `Waktu habis! Rekor baru: ${score}`;
  } else {
    bestEl.textContent = currentBest;
    statusEl.textContent = `Waktu habis! Skor kamu: ${score}`;
  }
}

startBtn.addEventListener("click", startGame);

target.addEventListener("pointerdown", () => {
  if (!playing) return;

  score++;
  scoreEl.textContent = score;
  moveTarget();
});
