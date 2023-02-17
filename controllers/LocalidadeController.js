var Localidade = require("../models/Localidade");


class LocalidadeController{
    async index(req, res){
        var mun = req.params.mun;
        var bacia = req.params.bacia;
        var result = await Localidade.findAll(mun, bacia);

        if (result.res){
            res.json(result.data);
        } else {
            res.json(result);
        }
    };

    async findLocalidade(req, res){
        var id = req.params.id;
        if (id != undefined){
            var result = await Localidade.findById(id);
            if (result.res){
                if (result.data.length > 0){
                    res.json(result.data[0]);
                } else {
                    res.json({res: false, data: [], msg: "Nenhum registro encontrado"});
                }
            } else {
                res.json(result);
            }
        } else {
            res.json({res: false, data: [], msg: "O Id do registro é obrigatório"});
        }
    }

    async create(req, res){
        var { id_execucao, id_atividade, nova, cod_previa, id_municipio, total_casos, dt_cadastro,
            id_tipo_area, id_bacia, localidade, codigo, bairro, endereco, observacao, 
            ch_perene, capivara, cavalo, cao, gato, lazer, trabalho, residencia, dt_cadastro, responsavel, 
            sinan, poligono, id_usuario } = req.body;
        //validando os dados
        if (id_execucao == undefined || id_execucao == ''){
            res.status(400).send("Execução não informada.");
            return;
        }
        if (id_atividade == undefined || id_atividade == ''){
            res.status(400).send("Atividade não informada.");
            return;
        }
        if (id_municipio == undefined || id_municipio == ''){
            res.status(400).send("Município não informado.");
            return;
        }
        if (id_bacia == undefined || id_bacia == ''){
            res.status(400).send("Bacia Hidrogáfica não informada.");
            return;
        }
        if (id_tipo_area == undefined || id_tipo_area == ''){
            res.status(400).send("Tipo de área não informado.");
            return;
        }
        if (localidade == undefined || localidade.trim() == '' ){
            res.status(400).send("Nome da localidade não pode ser vazio.");
            return;
        }
        if (codigo == undefined || codigo.replace(/\D/g,'') == '' ){
            res.status(400).send("Codigo da localidade em formato não aceito.");
            return;
        }
        if (nova == undefined || nova == '' || nova == '0'){
            res.status(400).send("Favor informar se a localidade é nova ou já foi cadastrada.");
            return;
        }
        if (nova == 2 && (cod_previa == undefined || cod_previa.replace(/\D/g,'') == '')){
            res.status(400).send("Favor informar o código da localidade já cadastrada anteriormente.");
            return;
        }
        if (nova == 1){
            cod_previa = '';
        }
        if (id_atividade > 1){
            total_casos = 0;
            sinan='{}';
        }

        var result = await Localidade.new(id_execucao, id_atividade, nova, cod_previa, id_municipio, total_casos,   
            dt_cadastro, id_tipo_area, id_bacia, localidade, codigo, bairro, endereco, observacao, 
            ch_perene, capivara, cavalo, cao, gato, lazer, trabalho, residencia,  responsavel, 
            sinan, poligono, id_usuario);
        if (result.res){
            res.status(200).send(result.msg);
        } else {
            res.status(400).send(result.msg.sqlMessage);
        } 
    }

    async edit(req, res){
        var { id, id_execucao, id_atividade, nova, cod_previa, id_municipio, total_casos, dt_cadastro,
            id_tipo_area, id_bacia, localidade, codigo, bairro, endereco, observacao, 
            ch_perene, capivara, cavalo, cao, gato, lazer, trabalho, residencia, responsavel, 
            sinan, poligono, id_usuario } = req.body;
            console.log('controller: ',req.body);

        var result = await Localidade.update(id, id_execucao, id_atividade, nova, cod_previa, id_municipio, total_casos, dt_cadastro,
            id_tipo_area, id_bacia, localidade, codigo, bairro, endereco, observacao, 
            ch_perene, capivara, cavalo, cao, gato, lazer, trabalho, residencia, responsavel, 
            sinan, poligono, id_usuario);
        if (result.res){
            res.status(200).send(result.msg);
        } else {
            res.status(400).send(result.msg.sqlMessage);
        } 
    }
   
}

module.exports = new LocalidadeController();