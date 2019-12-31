const firePixelsArray = []
const fireWidth = 10;
const fireHeight = 10;

function init() {
    createDataStructure();
    renderAnimation();
}

function createDataStructure(){
    const numberPixels = fireWidth * fireHeight;

    
    for(let i = 0; i < numberPixels; i ++) {
        firePixelsArray[i] = 0;
    }
}

function calculateFirePropagation(){
    
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

init()