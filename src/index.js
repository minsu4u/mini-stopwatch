// TODO: 이 곳에 정답 코드를 작성해주세요.
import Stopwatch from './stopwatch.js';

const stopwatch = new Stopwatch();

let isRunning = false;
let interval;

const $timer = document.querySelector('#timer');
const $startStopBtn = document.querySelector('#start-stop-btn');
const $startStopLabel = document.querySelector('#start-stop-btn-label');
const $lapResetBtn = document.querySelector('#lap-reset-btn');
const $lapResetLabel = document.querySelector('#lap-reset-btn-label');
const $laps = document.querySelector('#laps');

let $minLap, $maxLap;

const formatString = (num) => (num < 10 ? '0' + num : num);
const formatTime = (centisecond) => {
    let formattedString = '';
    const min = parseInt(centisecond / 6000);
    const sec = parseInt((centisecond - 6000 * min) / 100);
    const centisec = centisecond % 100;
    formattedString = `${formatString(min)}:${formatString(sec)}.${formatString(
        centisec
    )}`;
    return formattedString;
};

const updateTime = (time) => {
    $timer.innerText = formatTime(time);
};
const toggleBtnStyle = () => {
    $startStopBtn.classList.toggle('bg-red-600');
};
const colorMinMax = () => {
    $minLap.classList.add('text-green-600');
    $maxLap.classList.add('text-red-600');
};

const onClickStartStopBtn = () => {
    if (isRunning) {
        onClickStopBtn();
    } else {
        onClickStartBtn();
    }
    isRunning = !isRunning;
    toggleBtnStyle();
    $lapResetLabel.innerText = isRunning == true ? '랩' : '리셋';
    $startStopLabel.innerText = isRunning == true ? '중단' : '시작';
};

const onClickLapResetBtn = () => {
    if (isRunning) {
        onClickLapBtn();
    } else {
        onClickResetBtn();
    }
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

const onClickResetBtn = () => {
    stopwatch.reset();
    updateTime(0);
    $laps.innerHTML = '';
    $minLap = undefined;
    $maxLap = undefined;
};
const onClickLapBtn = () => {
    const [lapCount, lapTime] = stopwatch.createLap();
    const $lap = document.createElement('li');

    $lap.setAttribute('data-time', lapTime);
    $lap.classList.add('flex', 'justify-between', 'py-2', 'px-3', 'border-b-2');
    $lap.innerHTML = `
            <span>${lapCount}</span>
            <span>${formatTime(lapTime)}</span>
    `;
    $laps.prepend($lap);
    // 처음 lap을 눌렀을 때: 첫 Lap은 minLap으로 둔다.
    if ($minLap === undefined) {
        $minLap = $lap;
        return;
    }

    // 두 번째로 눌렀을 때: 첫번째 Lap이랑 비교해서 (minLap) 최소, 최대값을 결정한다.
    if ($maxLap === undefined) {
        if (lapTime < $minLap.dataset.time) {
            // 최소값 갱신
            $maxLap = $minLap;
            $minLap = $lap;
        } else {
            $maxLap = $lap;
        }
        colorMinMax();
        return;
    }

    // Lap이 3개 이상(min, max 다 존재)
    // 2. Lap 추가할 때마다 min, max 저장해둔것과 현재 추가되는 Lap을 비교해서 min, max 값을 업데이트 방법.
    if (lapTime < $minLap.dataset.time) {
        $minLap.classList.remove('text-green-600');
        $minLap = $lap;
    } else if (lapTime > $maxLap.dataset.time) {
        $maxLap.classList.remove('text-red-600');
        $maxLap = $lap;
    }
    colorMinMax();
};

const onKeyDown = (e) => {
    switch (e.code) {
        case 'KeyL':
            onClickLapResetBtn();
            break;
        case 'KeyS':
            onClickStartStopBtn();
            break;
    }
};
// 1. Lap 추가할 때마다 모든 Lap을 돌면서 (=0(n)), 최장 최단기록을 판별
// 2. Lap 추가할 때마다 min, max 저장해둔것과 현재 추가되는 Lap을 비교해서 min, max 값을 업데이트 방법.

// 1. 구현이 뭐가 더 편리?
// 2. 성능

$startStopBtn.addEventListener('click', onClickStartStopBtn);
$lapResetBtn.addEventListener('click', onClickLapResetBtn);

document.addEventListener('keydown', onKeyDown);
