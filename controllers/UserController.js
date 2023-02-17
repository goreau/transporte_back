var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "ljdsaGdIdldw6nmbQlsas";

class UserController{
    async index(req, res){
        var result = await User.findAll();

        if (result.res){
            res.json(result.data);
        } else {
            res.json(result);
        }
    };

    async findUser(req, res){
        var id = req.params.id;
        if (id != undefined){
            var result = await User.findById(id);
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
        var { name, email, password, role } = req.body;
        //validando os dados
        if (email == undefined || email == '' || email == ' '){
            res.status(400).send("Email não informado");
            return;
        }

        var result = await User.new(name, email, password, role);
        if (result.res){
            res.status(200).send(result.msg);
        } else {
            res.status(400).send(result.msg.sqlMessage);
        } 
    }

    async edit(req, res){
        var { id, name, email, role } = req.body;

        var result = await User.update(id, name, email, role);
        if (result.res){
            res.status(200).send(result.msg);
        } else {
            res.status(400).send(result.msg.sqlMessage);
        } 
    }

    async delete(req, res){
        var id = req.params.id;

        var result = await User.delete(id);
        if (result.res){
            res.status(200).send(result.msg);
        } else {
            res.status(400).send(result.msg.sqlMessage);
        } 
    }

    async recoverPassword(req, res){
        var email = req.body.email;

        var result = await PasswordToken.create(email);

        if (result.res){
            res.status(200).send(result.data.toString());
        } else {
            res.status(400).send(result.msg);
        } 
    }

    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;

        var validate = await PasswordToken.validate(token);

        if (validate.res){
            var result = await User.changePassword(password, validate.data.id_user, validate.data.id_token);
            res.status(200).send(result.msg);
        } else {
            res.status(400).send(validate.msg);
        }
    }

    async login(req, res){
        var {email, password} = req.body;
        try {
			console.log(email);
            var result = await User.findByEmail(email);
            console.log(result);
            if (result.res){
                if (result.data.length > 0){
                    var user = result.data[0];
                    
                    var auth = await bcrypt.compare(password, user.password );
                    if (auth){
                        var logged = {name: user.name, email: user.email, role: user.role, id_user: user.id};
                        var token = await jwt.sign(logged, secret, {expiresIn: 1200});
                        res.status(200).json({token: token});
                    } else {
                        res.status(400).send("Senha não confere!");
                    }
                } else {
                    res.status(400).send("Email não encontrado!");
                }
            } else {
                res.status(400).send(result.msg);
            }
        } catch (error) {
            res.status(400).send(error);
        }
        
    }
}

module.exports = new UserController();