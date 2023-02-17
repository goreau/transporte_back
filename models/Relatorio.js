var conn = require("../database/connection");

class Relatorio{
    
    async relat1(mun, bacia){
        try {
            var filt = mun > 0 ? 'l.id_municipio = ' + mun : '1=1';
            filt += bacia > 0 ? ' AND l.id_bacia = ' + bacia : '';
            var data = await conn.select(["l.localidade", "m.nome as municipio", "b.nome as bacia"])
            .table("localidade as l")
            .innerJoin("municipio as m","l.id_municipio","m.id_municipio")
            .innerJoin("bacia as b","l.id_bacia","b.id_bacia")
            .whereRaw(filt);
            data = this.trataData(data);
            return {res: true, data: data, msg: ''};
        } catch (error) {
            console.log(error);
            return {res: false, data: [], msg: error};
        }
    }

    trataData(data){
        return JSON.parse(JSON.stringify(data));
        return data.map(item=>{
            return Object.keys(item).reduce((acc,key)=>{
              return item[key]
            },{})
          });

    }
}

module.exports = new Relatorio();