// Importa el módulo Express
const express = require('express');

// Crea una instancia de la aplicación Express
const app = express();

// Define una ruta y su manejador
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Inicia el servidor en un puerto específico
const port = 3000;
app.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});