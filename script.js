const grid = document.getElementById('grid');

let size = 16; //it's the height and width of the grid;

let mouseDown = false;
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

// create grid:
for (let a = 0; a < size * size; a++) {
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
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