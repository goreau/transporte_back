var conn = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User{
    async new(name, email, password, role, id_usuario){
        try {
            var hash = await bcrypt.hash(password, 12);
            await conn.insert({name, email, password: hash, role, id_usuario}).table("users");
            return {res: true, msg: 'Registro inserido'};
        } catch (error) {
            return {res: false, msg: error};
        }
        
    }

    async findAll(){
        try {
            var data = await conn.select(["id", "name", "email", "role", "id_usuario"]).table("users");
            return {res: true, data: data, msg: ''};
        } catch (error) {
            return {res: false, data: [], msg: error};
        }
    }

    async findById(id){
        try {
            var data = await conn.select(["id", "name", "email", "role", "id_usuario"])
                .table("users")
                .where({"id": id});
            return {res: true, data: data, msg: ''};
        } catch (error) {
            return {res: false, data: [], msg: error};
        }
    }

    async findByEmail(email){
        try {
            var data = await conn.select(["id", "name", "email", "password", "role", "id_usuario"])
                .table("users")
                .where({email: email});
            return {res: true, data: data, msg: ''};
        } catch (error) {
            return {res: false, data: [], msg: error};
        }
    }

    async update(id, name, email, role){
        var editUser = {};
        var result = await this.findById(id);
        if (result.data.length > 0){
            if (result.data[0].email != email){
                editUser.email = email;
            }
            if (result.data[0].name != name){
                editUser.name = name;
            }
            if (result.data[0].role != role){
                editUser.role = role;
            }
            console.log(editUser);
            try {
                await conn.update(editUser)
                    .table("users")
                    .where({"id": id});
                return {res: true, msg: 'Registro atualizado!'};
            } catch (error) {
                return {res: false, msg: error};
            }  
        } else {
            return {res: false, msg: 'Usuário não localizado'};
        }
    }

    async delete(id){
        try {
            var data = await conn.delete()
                .table("users")
                .where({id: id});
            if (data > 0){
                return {res: true, msg: 'Registro excluído!'};
            } else {
                return {res: true, msg: 'Usuário não localizado!'};
            }        
        } catch (error) {
            return {res: false, msg: error};
        }
    }

    async changePassword(newPassword, id_user, id_token){
        try {
            var hash = await bcrypt.hash(newPassword, 12);
            var result = await conn.update({password: hash}).table("users").where({'id': id_user});

            if (result > 0){
                res = await PasswordToken.setUsed(id_token);
                if (res.res){
                    return {res: true, msg: 'Senha alterada!'};
                } else {
                    return {res: false, msg: res.msg};
                }                
            } else {
                return {res: true, msg: 'Usuário não localizado!'};
            }        
        } catch (error) {
            return {res: false, msg: error};
        }
    }
}

module.exports = new User();