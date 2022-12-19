var validator = require("validator");
var Message = require("../models/Messages");

var controller = {
   
    save: function(req, res){
        var params = req.body;
        var validate_text = !validator.isEmpty(params.text);
        var validate_client= !validator.isEmpty(params.client); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_car =  !validator.isEmpty(params.car);  
      
        console.log(validate_car);

        if(validate_text && validate_client && validate_car){
            var message = new Message();
            message.text = params.text;
            message.client = params.client;
            message.car = params.car;
            console.log(message);

            message.save((error, messageSaved)=> {
                if (error || !messageSaved){
                    return res.status(404).send({
                        message: "El mensaje no se guardó",
                        status: "ERROR"
                    });
                }
                return res.status(200).send({
                    message: "Mensaje Guardado"
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
        var messageId = req.params.id;
        console.log(messageId);
        var validate_text = !validator.isEmpty(params.text);
        var validate_client = !validator.isEmpty(params.client); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_car =  !validator.isEmpty(params.car);  
    
        console.log(validate_car);

        if(validate_text && validate_client && validate_car){
            var message = new Message();
            
            var update = {
                text: params.text,
                client: params.client,
                car: params.car
            }

            Message.findOneAndUpdate({_id:messageId}, update, {new:true},(error, messageUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!messageUpdate){
                    return res.status(404).send({
                        message: "Mensaje no Actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Actualizado Correctamente",
                    messageUpdate
                });
            })         
        }else{
            return res.status(200).send({
                message: "Validación Incorrecta"
            });
        } 
    },

    delete: function(req, res){
        var messageId = req.params.id;
        Message.findOneAndDelete({_id:messageId}, (error, messageRemoved)=>{
            if(error){
                return res.status(500).send({
                    message: "Error en la Petición",
                    status:"Error"
                });
            }
            if(!messageRemoved){
                return res.status(404).send({
                    message: "Mensaje no Eliminado",
                    status:"Error"
                });
            }
            return res.status(200).send({
                message: "Eliminado exitosamente",
                status:"Success", 
                messageRemoved
            });
        })
        
    },

    listMessages: function(req, res){
        
        Message.find(function(error, doc){
            console.log(doc);
            return res.status(200).send({
                message: "Mensajes", 
                doc
            });
        }).populate(["car","client"]);
    },

    showMessage: function(req, res){
        var messageId = req.params.id;
        Message.findById(messageId)/* .populate(["car","client"]) */
            .exec((error, message)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!message){
                    return res.status(404).send({
                        message: "Mensaje no Encontrado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Este es un mensaje", 
                    message
                });
            });
    }
}

module.exports = controller;