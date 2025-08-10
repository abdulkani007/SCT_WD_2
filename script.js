let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapList = document.getElementById("laps");

startBtn.onclick = () => {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 100);
    running = true;
  }
};

pauseBtn.onclick = () => {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00";
  lapList.innerHTML = "";
};

lapBtn.onclick = () => {
  if (running) {
    const lapTime = display.innerHTML;
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.length + 1}: ${lapTime}`;
    lapList.appendChild(li);
    laps.push(lapTime);
  }
};

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  const time = new Date(updatedTime);
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  const seconds = String(time.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
  display.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
}
