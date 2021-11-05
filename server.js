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
app.post('/api/jouer', (req, res) => {// la requête post permet de recueillir des données.
        let coup = req.body.coup;
        let coupOrdinateur;
        let hasard = Math.floor(Math.random() * 3);// random des coups pour l'ordi
    
        switch (hasard) {// 3 possibilités de coups dans le random
            case 0:
                coupOrdinateur = PIERRE;
                break;
            case 1:
                coupOrdinateur = FEUILLE;
                break;
            case 2:
                coupOrdinateur = CISEAU;
                break;
        }
    
        if ((coup === FEUILLE && coupOrdinateur === PIERRE) ||
            (coup === CISEAU && coupOrdinateur === FEUILLE) ||
            (coup === PIERRE && coupOrdinateur === CISEAU)) {
            /**
             * coup - coupOrdinateur === 1 || coup - coupOrdinateur == -2
             */
            res.send("GAGNE !!");
        } else if (coup === coupOrdinateur) {
            return res.send("NUL")
        } else  {
            return res.send("PERDU");
        }
});

app.listen(3000);