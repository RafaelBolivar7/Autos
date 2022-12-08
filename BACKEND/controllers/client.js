var validator = require("validator");
var Client = require("../models/Clients");

var controller = {
   
    save: function(req, res){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_age = !validator.isEmpty(params.age); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_email =  !validator.isEmpty(params.email) && validator.isEmail(params.email);  
        var validate_password= !validator.isEmpty(params.password);
        console.log(validate_email);

        if(validate_name && validate_age && validate_email && validate_password){
            var client = new Client();
            client.name = params.name;
            client.age = params.age;
            client.email = params.email;
            client.password = params.password;
            console.log(client);

            client.save((error, clientSaved)=> {
                if (error || !clientSaved){
                    return res.status(404).send({
                        message: "El Cliente no se guardó",
                        status: "ERROR"
                    });
                }
                return res.status(200).send({
                    message: "Cliente Guardado"
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
        var clientId = req.params.id;
        console.log(clientId);
        var validate_name = !validator.isEmpty(params.name);
        var validate_age = !validator.isEmpty(params.age); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_email =  !validator.isEmpty(params.email) && validator.isEmail(params.email);  
        var validate_password= !validator.isEmpty(params.password);
        console.log(validate_email);

        if(validate_name && validate_age && validate_email && validate_password){
            var client = new Client();
            
            var update = {
                name: params.name,
                age: params.age,
                email: params.email,
                password: params.password,
            }

            Client.findOneAndUpdate({_id:clientId}, update, {new:true},(error, clientUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!clientUpdate){
                    return res.status(404).send({
                        message: "Cliente no Actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Actualizado Correctamente",
                    clientUpdate
                });
            })         
        }else{
            return res.status(200).send({
                message: "Validación Incorrecta"
            });
        } 
    },

    delete: function(req, res){
        var clientId = req.params.id;
        Client.findOneAndDelete({_id:clientId}, (error, clientRemoved)=>{
            if(error){
                return res.status(500).send({
                    message: "Error en la Petición",
                    status:"Error"
                });
            }
            if(!clientRemoved){
                return res.status(404).send({
                    message: "Cliente no Eliminado",
                    status:"Error"
                });
            }
            return res.status(200).send({
                message: "Eliminado exitosamente",
                status:"Success", 
                client: clientRemoved
            });
        })
        
    },

    listClients: function(req, res){
        
        Client.find(function(error, doc){
            console.log(doc);
            return res.status(200).send({
                message: "Clientes", 
                doc
            });
        });
    },

    showClient: function(req, res){
        var clientId = req.params.id;
        Client.findById(clientId)
            .exec((error, client)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!client){
                    return res.status(404).send({
                        message: "Cliente no Encontrado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Este es un persona", 
                    client
                });
            });
    }
}

module.exports = controller;