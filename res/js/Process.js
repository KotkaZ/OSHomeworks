let colors = ["#54d175", "#d1a754", "#5461d1", "#d154c2", "#54d1c7",
    "#d15454", "#009445", "#947600", "#020de6", "#de02e6", "#e6db02", "#e67802", "#8f02e6"
]

//Process object that is used for storing data about incoming process. 
class Process {
    constructor(inputTime, timeLeft, nr, color) {
        this.inputTime = Number.parseInt(inputTime);
        this.timeLeft = Number.parseInt(timeLeft);
        this.timeUsed = 0; //Shows time about current burst, not total used time!
        this.totalTime = Number.parseInt(timeLeft);
        this.name = `P${nr}`;
        this.color = color;
    }

    tickOff() {
        this.timeLeft--;
        this.timeUsed++;
    }

    pauseProcess() {
        this.timeUsed = 0;
    }
}