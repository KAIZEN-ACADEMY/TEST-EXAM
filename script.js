let examDuration = 0;
let examInterval;

function startExam() {
  const h = parseInt(document.getElementById('hours').value) || 0;
  const m = parseInt(document.getElementById('minutes').value) || 0;
  const s = parseInt(document.getElementById('seconds').value) || 0;
  examDuration = h * 3600 + m * 60 + s;

  if (examDuration <= 0) {
    alert("Please set a valid exam time.");
    return;
  }

  document.getElementById('timerInputs').style.display = "none";
  document.getElementById('startBtn').style.display = "none";

  let preCountdown = 10;
  const countdownEl = document.getElementById('countdownDisplay');
  const goodluckEl = document.getElementById('goodluckText');
  countdownEl.style.display = "block";
  goodluckEl.style.display = "block";
  countdownEl.textContent = preCountdown;

  const preInterval = setInterval(() => {
    preCountdown--;
    countdownEl.textContent = preCountdown;
    if (preCountdown < 0) {
      clearInterval(preInterval);
      countdownEl.style.display = "none";
      goodluckEl.style.display = "none";
      document.getElementById('examTimer').style.display = "block";
      document.getElementById('questionPaper').style.display = "block";
      startMainTimer();
    }
  }, 1000);
}

function startMainTimer() {
  let remaining = examDuration;
  const timerEl = document.getElementById('examTimer');

  examInterval = setInterval(() => {
    const hrs = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const mins = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    timerEl.textContent = `${hrs}:${mins}:${secs}`;
    remaining--;

    if (remaining < 0) {
      clearInterval(examInterval);
      endExam();
    }
  }, 1000);
}

function endExam() {
  document.getElementById('questionPaper').style.display = "none";
  document.getElementById('examTimer').style.display = "none";
  document.getElementById('finalScreen').style.display = "block";
}