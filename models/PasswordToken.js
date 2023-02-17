var conn = require("../database/connection");
var User = require("./User");

class PasswordToken{
    async create(email){
        try {
            var res = await User.findByEmail(email);
            var token = Date.now() //ver uuid
            if (res.data.length > 0){
                var user = res.data[0];
                await conn.insert ({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("password_tokens");
            return {res: true, data: token, msg: 'Token gerado!'};
        } else {
            return {res: false, data: '', msg: 'Usuário não encontrado!'};
        }
        } catch (error) {
            return {res: false, data: '', msg: error};
        }
    }

    async validate(token){
        try {
            var result = await conn.select().where({token: token}).table("password_tokens");
            if (result.length > 0 ){
                var tk = result[0];

                if (tk.used){
                    return {res: false, data: '', msg: "Token expirado!"};
                } else {
                    return {res: true, data: {id_token: tk.id, id_user: tk.user_id}, msg: "Token válido"};
                }
            } else {
                return {res: false, data: '', msg: "Token inválido!"};
            }
        } catch (error) {
            return {res: false, data: '', msg: error};
        }
    }

    async setUsed(id_token){
        try {
            var res = await conn.update({used: 1})
                    .table("password_tokens")
                    .where({id: id_token});
            if (res > 0){
                return {res: true, msg: "Token atualizado"};
            } else {
                return {res: false, msg: "Erro atualizando token"};
            }
        } catch (error) {
            return {res: false, msg: error};
        }
    }
}

module.exports = new PasswordToken();