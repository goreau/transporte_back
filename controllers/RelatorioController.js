var Relatorio = require("../models/Relatorio");


class RelatorioController{
    async relat1(req, res){
        var mun = req.params.mun;
        var bacia = req.params.bacia;
        var result = await Relatorio.relat1(mun, bacia);

        if (result.res){
            res.json(result.data);
        } else {
            res.json(result);
        }
    };
}


module.exports = new RelatorioController();