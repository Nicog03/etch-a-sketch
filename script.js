const grid = document.getElementById('grid');

let size = 16; //it's the height and width of the grid;

let mouseDown = false;
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

// create grid:
for (let a = 0; a < size * size; a++) {
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.setAttribute('draggable', false);
    pixel.addEventListener('mousedown', paintPixelOnClick);
    pixel.addEventListener('mouseover', paintPixel);
    grid.appendChild(pixel);
}

function paintPixelOnClick() {
    this.style.background = 'black';
}

function paintPixel(e) {
    if (e.type == 'mouseover' && mouseDown) {
        this.style.background = 'black';
    }
}

//=============================================================================
//==============================ERASER SECTION=================================
//=============================================================================

let eraserButton = document.getElementById('eraser-button')

eraserButtonIsActive = false;

eraserButton.addEventListener('click', activateEraser)

function activateEraser() {
    if (!eraserButtonIsActive) {
        eraserButtonIsActive = true;
        eraserButton.classList.add('selected');

        let pixels = document.querySelectorAll('.pixel')
        pixels.forEach(pixel => pixel.addEventListener('mousedown', eraseOnClick));
        pixels.forEach(pixel => pixel.addEventListener('mouseover', erase));
    } else if (eraserButtonIsActive) {
        eraserButtonIsActive = false;
        eraserButton.classList.remove('selected');

        let pixels = document.querySelectorAll('.pixel')
        pixels.forEach(pixel => pixel.removeEventListener('mousedown', eraseOnClick));
        pixels.forEach(pixel => pixel.removeEventListener('mouseover', erase));
    }
}

function eraseOnClick() {
    this.style.background = '#e6e6e6';
}
function erase(e) {
    if (e.type == 'mouseover' && mouseDown) {
        this.style.background = '#e6e6e6';
    }
}
