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
    this.style.background = color;
}

function paintPixel(e) {
    if (e.type == 'mouseover' && mouseDown) {
        this.style.background = color;
    }
}

//=============================================================================
//==============================COLOR SELECT SECTION===========================
//=============================================================================

let color = '#2e2e2e'
let colorSelect = document.getElementById('color-select')

colorSelect.onchange = () => color = colorSelect.value;

//=============================================================================
//==============================ERASER SECTION=================================
//=============================================================================

let eraserButton = document.getElementById('eraser-button')

eraserButtonIsActive = false;

eraserButton.addEventListener('click', activateEraser)

function activateEraser() {
    if (!eraserButtonIsActive) {
        rainbowButtonIsActive = false;
        if (colorPickerIsActive) {
            colorPickerIsActive = false;
            colorPickerButton.classList.remove('selected');

            let pixels = document.querySelectorAll('.pixel');
            pixels.forEach(pixel => pixel.removeEventListener('mousedown', colorPicker))
        }
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

//=============================================================================
//==============================RAINBOW SECTION================================
//=============================================================================

let rainbowButton = document.getElementById('rainbow-button');
let rainbowButtonIsActive = false

rainbowButton.addEventListener('mousedown', activateRainbow);

function activateRainbow() {
    if (!rainbowButtonIsActive && !eraserButtonIsActive) {
        rainbowButtonIsActive = true;
        rainbowButton.classList.add('selected');
        
        let pixels = document.querySelectorAll('.pixel')

        pixels.forEach(pixel => pixel.removeEventListener('mousedown', paintPixelOnClick));
        pixels.forEach(pixel => pixel.removeEventListener('mouseover', paintPixel));

        pixels.forEach(pixel => pixel.addEventListener('mouseover', rainbow));
        pixels.forEach(pixel => pixel.addEventListener('mousedown', rainbowOnClick));

    } else if (rainbowButtonIsActive) {
        rainbowButtonIsActive = false;
        rainbowButton.classList.remove('selected');

        let pixels = document.querySelectorAll('.pixel');
        
        pixels.forEach(pixel => pixel.removeEventListener('mouseover', rainbow));
        pixels.forEach(pixel => pixel.removeEventListener('mousedown', rainbowOnClick));

        pixels.forEach(pixel => pixel.addEventListener('mousedown', paintPixelOnClick));
        pixels.forEach(pixel => pixel.addEventListener('mouseover', paintPixel));

    }
}

function rainbow(e) {
    if (e.type = 'mouseover' && mouseDown) {
        let random1 = Math.floor((Math.random() * 255) + 1);
        let random2 = Math.floor((Math.random() * 255) + 1);
        let random3 = Math.floor((Math.random() * 255) + 1);
        this.style.background = `rgb(${random1}, ${random2}, ${random3})`;
    }
}

function rainbowOnClick() {
    let random1 = Math.floor((Math.random() * 255) + 1);
    let random2 = Math.floor((Math.random() * 255) + 1);
    let random3 = Math.floor((Math.random() * 255) + 1);
    this.style.background = `rgb(${random1}, ${random2}, ${random3})`;
}

//=============================================================================
//=========================COLOR PICKER SECTION================================
//=============================================================================

let colorPickerButton = document.getElementById('color-picker-button');
let colorPickerIsActive = false;

colorPickerButton.addEventListener('click', activateColorPicker)

function activateColorPicker() {
    if (!colorPickerIsActive) {
        if (eraserButtonIsActive) {
            eraserButtonIsActive = false
            
            eraserButton.classList.remove('selected');

            let pixels = document.querySelectorAll('.pixel');
            pixels.forEach(pixel => pixel.removeEventListener('mousedown', eraseOnClick));
            pixels.forEach(pixel => pixel.removeEventListener('mouseover', erase));
        }
        colorPickerIsActive = true;
        colorPickerButton.classList.add('selected');

        let pixels = document.querySelectorAll('.pixel');

        pixels.forEach(pixel => pixel.removeEventListener('mousedown', paintPixelOnClick));
        pixels.forEach(pixel => pixel.removeEventListener('mouseover', paintPixel));

        pixels.forEach(pixel => pixel.removeEventListener('mouseover', rainbow));
        pixels.forEach(pixel => pixel.removeEventListener('mousedown', rainbowOnClick));

        pixels.forEach(pixel => pixel.addEventListener('mousedown', colorPicker))
    } else if (colorPickerIsActive) {
        if (rainbowButtonIsActive) {
            let pixels = document.querySelectorAll('.pixel');
            pixels.forEach(pixel => pixel.addEventListener('mouseover', rainbow));
            pixels.forEach(pixel => pixel.addEventListener('mousedown', rainbowOnClick));
        }
        colorPickerIsActive = false;
        colorPickerButton.classList.remove('selected')

        let pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => pixel.removeEventListener('mousedown', colorPicker))
    }
}

function colorPicker() {
    color = this.style.background;
    colorPickerButton.classList.remove('selected')

    let pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => pixel.addEventListener('mousedown', paintPixelOnClick));
    pixels.forEach(pixel => pixel.addEventListener('mouseover', paintPixel));

    pixels.forEach(pixel => pixel.removeEventListener('mousedown', colorPicker))

    if (rainbowButtonIsActive) {
        rainbowButtonIsActive = false;
        rainbowButton.classList.remove('selected');

        let pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => pixel.removeEventListener('mouseover', rainbow));
        pixels.forEach(pixel => pixel.removeEventListener('mousedown', rainbowOnClick));
    }
}

//=============================================================================
//==============================CLEAR SECTION==================================
//=============================================================================

let clearButton = document.getElementById('clear-button');

clearButton.onclick = () => {
    let pixels = document.querySelectorAll('.pixel')
    pixels.forEach(pixel => pixel.style.background = '#e6e6e6')
}

