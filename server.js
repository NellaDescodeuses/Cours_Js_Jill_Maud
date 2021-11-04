const express = require("express");// le paquet http est maintenant disponible, cela est égale à un import

const app = express();

app.use("/public", express.static(__dirname + "/public"));// sur le dossier public tu me renvoies TOUS les fichier contenu dans le dosssier public
app.use("/dist", express.static(__dirname + "/dist"))// sur le dossier public tu me renvoies TOUS les fichier contenu dans le dosssier dist

app.get('/', (req, res) => {

    res.sendFile(__dirname +"/index.html"); //__dirname permet de récupérer l'adresse du dossier dans lequel on se trouve.
})

// app.get('/main.js', (req, res) => {

//     res.sendFile(__dirname +"/dist/main.js"); //__dirname permet de récupérer l'adresse du dossier dans lequel on se trouve.
// })

app.listen(3000);