const firePixelsArray = []
const fireWidth = 10;
const fireHeight = 10;

function init() {
    createDataStructure();
    createFireSource();
    renderAnimation();
    setInterval(calculateFirePropagation, 1000);
}

function createDataStructure(){
    const numberPixels = fireWidth * fireHeight;

    
    for(let i = 0; i < numberPixels; i ++) {
        firePixelsArray[i] = 0;
    }
}

function calculateFirePropagation(){
    //It takes index of each pixel column by column and not row by row
    for(let column = 0; column < fireWidth; column ++){
        for(let row = 0; row < fireHeight; row ++){
            var pixelIndex = column + ( fireWidth * row );

            updateFireIntensityPerPixel(pixelIndex);
        }
    }

    renderAnimation();
}

function updateFireIntensityPerPixel(currentPixelIndex){
    //It calculate intensity of pixel below of currentPixelIndex
    var belowPixelIndex = currentPixelIndex + fireWidth;

    if(belowPixelIndex >= (fireWidth * fireHeight ) ){
        return
    }

    const decay = 1;
    var belowPixelFireIntensity = firePixelsArray[belowPixelIndex];

    //Block negative values
    var newFireIntensity = 
    ( belowPixelFireIntensity - decay ) >= 0 ? belowPixelFireIntensity - decay : 0;

    firePixelsArray[currentPixelIndex] = newFireIntensity;
}

function renderAnimation(){
    let html = '<table cellspacing=0 cellpadding=0>'
    for(let row = 0; row < fireHeight; row ++){
        html += '<tr>';

        for(let column = 0; column < fireWidth; column ++){
            var pixelIndex = column + (fireWidth * row);
            var fireIntensity = firePixelsArray[pixelIndex]

            html += '<td>';
            html += `<div class="pixel-index">${pixelIndex}</div>`;
            html += fireIntensity;
            html +='</td>';
        }

        html += '</tr>';
    }
    html += '</table>';

    document.querySelector('#fire-new-year').innerHTML = html;
}

function createFireSource(){
    //It begins filling the intensity of fire in the end of table

    for(let column = 0; column <= fireWidth; column ++){
        const overflowPixelIndex = fireWidth * fireHeight;
        const pixelIndex = (overflowPixelIndex - fireWidth) + column;

        firePixelsArray[pixelIndex] = 36;
    }

    /* Is possible to simplify pixelIndex equation, like this: pixelIndex = 
    fireWidth * (1 - (fireHeight) + column) */
}

init()