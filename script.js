let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapTimes = [];

const timeDisplay = document.getElementById("timeDisplay");
const startPauseButton = document.getElementById("startPauseButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapList = document.getElementById("lapList");

function updateTimeDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimeDisplay();
    }, 1000);
}

function stopStopwatch() {
    clearInterval(timerInterval);
}

function toggleStartPause() {
    if (isRunning) {
        stopStopwatch();
        startPauseButton.textContent = "Start";
    } else {
        startStopwatch();
        startPauseButton.textContent = "Pause";
    }
    isRunning = !isRunning;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateTimeDisplay();
    startPauseButton.textContent = "Start";
    isRunning = false;
    lapTimes = [];
    lapList.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        const lapTime = `${hours}:${minutes}:${seconds}`;

        lapTimes.push(lapTime);

        const li = document.createElement("li");
        li.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapList.appendChild(li);
    }
}
