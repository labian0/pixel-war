import { getCanvas, placePixel, selectTeam } from "./api.js"

const canvas = document.getElementById("canvas")
const serverInfo = document.getElementById("server_info")

const updateServerInfo = (message) => {
    serverInfo.textContent = message
}

const getUID = () => {
    return document.getElementById("uid").value
}

const pixelClick = async (pixelElem) => {
    let [rowIndex,colIndex] = pixelToCoords(pixelElem.id)
    let res = await placePixel(document.getElementById("couleur").value,
    getUID(),
    rowIndex,
    colIndex
    )
    updateServerInfo(res.data.msg)
}

const pixelToCoords = (pixel_id) => {
    return pixel_id.substring(5).split(",")
}

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

let team_buttons = [].slice.call(document.getElementsByClassName("team-select-btn"));
team_buttons.map((btn,teamIndex)=>{
    btn.addEventListener("click",async ()=>{
        let res = await selectTeam(getUID(),teamIndex+1)
        updateServerInfo(res.data.msg)
    })
})

await initCanvas()
setInterval(refreshCanvas, 3000)