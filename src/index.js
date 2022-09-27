// TODO: 이 곳에 정답 코드를 작성해주세요.
import Stopwatch from './stopwatch.js';

const stopwatch = new Stopwatch();

const $timer = document.querySelector('#timer');
const $startStopBtn = document.querySelector('#start-stop-btn');
const $startStopLabel = document.querySelector('#start-stop-btn-label');
// const $lapResetBtn = document.querySelector('#lap-reset-btn');
const $lapResetLabel = document.querySelector('#lap-reset-btn-label');

let isRunning = false;
let interval;

const updateTime = (time) => {
    $timer.innerText = time;
};
const toggleBtnStyle = () => {
    $startStopBtn.classList.toggle('bg-red-600');
};
console.log(isRunning);
const onClickStartStopBtn = () => {
    if (isRunning) {
        onClickStopBtn();
    } else {
        onClickStartBtn();
    }
    isRunning = !isRunning;
    toggleBtnStyle();
    $lapResetLabel.innerText = isRunning == true ? '리셋' : '랩';
    $startStopLabel.innerText = isRunning == true ? '중단' : '시작';
};

const onClickStartBtn = () => {
    stopwatch.start();
    interval = setInterval(() => {
        updateTime(stopwatch._centisecond);
    }, 10);
};

const onClickStopBtn = () => {
    stopwatch.pause();
    clearInterval(interval);
};

$startStopBtn.addEventListener('click', onClickStartStopBtn);
