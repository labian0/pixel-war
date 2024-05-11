const url = "https://pixel-api.codenestedu.fr"

const getCanvas = async () => {
    const req = new Request(url+"/tableau")
    return fetch(req).then(response => {return response.json()})
}

const pixelClick = (pixelElem) => {
    let [rowIndex,colIndex] = pixelToCoords(pixelElem.id)
    console.log(rowIndex,colIndex)
}

const pixelToCoords = (pixel_id) => {
    return pixel_id.substring(5).split(",")
}

export{
    getCanvas,
    pixelClick
}