const sketchContainer = document.querySelector('.sketchContainer');

function buildSketchpad(size) {
    // clears out previous sketchpad
    if (sketchContainer.hasChildNodes()) {
        const previousSketch = Array.from(sketchContainer.childNodes);
        previousSketch.forEach((child) => {
            sketchContainer.removeChild(child);
        });
    }
    
    // creates new sketchpad
    let divSize = String((512 / size) + "px");
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const sketchDiv = document.createElement('div');
        sketchDiv.style.width = divSize;
        sketchDiv.style.height = divSize;
        sketchDiv.addEventListener('mouseover', colorIn());
        sketchDiv.classList.add('sketchHover');
        sketchContainer.appendChild(sketchDiv);
    }
}

function colorIn () {

}

// buttons to select sketchpad size
const selectButtons = Array.from(document.getElementsByClassName('sizeSelectButton'));
selectButtons.forEach((button) => {
    button.addEventListener('click', () => buildSketchpad(button.id));
});

buildSketchpad(16);