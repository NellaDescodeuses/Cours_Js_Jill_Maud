const http = require("http"); // le paquet http est maintenant disponible, cela est égale à un import

const server = http.createServer((req, res) => {
    
    res.write("Bonjour !");
    res.end();
    return res;
});

server.listen(3000);