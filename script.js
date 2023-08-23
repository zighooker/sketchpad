const sketchContainer = document.querySelector('.sketchContainer');

function buildSketchpad(size) {
    let divSize = String(Math.floor(500 / Math.sqrt(size))) + "px";

    for (let i = 0; i < size; i++) {
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

buildSketchpad(16);