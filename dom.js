import { getCanvas, pixelClick } from "./api.js"

const canvas = document.getElementById("canvas")

const refreshCanvas = async () => {
    const canvasMatrix = await getCanvas();
    canvasMatrix.map((row, rowIndex) => {
        let rowElem = document.createElement("div")
        rowElem.className = "row"
        row.map((pixelColor, colIndex) => {
            let pixelElem = document.createElement("div")
            pixelElem.className = "pixel"
            pixelElem.id = "pixel" + rowIndex + "," + colIndex
            pixelElem.style.backgroundColor = pixelColor
            pixelElem.addEventListener("click",() => {
                pixelClick(pixelElem)
            })
            rowElem.appendChild(pixelElem)
        })
        canvas.appendChild(rowElem);
    })
}

refreshCanvas()