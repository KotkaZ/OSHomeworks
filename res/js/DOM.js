const firstRadio = document.querySelector('#first')
const secondRadio = document.querySelector('#second')
const thirdRadio = document.querySelector('#third')
const customRadio = document.querySelector('#custom')

const firstValue = document.querySelector('#firstValue')
const secondValue = document.querySelector('#secondValue')
const thirdValue = document.querySelector('#thirdValue')
const customValue = document.querySelector('#customValue')

const fcfsButton = document.querySelector('#fcfsButton')
const srtfButton = document.querySelector('#srtfButton')
const rr3Button = document.querySelector('#rr3Button')
const x2fcfsButton = document.querySelector('#x2fcfsButton')
const clearOutput = document.querySelector('#clearOutput')

const box = document.querySelector("#box");
const averageTime = document.querySelector("#averageTime");

fcfsButton.addEventListener("click", fcfsClick);
srtfButton.addEventListener("click", srtfClick);
rr3Button.addEventListener("click", rr3Click);
x2fcfsButton.addEventListener("click", x2fcfsClick);
clearOutput.addEventListener("click", clearClick);

//Shows process on a timeline. 
function addBox(process, timeSpacer, step) {
    const boxy = document.createElement("div");

    boxy.innerHTML = `<p>${process.name}</p>`;
    boxy.style.marginLeft = `${timeSpacer * stepSize}px`;
    boxy.style.width = `${(stepSize * process.timeUsed)-2}px`;
    boxy.style.backgroundColor = process.color;

    boxy.classList.add("boxy");
    boxy.classList.add("box");

    const timeLabel = document.createElement("p");
    timeLabel.innerText = step;
    timeLabel.style.marginLeft = "-5px";
    timeLabel.style.marginTop = "55px";
    timeLabel.classList.add("timeLabel");

    if (timeSpacer > 0) {
        const _timeLabel = timeLabel.cloneNode();
        _timeLabel.innerText = step - process.timeUsed;
        _timeLabel.style.marginLeft = `${timeSpacer * stepSize}px`;
        box.appendChild(_timeLabel);
    }


    box.appendChild(boxy);
    box.appendChild(timeLabel);

}

//Shows zero at the beginning of timeline.
function showZero() {
    const timeLabel = document.createElement("p");
    timeLabel.innerText = 0;
    timeLabel.style.marginLeft = "-4px";
    timeLabel.style.marginTop = "55px";
    timeLabel.classList.add("timeLabel");
    box.appendChild(timeLabel);
}


function showAvgTime(text) {
    averageTime.innerText = text;
}