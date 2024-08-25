

const sentences =
  `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`
  ;
const sentences1 =
  `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`.split(/\s+/)
  ;
const btn = document.getElementById("start-btn");
const input = document.getElementById("input");
const para = document.getElementById("sentence");
const timerElement = document.getElementById("timer");
const result = document.getElementById("result");
const speed = document.getElementById("speed");
const retrybtn = document.getElementById("retry-btn");
const accuracy = document.getElementById("accuracy");


let timer = 10;
let initialTimer = timer;
const start = () => {
  input.disabled = false;
  para.textContent = sentences;
  btn.disabled = true;
  countdown();

}
const restart = () => {
  result.style.display = "none";
  input.value = "";
  timer = initialTimer;
  timerElement.textContent = `00:${timer}`
  btn.disabled = false;
  start()
}
const countdown = () => {
  timer--;
  let seconds = timer;

  if (timer < 10) {
    seconds = "0" + timer
  }
  timerElement.textContent = `00:${seconds}`;
  if (timer > 0) {
    setTimeout(countdown, 1000)
  } else {
    finishTest()
  }
};

const finishTest = () => {
  result.style.display = "block";
  input.disabled = true;
  btn.disabled = true;
  const userInput = input.value.trim().split(/\s+/);
  const wordsTyped = userInput.filter(word => word.length > 0);
  speed.innerHTML = `${calculateSpeed(wordsTyped)}`;
  accuracy.innerHTML = `${calculateAccuracy(userInput)}%`
  retrybtn.disabled = false;

}

const calculateSpeed = (words) => {
  let correctWords = 0

  words.forEach((word, index) => {
    if (sentences1[index] === word) {
      correctWords++
    }
  })
  const wordsPerMin = (correctWords / initialTimer) * 60;
  return wordsPerMin;
}

const calculateAccuracy = (userInput) => {
  let correctChars = 0
  let totalChars = sentences1.join(' ').replace(/\s+/, '').length;

  for (let i = 0; i < userInput.join('').length; i++) {
    if (userInput.join('')[i] === sentences1.join('')[i]) {
      correctChars++;
    }
  }
  const accuracyPercent = (correctChars / totalChars) * 100;
  return accuracyPercent.toFixed(2);
}


btn.addEventListener("click", start);
retrybtn.addEventListener("click", restart);