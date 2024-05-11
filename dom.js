import { getCanvas, pixelClick } from "./api.js"

const canvas = document.getElementById("canvas")

const initCanvas = async () => {
    for (let rowIndex = 0; rowIndex < 100; rowIndex++) {
        let rowElem = document.createElement("div")        
        rowElem.className = "row"
        for (let pixelIndex = 0; pixelIndex < 100; pixelIndex++) {
            let pixelElem = document.createElement("div")
            pixelElem.className = "pixel"
            pixelElem.id = "pixel" + rowIndex + "," + pixelIndex
            pixelElem.style.backgroundColor = "#FFFFFF"
            pixelElem.addEventListener("click",() => {
                pixelClick(pixelElem)
            })
            rowElem.appendChild(pixelElem)
        }
        canvas.appendChild(rowElem)
    }
}

const refreshCanvas = async () => {
    const canvasMatrix = await getCanvas();
    canvasMatrix.map((ligne,i)=>{
        ligne.map((couleur,j)=>{
            let pixel = document.getElementById(`pixel${i},${j}`)
            pixel.style.backgroundColor = couleur
        })
    })
}

await initCanvas()
setInterval(refreshCanvas, 3000)