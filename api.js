const url = "https://pixel-api.codenestedu.fr"
const canvas = document.getElementById("canvas")

const refresh_canvas = () => {
    canvas.innerHTML = "" // quick way to empty out canvas div
    const req = new Request(url+"/tableau")
    fetch(req).then(response => {return response.json()})
    .then(canvasMatrix =>{
        canvasMatrix.map((row, rowIndex) => {
            let rowElem = document.createElement("div")
            rowElem.className = "row"
            row.map((pixelColor, colIndex) => {
                let pixelElem = document.createElement("div")
                pixelElem.className = "pixel"
                pixelElem.id = "pixel" + rowIndex + "," + colIndex
                pixelElem.style.backgroundColor = pixelColor
                pixelElem.addEventListener("click",() => {
                    [rowIndex,colIndex] = pixel_to_coords(pixelElem.id)
                    pixel_click(rowIndex,colIndex)
                })
                rowElem.appendChild(pixelElem)
            })
            canvas.appendChild(rowElem);
        })
    })
}

const pixel_click = (rowIndex,colIndex) => {
    console.log(rowIndex,colIndex)
}

const pixel_to_coords = (pixel_id) => {
    return pixel_id.substring(5).split(",")
}

refresh_canvas()