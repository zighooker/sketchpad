const sketchContainer = document.querySelector('.sketchContainer');
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
        sketchDiv.addEventListener('mouseover', () => {
            colorIn(sketchDiv);
        });
        sketchContainer.appendChild(sketchDiv);
    }
}

function colorIn (toColor) {
    // increments opacity of div by 0.1 if shader enabled
    if (shaderSelected) {
        let currentShade = +(toColor.style.opacity);
        toColor.style.opacity = (currentShade + 0.1);
    } else {
        toColor.style.opacity = "1";
    }
    // creates randomized hex color value
    if (eraseSelected) {
        toColor.style.backgroundColor = "#ffffff";
    } else if (randomSelected) {
        let randomColor = "#" + (Math.floor(Math.random()
            * 16777215).toString(16));
        toColor.style.backgroundColor = randomColor;
    } else {
        toColor.style.backgroundColor = colorSelected;
    }
}

// tracks & updates color input
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => 
    colorSelected = colorPicker.value);

// slider to select sketchpad size
const sizeSlider = document.getElementById('sizeSelectSlider');
sizeSlider.addEventListener('click', () => 
    buildSketchpad(sizeSlider.value));

// button to rebuild sketchpad based on last size selected
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => 
    buildSketchpad(sketchpadSize));

const shaderToggle = document.getElementById('shaderToggle');
shaderToggle.addEventListener('click', () =>
    (shaderSelected = !shaderSelected));

const randomToggle = document.getElementById('randomToggle');
randomToggle.addEventListener('click', () =>
    (randomSelected = !randomSelected));

const eraseToggle = document.getElementById('eraseToggle');
eraseToggle.addEventListener('click', () =>
    (eraseSelected = !eraseSelected));

    
// builds default size for page load
buildSketchpad(16);