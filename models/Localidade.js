var conn = require("../database/connection");

class Localidade{
    async new(id_execucao, id_atividade, nova, cod_previa, id_municipio, total_casos,   
        dt_cadastro, id_tipo_area, id_bacia, localidade, codigo, bairro, endereco, observacao, 
        ch_perene, capivara, cavalo, cao, gato, lazer, trabalho, residencia,  responsavel, 
        sinan, poligono, id_usuario){
        try {
            const objeto = {
                id_execucao: id_execucao,
                id_atividade: id_atividade,
                nova: nova,
                cod_previa: cod_previa,
                id_municipio: id_municipio,
                total_casos: total_casos,
                dt_cadastro: dt_cadastro,
                id_tipo_area: id_tipo_area,
                id_bacia: id_bacia,
                localidade: localidade,
                codigo: codigo,
                bairro: bairro,
                endereco: endereco,
                observacao: observacao,
                ch_perene: ch_perene,
                capivara: capivara,
                cavalo: cavalo,
                cao: cao,
                gato: gato,
                lazer: lazer,
                trabalho: trabalho,
                residencia: residencia,
                responsavel: responsavel,
                sinan: sinan,
                id_usuario: id_usuario
            }

            const columns = Object.keys(objeto);
            const values = Object.values(objeto);

  //          console.log('columns: ', columns);
 // console.log('values: ', values);

            const sql = `
                    INSERT INTO localidade (${columns.map(col => col).join(',')}, poligono)
                    VALUES (${values.map(() => '?').join(',')}, ST_GeomFromText('${poligono}',4326))
                `;
                console.log('sql: ', sql);
            try {
                const insertObjResp = await conn.raw(sql, values);
                console.log('insertObjResp: ', insertObjResp);
              } catch (error) {
                console.error(error);
              }
            return {res: true, msg: 'Registro inserido'};
        } catch (error) {
            console.log(error);
            return {res: false, msg: error};
        }
        
    }


    async findAll(mun, bacia){
        try {
            var filt = mun > 0 ? 'l.id_municipio = ' + mun : '1=1';
            filt += bacia > 0 ? ' AND l.id_bacia = ' + bacia : '';
            var data = await conn.select(["l.id", "m.nome as municipio", "l.codigo", "l.localidade as nome", "l.dt_cadastro as data", "l.id_usuario"])
            .table("localidade as l")
            .innerJoin("municipio as m","l.id_municipio","m.id_municipio")
            .whereRaw(filt);
            return {res: true, data: data, msg: ''};
        } catch (error) {
            console.log(error);
            return {res: false, data: [], msg: error};
        }
    }

    async findById2(id){
        try {
            var data = await conn.select()
                .table("localidade")
                .where({"id": id});
                console.log(data);
            return {res: true, data: data, msg: ''};
        } catch (error) {
            return {res: false, data: [], msg: error};
        }
    }

    async findById(id){
        try {
            var data = await conn.select(conn.raw("localidade.*, ST_AsText(poligono) as poligono"))
                .table("localidade")
                .where({"id": id});
                console.log(data)
            return {res: true, data: data, msg: ''};
        } catch (error) {
            return {res: false, data: [], msg: error};
        }
    }

    async update(id, id_execucao, id_atividade, nova, cod_previa, id_municipio, total_casos,   
        dt_cadastro, id_tipo_area, id_bacia, localidade, codigo, bairro, endereco, observacao, 
        ch_perene, capivara, cavalo, cao, gato, lazer, trabalho, residencia,  responsavel, 
        sinan, poligono, id_usuario){
        var editLoc = {};
        var result = await this.findById(id);
        //console.log('banco: ', result);

        if (result.data.length > 0){
            const objeto = result.data[0];
            if(objeto.id_execucao != id_execucao){
                editLoc.id_execucao = id_execucao;
            }
            if(objeto.id_municipio != id_municipio){
                editLoc.id_municipio = id_municipio;
            }
            if(objeto.id_atividade != id_atividade){
                editLoc.id_atividade = id_atividade;
            }
            if(objeto.nova != nova){
                editLoc.nova = nova;
            }
            if(objeto.cod_previa != cod_previa){
                editLoc.cod_previa = cod_previa;
            }
            if(objeto.total_casos != total_casos){
                editLoc.total_casos = total_casos;
            }
            if(objeto.id_tipo_area != id_tipo_area){
                editLoc.id_tipo_area = id_tipo_area;
            }
            if(objeto.id_bacia != id_bacia){
                editLoc.id_bacia = id_bacia;
            }
            if(objeto.localidade != localidade){
                editLoc.localidade = localidade;
            }
            if(objeto.codigo != codigo){
                editLoc.codigo = codigo;
            }
            if(objeto.bairro != bairro){
                editLoc.bairro = bairro;
            }
            if(objeto.endereco != endereco){
                editLoc.endereco = endereco;
            }
            if(objeto.observacao != observacao){
                editLoc.observacao = observacao;
            }
            if(objeto.ch_perene != ch_perene){
                editLoc.ch_perene = ch_perene;
            }
            if(objeto.capivara != capivara){
                editLoc.capivara = capivara;
            }
            if(objeto.cavalo != cavalo){
                editLoc.cavalo = cavalo;
            }
            if(objeto.cao != cao){
                editLoc.cao = cao;
            }
            if(objeto.gato != gato){
                editLoc.gato = gato;
            }
            if(objeto.lazer != lazer){
                editLoc.lazer = lazer;
            }
            if(objeto.trabalho != trabalho){
                editLoc.trabalho = trabalho;
            }
            if(objeto.residencia != residencia){
                editLoc.residencia = residencia;
            }
            if(objeto.responsavel != responsavel){
                editLoc['responsavel'] = responsavel;
            }
            
            if(objeto.dt_cadastro != dt_cadastro){
                editLoc['dt_cadastro'] = dt_cadastro;
            }
            if(objeto.sinan != sinan){
                editLoc.sinan = sinan;
            } 
            if(objeto.id_usuario != id_usuario){
                editLoc.id_usuario = id_usuario;
            }
            if(objeto.poligono != poligono){
                editLoc.poligono = poligono;
            }

            const columns = Object.keys(editLoc);
            const values = Object.values(editLoc);
        

            var sql = ` UPDATE localidade SET `;
            for (let i = 0; i < columns.length; i++){
                if (columns[i] == 'poligono'){
                    sql += " poligono = ST_GeomFromText('" + values[i] +"',4326),";  
                    let xx = values.slice(i,1);
                    console.log('dele pol: ',xx);
                } else {
                    sql+= columns[i] + '= ?,';
                }   
            }

            sql = sql.slice(0,-1) + ' WHERE id=' + id;
            values.pop();

            try {
                await conn.raw(sql, values);
                
                return {res: true, msg: 'Registro atualizado!'};
            } catch (error) {
                console.log(error);
                return {res: false, msg: error};
            }  
        } else {
            return {res: false, msg: 'Localidade não localizada'};
        }
    }

    async delete(id){
        try {
            var data = await conn.delete()
                .table("localidade")
                .where({id: id});
            if (data > 0){
                return {res: true, msg: 'Registro excluído!'};
            } else {
                return {res: true, msg: 'Localidade não localizada!'};
            }        
        } catch (error) {
            return {res: false, msg: error};
        }
    }

}

module.exports = new Localidade();