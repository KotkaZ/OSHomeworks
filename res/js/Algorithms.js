async function algorithmFCFS(processes) {

    let index = 0
    let currentProcess = null;
    let spacer = 0;
    let totalWaitTime = 0;

    const stackedProcesses = [];

    for (let step = 0; step <= totalTime; step++) {
        await sleep(100);

        totalWaitTime += stackedProcesses.length;

        if (currentProcess !== null && currentProcess.timeLeft > 0)
            currentProcess.tickOff();

        if (currentProcess !== null && currentProcess.timeLeft === 0) {
            addBox(currentProcess, spacer, step);
            currentProcess = null;
            spacer = 0;
        }

        if (index < processes.length && processes[index].inputTime <= step)
            stackedProcesses.push(processes[index++]);

        if (currentProcess === null && stackedProcesses.length > 0)
            currentProcess = stackedProcesses.shift();

        if (currentProcess == null) spacer++;
    }

    showAvgTime(`FCFS: Keskmine ooteaeg: ~${Math.round((totalWaitTime / processes.length + Number.EPSILON) * 100) / 100}`)
}




async function algorithmSRTF(processes) {

    let index = 0
    let currentProcess = null;
    let spacer = 0;
    let totalWaitTime = 0;

    const stackedProcesses = [];

    for (let step = 0; step <= totalTime; step++) {
        await sleep(100);

        totalWaitTime += stackedProcesses.length;

        if (currentProcess !== null && currentProcess.timeLeft > 0)
            currentProcess.tickOff();

        if (currentProcess !== null && currentProcess.timeLeft === 0) {
            addBox(currentProcess, spacer, step);
            currentProcess = null;
            spacer = 0;
        }

        if (currentProcess === null && stackedProcesses.length > 0) {
            let bestIndex = 0;

            for (let i = 0; i < stackedProcesses.length; i++)
                if (stackedProcesses[bestIndex].timeLeft > stackedProcesses[i].timeLeft)
                    bestIndex = i;

            currentProcess = stackedProcesses.splice(bestIndex, 1)[0];
        }

        if (index < processes.length && processes[index].inputTime <= step) {
            if (currentProcess === null || currentProcess.timeLeft > processes[index].timeLeft) {
                if (currentProcess !== null) {
                    stackedProcesses.push(currentProcess);

                    if (currentProcess.timeUsed > 0)
                        addBox(currentProcess, spacer, step);
                    currentProcess.pauseProcess();
                    spacer = 0;
                }

                currentProcess = processes[index++];
            } else {
                stackedProcesses.push(processes[index++]);
            }
        }

        if (currentProcess == null) spacer++;
    }

    showAvgTime(`SRTF: Keskmine ooteaeg: ~${Math.round((totalWaitTime / processes.length + Number.EPSILON) * 100) / 100}`)
}







async function algorithmRR3(processes) {

    let index = 0
    let currentProcess = null;
    let spacer = 0;
    let totalWaitTime = 0;

    const stackedProcesses = [];

    for (let step = 0; step <= totalTime; step++) {
        await sleep(100);

        totalWaitTime += stackedProcesses.length;

        if (currentProcess !== null && currentProcess.timeLeft > 0)
            currentProcess.tickOff();


        if (currentProcess !== null && (currentProcess.timeLeft === 0 || currentProcess.timeUsed === 3)) {
            addBox(currentProcess, spacer, step);
            currentProcess.pauseProcess();

            if (currentProcess.timeLeft > 0) stackedProcesses.push(currentProcess);

            currentProcess = null
            spacer = 0;
        }

        if (index < processes.length && processes[index].inputTime <= step)
            stackedProcesses.push(processes[index++]);


        if (currentProcess === null && stackedProcesses.length > 0) {
            let bestIndex = 0;
            for (let i = 1; i < stackedProcesses.length; i++) {
                if (stackedProcesses[i].timeLeft === stackedProcesses[i].totalTime &&
                    (stackedProcesses[i].inputTime < stackedProcesses[bestIndex].inputTime ||
                        stackedProcesses[bestIndex].timeLeft < stackedProcesses[bestIndex].totalTime)) {
                    bestIndex = i;
                }
            }
            currentProcess = stackedProcesses.splice(bestIndex, 1)[0];
        }

        if (currentProcess == null) spacer++;

    }

    showAvgTime(`RR3: Keskmine ooteaeg: ~${Math.round((totalWaitTime / processes.length + Number.EPSILON) * 100) / 100}`)
}


async function algorithm2xFCFS(processes) {

    let index = 0
    let currentProcess = null;
    let spacer = 0;
    let totalWaitTime = 0;

    const lowPriorityQueue = [];
    const highPriorityQueue = [];

    for (let step = 0; step <= totalTime; step++) {
        await sleep(100);

        totalWaitTime += lowPriorityQueue.length + highPriorityQueue.length;

        if (currentProcess !== null && currentProcess.timeLeft > 0)
            currentProcess.tickOff();

        if (currentProcess !== null && currentProcess.timeLeft === 0) {
            addBox(currentProcess, spacer, step);
            currentProcess = null;
            spacer = 0;
        }

        if (index < processes.length && processes[index].inputTime <= step) {
            if (processes[index].totalTime > 6) lowPriorityQueue.push(processes[index++]);
            else {
                if (currentProcess !== null && currentProcess.totalTime > 6) {
                    addBox(currentProcess, spacer, step);
                    currentProcess.pauseProcess();
                    lowPriorityQueue.push(currentProcess);
                    currentProcess = null;
                    spacer = 0;
                    currentProcess = processes[index++];
                } else highPriorityQueue.push(processes[index++]);
            }
        }

        if (currentProcess === null && highPriorityQueue.length > 0)
            currentProcess = highPriorityQueue.shift();

        if (currentProcess === null && lowPriorityQueue.length > 0)
            currentProcess = lowPriorityQueue.shift();

        if (currentProcess == null) spacer++;
    }

    showAvgTime(`2xFCFS: Keskmine ooteaeg: ~${Math.round((totalWaitTime / processes.length + Number.EPSILON) * 100) / 100}`)
}