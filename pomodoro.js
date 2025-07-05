let pomodoroTime = 25 * 60;
let timer = null;
let startPomodoro = true;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;
let cycle = 1;

const timeDisplay = document.getElementById("time");
const startPause = document.getElementById("start-pause");
const resetButton = document.getElementById("reset-timer");
const cycleDisplay = document.getElementById("cycle-view");

startPause.addEventListener("click", function() {
    if (startPomodoro === true && startPause.value === "START") {
        pomodoroStart();
    }
    else if (startPomodoro === false && startPause.value === "PAUSE") {
        clearInterval(timer);
        cycleDisplay.innerText = "Let's Study Again!";
        startPause.value = "START";
        startPomodoro = true;
        startPause.style.backgroundColor = "#5C7E8F";
    }
})
resetButton.addEventListener("click", function() {
    clearInterval(timer);
    pomodoroTime = 25 * 60;
    shortBreak = 5 * 60;
    longBreak = 15 * 60;
    cycle = 1;
    timeCountdown();
    timer = null;
    startPause.value = "START";
    startPomodoro = true;
    cycleDisplay.innerText = "Time to Study!";
    startPause.style.backgroundColor = "#5C7E8F";
})

function pomodoroStart() {
    startPause.value = "PAUSE";
    startPomodoro = false;

    startPause.style.backgroundColor = "#ab1a03";

    timer = setInterval(function() {
        if (pomodoroTime > 0 ) {
            cycleDisplay.innerText = "Time to Study!";
            pomodoroTime--;
            timeCountdown();
        }
        if (pomodoroTime === 0) {
            clearInterval(timer);
            cycles();
        }

    }, 1000)
}

function cycles() {
    clearInterval(timer);

    if (cycle <= 4) {
        cycleDisplay.innerText = "Short Break!";
        
        timer = setInterval(function() {

            let minutes = Math.floor(shortBreak / 60);
            let seconds = shortBreak % 60;
        
            let formattedMinutes = minutes.toString().padStart(2, '0');
            let formattedSeconds = seconds.toString().padStart(2, '0');
        
            timeDisplay.innerText = formattedMinutes + ":" + formattedSeconds;

            if (shortBreak === 0) {
                clearInterval(timer);
                pomodoroTime = 25 * 60;
                shortBreak = 5 * 60;
                cycle++;
                startPause.value = "START";
                startPomodoro = true;
                cycleDisplay.innerText = "Time to Study!";
                pomodoroStart();
            }
            else {
                shortBreak--;
            }
        }, 1000)
    }
    else if (cycle===5) {
        cycleDisplay.innerText = "4 Pomocuses Done!";

        timer = setInterval(function() {
            let minutes = Math.floor(longBreak / 60);
            let seconds = longBreak % 60;
            
            let formattedMinutes = minutes.toString().padStart(2, '0');
            let formattedSeconds = seconds.toString().padStart(2, '0');
            
            timeDisplay.innerText = formattedMinutes + ":" + formattedSeconds;
            if (longBreak === 0) {
                clearInterval(timer);
                cycle = 1;
                pomodoroTime = 25 * 60;
                longBreak = 15 * 60;
                startPause.value = "START";
                cycleDisplay.innerText = "You finished a Pomocus!";
                startPause.style.backgroundColor = "#5C7E8F";
                startPomodoro = true;
                timeCountdown();
            }
            else {
                longBreak--;
            }
        }, 1000)
    }
}

function timeCountdown() {
    let minutes = Math.floor(pomodoroTime / 60);
    let seconds = pomodoroTime % 60;

    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');

    timeDisplay.innerText = formattedMinutes + ":" + formattedSeconds;
}
