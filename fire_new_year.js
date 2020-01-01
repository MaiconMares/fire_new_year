const firePixelsArray = []
const fireWidth = 40;
const fireHeight = 40;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function init() {
    createDataStructure();
    createFireSource();
    renderAnimation();
    setInterval(calculateFirePropagation, 50);
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
    const debug = false;
    let html = '<table cellspacing=0 cellpadding=0>'
    for(let row = 0; row < fireHeight; row ++){
        html += '<tr>';

        for(let column = 0; column < fireWidth; column ++){
            var pixelIndex = column + (fireWidth * row);
            var fireIntensity = firePixelsArray[pixelIndex]

            if(debug === true){
                html += '<td>';
                html += `<div class="pixel-index">${pixelIndex}</div>`;
                html += fireIntensity;
                html +='</td>';
            } else {
                var color = fireColorsPalette[fireIntensity];
                var colorString = `${color.r}, ${color.g}, ${color.b}`;
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
                html += '</td>';
            }
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