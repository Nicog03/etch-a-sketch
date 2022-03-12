const grid = document.getElementById('grid');

let size = 16; //it's the height and width of the grid;

// create grid:
for (let a = 0; a < size * size; a++) {
    let pixel = document.createElement('div');
    pixel.classList.add('pixel');
    grid.appendChild(pixel);
}