var Auxiliar = require("../models/auxiliares/Auxiliares");

class AuxiliaresController{
    async findMunicipios(req, res){
        var result = await Auxiliar.findMunicipios();

        if (result.res){
            res.json(result.data);
        } else {
            res.json(result);
        }
    };

    async findBacia(req, res){
        var result = await Auxiliar.findBacias();

        if (result.res){
            res.json(result.data);
        } else {
            res.json(result);
        }
    };
}

module.exports = new AuxiliaresController();