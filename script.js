const sketchContainer = document.querySelector('.sketchContainer');
const sizeOptions = [];
let sketchpadSize;
let colorSelected = 'black';
let shaderSelected = false;
let randomSelected = false;
let eraseSelected = false;

function buildSketchpad(size) {
    // stores selected size for use by other functions
    sketchpadSize = size;
    // clears out all divs from previous build
    if (sketchContainer.hasChildNodes()) {
        const previousSketch = Array.from(sketchContainer.childNodes);
        previousSketch.forEach((child) => {
            sketchContainer.removeChild(child);
        });
    }
    
    // creates new sketchpad and adds mouseover listener
    let divSize = String((500 / size) + "px");
    for (let i = 0; i < (Math.pow(size, 2) * 1.5); i++) {
        const sketchDiv = document.createElement('div');
        sketchDiv.style.width = divSize;
        sketchDiv.style.height = divSize;
        sketchDiv.addEventListener('mouseover', colorIn);
        sketchDiv.addEventListener('mousedown', colorIn);
        sketchContainer.appendChild(sketchDiv);
    }
}

// for use in click & drag functionality
let mouseDown = false;
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

function colorIn (toColor) {
    // checks if clicking while dragging
    if (!mouseDown && toColor.type === 'mouseover') return;
    // increments opacity of div by 0.1 if shader enabled
    if (shaderSelected) {
        let currentShade = +(toColor.target.style.opacity);
        toColor.target.style.opacity = (currentShade + 0.1);
    } else {
        toColor.target.style.opacity = "1";
    }
    // creates randomized hex color value
    if (eraseSelected) {
        toColor.target.style.backgroundColor = "#ffffff";
    } else if (randomSelected) {
        let randomColor = "#" + (Math.floor(Math.random()
            * 16777215).toString(16));
        toColor.target.style.backgroundColor = randomColor;
    } else {
        toColor.target.style.backgroundColor = colorSelected;
    }
}

// tracks & updates color input
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => 
    colorSelected = colorPicker.value);

// slider to select sketchpad size
const sizeSlider = document.getElementById('sizeSelectSlider');
sizeSlider.addEventListener('click', () => 
    buildSketchpad(sizeOptions[sizeSlider.value]));

// button to rebuild sketchpad based on last size selected
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => 
    buildSketchpad(sketchpadSize));

// toggles for various options
const shaderToggle = document.getElementById('shaderToggle');
shaderToggle.addEventListener('click', () =>
    (shaderSelected = !shaderSelected));

const randomToggle = document.getElementById('randomToggle');
randomToggle.addEventListener('click', () =>
    (randomSelected = !randomSelected));

const eraseToggle = document.getElementById('eraseToggle');
eraseToggle.addEventListener('click', () =>
    (eraseSelected = !eraseSelected));

// functions to find suitable size options
// sizes with too many decimals can break formatting
for (let i = 2; i < 500; i++) {
    if (countDecimals(i) <= 4 && i <= 100) {
        sizeOptions.push(i);
    }
}

function countDecimals(inputNum) {
    inputNum = 500 / inputNum;
    if (Math.floor(inputNum) === inputNum) return 0;
    return inputNum.toString().split(".")[1].length;
}

// builds default size for page load
buildSketchpad(16);