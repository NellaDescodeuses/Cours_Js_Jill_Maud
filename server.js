const express = require("express");// le paquet http est maintenant disponible, cela est égale à un import

const app = express();

app.get('/', (req, res) => {
    console.log("J'ai reçu une requête.");

    res.send("Bonjour !");
})

app.get('/aurevoir', (req, res) => { // je crée un nouvelle page 
    res.send("Au revoir !");
})

app.listen(3000);