import { getCanvas, placePixel, selectTeam, getTeamInfo } from "./api.js"

const canvas = document.getElementById("canvas")
const serverInfo = document.getElementById("server_info")
const equipeInfo = document.getElementById("equipe")

const updateServerInfo = (message) => {
    serverInfo.textContent = message
}

const updateEquipeInfo = (message) => {
    equipeInfo.textContent = message
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

const refreshTeam = async () => {
    let res = await getTeamInfo(getUID())
    let message
    if(res.code == 200){
        let equipeNum = res.data.equipe
        if (equipeNum == 0){
            message = "Vous n'avez pas d'équipe"
        }else{
            message = "Vous êtes dans l'équipe " + equipeNum
        }
    }else{
        message = "UID inconnu"
    }
    updateEquipeInfo(message)
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
setInterval(refreshTeam, 3000)