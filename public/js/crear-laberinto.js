const inputFilas = document.querySelector("#input-filas")
const inputColumnas = document.querySelector("#input-columnas")
const btnCrear = document.querySelector("#btn-crear")
const advertencia = document.querySelector("h4")
const divLaberinto = document.querySelector("#div-laberinto")
const btnCargar = document.querySelector("#btn-cargar")
let btnsCeldas

let matriz

function cargarMatriz() {
    matriz = []
    if (inputFilas.value <= 0 || inputColumnas.value <= 0) {
        advertencia.innerText = ""
        advertencia.innerText = "Por favor, introduce valores mayores a 0"
    } else if (inputFilas.value < 4 || inputColumnas.value < 4) {
        advertencia.innerText = ""
        advertencia.innerText = "El mínimo de celdas es de 4 por 4"
    } else {
        advertencia.innerText = ""
        let fila = inputFilas.value
        let columna = inputColumnas.value
        
        for (let i = 0; i < fila; i++) {
            matriz.push([])
            for (let j = 0; j < columna; j++) {
                matriz[i].push(0)
            }
        }
    }    
}

function cargarLaberinto() {
    divLaberinto.innerHTML = ""
    btnCargar.style.display = "inline"
    for (let i = 0; i < matriz.length; i++) {
        let fila = document.createElement("div")
        fila.classList.add("fila-laberinto")
        for (let j = 0; j < matriz[i].length; j++) {
            let celdaLaberinto = document.createElement("div")
            celdaLaberinto.classList.add("celdas-laberinto")
        
            if (matriz[i][j] === 0) {
                celdaLaberinto.classList.add("celda")
            } else if (matriz[i][j] === 1) {
                celdaLaberinto.classList.add("pared")
            } else if (matriz[i][j] === 2) {
                celdaLaberinto.classList.add("jugador")
            } else if (matriz[i][j] === 3) {
                celdaLaberinto.classList.add("salida")
            }

            fila.appendChild(celdaLaberinto)
        }
        divLaberinto.appendChild(fila)
        btnsCeldas = document.querySelectorAll(".celdas-laberinto")
        asignarEventoCeldas()
    }
}

function asignarEventoCeldas() {
    for (let i = 0; i < btnsCeldas.length; i++) {
        btnsCeldas[i].addEventListener("click", (e) => {
            cambiarEstadoCelda(e.target)
        })
    }  
}

function cambiarEstadoCelda(celda) {
    const indiceFila = Array.from(celda.parentNode.parentNode.children).indexOf(celda.parentNode)
    const indiceColumna = Array.from(celda.parentNode.children).indexOf(celda)

    matriz[indiceFila][indiceColumna] = (matriz[indiceFila][indiceColumna] + 1) % 4

    cargarLaberinto()
}

btnCrear.addEventListener("click", () => {
    cargarMatriz()
    cargarLaberinto()
})

btnCargar.addEventListener("click", () => {
    if (matriz === undefined) {
        console.log("Por favor, crea un laberinto antes de cargarlo")
    } else {
        fetch("http://localhost:3000/crear-laberinto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(matriz)
        })
        .then((data) => {
            inputFilas.value = ""
            inputColumnas.value = ""
            divLaberinto.innerHTML = ""
            matriz = undefined
            btnCargar.style.display = "none"
            alert("¡Laberinto guardado!")
        })
        .catch((error) => {
            console.log("Error:", error)
        })
    }
})