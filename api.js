const url = "https://pixel-api.codenestedu.fr"
const canvas = document.getElementById("canvas")

const refresh_canvas = () => {
    canvas.innerHTML = "" // quick way to empty out canvas div
    const req = new Request(url+"/tableau")
    fetch(req).then(response => {return response.json()})
    .then(r => {
        for(let i=0; i<100;i++){
            let row = document.createElement("div")
            row.className = "row"
            for(let j=0; j<100; j++){
                let pixel = document.createElement("div")
                pixel.className = "pixel"
                pixel.id = "pixel" + i + "," + j
                pixel.onclick = () => {
                    console.log(pixel_to_coords(pixel.id))
                }
                pixel.style.backgroundColor = r[i][j]
                row.appendChild(pixel)
            }
            canvas.appendChild(row)
        }
    })
}

const pixel_to_coords = (pixel_id) => {
    return pixel_id.substring(5).split(",")
}

refresh_canvas()