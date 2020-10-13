let boxData = box.getBoundingClientRect();
let stepSize;
let totalTime;
let timer = null;

//Finds total time, that is used by all processes. 
function calculateTotalTime(_processes) {
    let length = 0;
    for (const process of _processes) {
        if (process.inputTime > length)
            length += process.inputTime - length;
        length += process.timeLeft;
    }
    return length;
}


//Returns sorted processes array
function readProcesses(inputString) {
    let processesAsString = inputString.split(";");
    let processes = []

    for (let index = 0; index < processesAsString.length; index++) {
        let details = processesAsString[index].split(",")
        let newProcess = new Process(details[0], details[1], index + 1, colors[index])
        processes.push(newProcess)
    }

    processes.sort((p1, p2) => p1.inputTime - p2.inputTime)

    totalTime = calculateTotalTime(processes);
    stepSize = (boxData.width - 2) / totalTime;

    return processes
}

//Checks whatever input option user has selected. 
function readUserInput() {
    if (firstRadio.checked) return firstValue.innerText;
    else if (secondRadio.checked) return secondValue.innerText;
    else if (thirdRadio.checked) return thirdValue.innerText;
    else if (customRadio.checked) return customValue.value;
}

//For animation purpose only.
function sleep(ms) {
    return new Promise(resolve => timer = setTimeout(resolve, ms));
}


//Functions for buttons clicks. 
function fcfsClick() {
    clearClick()
    showZero();
    algorithmFCFS(readProcesses(readUserInput()))
}

function srtfClick() {
    clearClick()
    showZero();
    algorithmSRTF(readProcesses(readUserInput()))
}

function rr3Click() {
    clearClick()
    showZero();
    algorithmRR3(readProcesses(readUserInput()))
}

function x2fcfsClick() {
    clearClick()
    showZero();
    algorithm2xFCFS(readProcesses(readUserInput()))
}

//Clears output.
function clearClick() {
    boxData = box.getBoundingClientRect();
    clearTimeout(timer);
    while (box.firstChild) {
        box.removeChild(box.lastChild);
    }
    averageTime.innerText = "-";
}