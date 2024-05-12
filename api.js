const url = "https://pixel-api.codenestedu.fr"

const getCanvas = async () => {
    const req = new Request(url+"/tableau")
    return fetch(req).then(response => {return response.json()})
}


const placePixel = async (color, uid, row, col) => {
    const req = new Request(url+"/modifier-case")
    return await fetch(req, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            color: color,
            uid: uid,
            row: row,
            col: col
        })
    }).then(async (response)=>{
        return {
            data: await response.json(),
            code: response.status
        }
    });
}

export{
    getCanvas,
    placePixel
}