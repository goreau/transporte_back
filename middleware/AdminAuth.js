var jwt = require("jsonwebtoken");

var secret = "ljdsaGdIdldw6nmbQlsas";

module.exports = function(req, res, next){
    var token = req.headers['authorization'];

    try {
        if (token != undefined){
            const bearer = token.split(' ');
    
            var auth = bearer[1];
            var logged = jwt.verify(auth, secret);
            if (logged.role < 2){
                next();
            } else {
                res.status(400).send("Usuário não autorizado para essa funcionalidade");
            }      
        } else {
            res.status(400).send("Usuário não autenticado");
        }
    } catch (error) {
        res.status(400).send("Erro validando o token");
    }

    
}