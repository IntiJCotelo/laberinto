const laberinto = document.querySelector("#div-laberinto")

let juego = {
    nivelActual: 0,
    nivelesJuego: [],
}

cargarNiveles()

let matriz = [
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1],         // 0 = ESPACIO LIBRE
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],         // 1 = PARED
    [1, 0, 1, 0, 0, 1, 1, 1, 0, 1],         // 2 = JUGADOR 
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],         // 3 = SALIDA
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 3, 1]
]

// RESPALDO DE LA MATRIZ PARA PODER REINICIAR EL NIVEL
function copiarMatriz(arr) {
    const copia = []
    
    for (const fila of arr) {
        const copiaFila = fila.slice()
        copia.push(copiaFila)
    }
    
    return copia
}

const aux = copiarMatriz(matriz)
// RESPALDO DE LA MATRIZ PARA PODER REINICIAR EL NIVEL

// CARGAR/RECARGAR DISPLAY
function cargarLaberinto() {
    let { nivelActual, nivelesJuego } = juego

    if (nivelActual > nivelesJuego.length) {
        document.body.innerHTML = `
            <h1 style="text-align: center; font-size: 50px">¡FELICITACIONES, HAS COMPLETADO EL JUEGO!</h1>`
    } else {
        laberinto.innerHTML = ""
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
            laberinto.appendChild(fila)
        }
    }
}

function reiniciar() {
    for(let i = 0; i < matriz.length; i++) {
        for(let j = 0; j < matriz[i].length; j++) {
            matriz[i][j] = aux[i][j]
        }
    }
    cargarLaberinto()
}
// CARGAR/RECARGAR DISPLAY

// LÓGICA MOVIMIENTOS
function moverArriba() {
    let fila
    let columna
    for(let i = 0; i < matriz.length; i++) {
        for(let j = 0; j < matriz[i].length; j++) {
            if(matriz[i][j] === 2) {
                fila = i
                columna = j
            }       
        }
    }
    
    if (matriz[fila - 1][columna] === 0) {
        matriz[fila][columna] = 0
        matriz[fila - 1][columna] = 2
        cargarLaberinto()
    } else if (matriz[fila - 1][columna] === 3) {
        matriz[fila][columna] = 0
        matriz[fila - 1][columna] = 2
        alert("¡GANASTE!")
        juego.nivelActual++
        matriz = juego.nivelesJuego[juego.nivelActual - 1]
        cargarLaberinto()
    }
}

function moverAbajo() {
    let fila
    let columna
    for(let i = 0; i < matriz.length; i++) {
        for(let j = 0; j < matriz[i].length; j++) {
            if(matriz[i][j] === 2) {
                fila = i
                columna = j
            }       
        }
    }
    
    if (matriz[fila + 1][columna] === 0) {
        matriz[fila][columna] = 0
        matriz[fila + 1][columna] = 2
        cargarLaberinto()
    } else if (matriz[fila + 1][columna] === 3) {
        matriz[fila][columna] = 0
        matriz[fila + 1][columna] = 2
        alert("¡GANASTE!")
        juego.nivelActual++
        matriz = juego.nivelesJuego[juego.nivelActual - 1]
        cargarLaberinto()
    }
}

function moverIzquierda() {
    let fila
    let columna
    for(let i = 0; i < matriz.length; i++) {
        for(let j = 0; j < matriz[i].length; j++) {
            if(matriz[i][j] === 2) {
                fila = i
                columna = j
            }       
        }
    }
    
    if (matriz[fila][columna - 1] === 0) {
        matriz[fila][columna] = 0
        matriz[fila][columna - 1] = 2
        cargarLaberinto()
    } else if (matriz[fila][columna - 1] === 3) {
        matriz[fila][columna] = 0
        matriz[fila][columna - 1] = 2
        alert("¡GANASTE!")
        juego.nivelActual++
        matriz = juego.nivelesJuego[juego.nivelActual - 1]
        cargarLaberinto()
    }
}

function moverDerecha() {
    let fila
    let columna
    for(let i = 0; i < matriz.length; i++) {
        for(let j = 0; j < matriz[i].length; j++) {
            if(matriz[i][j] === 2) {
                fila = i
                columna = j
            }       
        }
    }
    
    if (matriz[fila][columna + 1] === 0) {
        matriz[fila][columna] = 0
        matriz[fila][columna + 1] = 2
        cargarLaberinto()
    } else if (matriz[fila][columna + 1] === 3) {
        matriz[fila][columna] = 0
        matriz[fila][columna + 1] = 2
        alert("¡GANASTE!")
        juego.nivelActual++
        matriz = juego.nivelesJuego[juego.nivelActual - 1]
        cargarLaberinto()
    }
}   
// LÓGICA MOVIMIENTOS


document.addEventListener("keydown", (e) => {
    if (e.key === "w") {
        moverArriba()
    } else if (e.key === "s") {
        moverAbajo()
    } else if (e.key === "a") {
        moverIzquierda()
    } else if (e.key === "d") {
        moverDerecha()
    }
})

function main() {
    cargarLaberinto()
}

main()        

async function cargarNiveles() {
    const respuesta = await fetch("http://localhost:3000/ver-laberintos")
    const nivelesFetch = await respuesta.json()
    
    const niveles = nivelesFetch.map((nivel) => {
        return JSON.parse(nivel) 
    } )

    juego.nivelesJuego = niveles
}
