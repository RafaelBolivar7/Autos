var validator = require("validator");
var Admin = require("../models/Admins");

var controller = {
   
    save: function(req, res){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_email =  !validator.isEmpty(params.email) && validator.isEmail(params.email);  
        var validate_password= !validator.isEmpty(params.password);
        console.log(validate_email);

        if(validate_name && validate_email && validate_password){
            var admin = new Admin();
            admin.name = params.name;
            admin.email = params.email;
            admin.password = params.password;
            console.log(admin);

            admin.save((error, adminSaved)=> {
                if (error || !adminSaved){
                    return res.status(404).send({
                        message: "El Administrador no se guardó",
                        status: "ERROR"
                    });
                }
                return res.status(200).send({
                    message: "Administrador Guardado"
                });
            });
           
        }else{
            return res.status(200).send({
                message: "Validación de datos incorrecta"
            }); 
        }
    },

    login: function(req, res){
        return res.status(200).send({
            message: "Login"
        });
    },

    update: function(req, res){
        var params = req.body;
        var adminId = req.params.id;
        console.log(adminId);
        var validate_name = !validator.isEmpty(params.name);
        var validate_email =  !validator.isEmpty(params.email) && validator.isEmail(params.email);  
        var validate_password= !validator.isEmpty(params.password);
        console.log(validate_email);

        if(validate_name && validate_email && validate_password){
            var admin = new Admin();
            
            var update = {
                name: params.namec,
                email: params.email,
                password: params.password,
            }

            Admin.findOneAndUpdate({_id:adminId}, update, {new:true},(error, adminUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!adminUpdate){
                    return res.status(404).send({
                        message: "Admin no Actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Actualizado Correctamente",
                    adminUpdate
                });
            })         
        }else{
            return res.status(200).send({
                message: "Validación Incorrecta"
            });
        } 
    },

    delete: function(req, res){
        var adminId = req.params.id;
        Admin.findOneAndDelete({_id:adminId}, (error, adminRemoved)=>{
            if(error){
                return res.status(500).send({
                    message: "Error en la Petición",
                    status:"Error"
                });
            }
            if(!adminRemoved){
                return res.status(404).send({
                    message: "Administrador no Eliminado",
                    status:"Error"
                });
            }
            return res.status(200).send({
                message: "Eliminado exitosamente",
                status:"Success", 
                admin: adminRemoved
            });
        })
        
    },

    listAdmins: function(req, res){
        
        Client.find(function(error, doc){
            console.log(doc);
            return res.status(200).send({
                message: "Administradores", 
                doc
            });
        });
    },

    showAdmin: function(req, res){
        var adminId = req.params.id;
        Admin.findById(adminId)
            .exec((error, admin)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!admin){
                    return res.status(404).send({
                        message: "Administrador no Encontrado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Este es un persona", 
                    admin
                });
            });
    }
}

module.exports = controller;