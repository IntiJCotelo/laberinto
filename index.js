const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})


app.post("/crear-laberinto", (req, res) => {
    let cantidadNiveles = 0

    fs.readdirSync("./laberintos").forEach((archivo) => {
        cantidadNiveles++
    });

    let laberinto = req.body
    let laberintoJSON = JSON.stringify(laberinto)

    fs.writeFileSync(`./laberintos/laberinto-${cantidadNiveles + 1}.json`, laberintoJSON)
    res.send(console.log("Laberinto creado correctamente"))
})


app.get("/crear-laberinto", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'crear-laberinto.html'));
})


app.get("/ver-laberintos", (req, res) => {
    let contenidoArchivos = []

    fs.readdirSync("./laberintos").forEach((archivo) => {
        let laberinto = fs.readFileSync(`./laberintos/${archivo}`, "utf8")

        contenidoArchivos.push(laberinto)
    })

    res.json(contenidoArchivos)
})


app.listen(port, () => {
    console.log("Servidor corriendo en el puerto 3000")
})


