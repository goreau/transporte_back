var conn = require("../../database/connection");

class Auxiliares{
    async findMunicipios(){
        try {
            var data = await conn.select(["id_municipio as id", "nome"]).table("municipio");
            return {res: true, data: data, msg: ''};
        } catch (error) {
            return {res: false, data: [], msg: error};
        }
    }

    async findBacias(){
        try {
            var data = await conn.select(["id_bacia as id", "nome"]).table("bacia");
            return {res: true, data: data, msg: ''};
        } catch (error) {
            return {res: false, data: [], msg: error};
        }
    }
}

module.exports = new Auxiliares();