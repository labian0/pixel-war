const url = "https://pixel-api.codenestedu.fr"
const canvas = document.getElementById("canvas")

const init_canvas = () => {
    const req = new Request(url+"/tableau")
    fetch(req).then(response => {return response.json()})
    .then(r => {
        for(let i=0; i<100;i++){
            let row = document.createElement("div")
            row.className = "row"
            for(let j=0; j<100; j++){
                let pixel = document.createElement("div")
                pixel.className = "pixel"
                pixel.style.backgroundColor = r[i][j]
                row.appendChild(pixel)
            }
            canvas.appendChild(row)
        }
    })
}
init_canvas()