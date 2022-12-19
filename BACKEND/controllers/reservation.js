var validator = require("validator");
var Reservation = require("../models/Reservations");

var controller = {
   
    save: function(req, res){
        var params = req.body;
        var validate_start_date = !validator.isEmpty(params.start_date);
        var validate_end_date = !validator.isEmpty(params.end_date); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_status =  !validator.isEmpty(params.status);  
        var validate_client= !validator.isEmpty(params.client);
        var validate_car= !validator.isEmpty(params.car);
        console.log(validate_status);

        if(validate_start_date && validate_end_date && validate_status && validate_client && validate_car){
            var reservation = new Reservation();
            reservation.name = params.start_date;
            reservation.age = params.end_date;
            reservation.status = params.status;
            reservation.client = params.client;
            reservation.car = params.car;
            console.log(reservation);

            reservation.save((error, reservationSaved)=> {
                if (error || !reservationSaved){
                    return res.status(404).send({
                        message: "La reservación no se guardó",
                        status: "ERROR"
                    });
                }
                return res.status(200).send({
                    message: "Reservation Guardada"
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
        var reservationId = req.params.id;
        console.log(reservationId);
        var validate_start_date = !validator.isEmpty(params.start_date);
        var validate_end_date = !validator.isEmpty(params.end_date); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_status =  !validator.isEmpty(params.status);  
        var validate_client= !validator.isEmpty(params.client);
        var validate_car= !validator.isEmpty(params.car);
        console.log(validate_status);

        if(validate_start_date && validate_end_date && validate_status && validate_client && validate_car){
            var reservation = new Reservation();
            
            var update = {
                start_date: params.start_date,
                end_date: params.end_date,
                status: params.status,
                client: params.client,
                car: params.car
            }

            Reservation.findOneAndUpdate({_id:reservationId}, update, {new:true},(error, reservationUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!reservationUpdate){
                    return res.status(404).send({
                        message: "Reservación no Actualizada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Actualizado Correctamente",
                    reservationUpdate
                });
            })         
        }else{
            return res.status(200).send({
                message: "Validación Incorrecta"
            });
        } 
    },

    delete: function(req, res){
        var reservationId = req.params.id;
        Reservation.findOneAndDelete({_id:reservationId}, (error, reservationRemoved)=>{
            if(error){
                return res.status(500).send({
                    message: "Error en la Petición",
                    status:"Error"
                });
            }
            if(!reservationRemoved){
                return res.status(404).send({
                    message: "Cliente no Eliminado",
                    status:"Error"
                });
            }
            return res.status(200).send({
                message: "Eliminado exitosamente",
                status:"Success", 
                reservation: reservationRemoved
            });
        })
        
    },

    listReservations: function(req, res){
        
        Reservation.find(function(error, doc){
            console.log(doc);
            return res.status(200).send({
                message: "Reservaciones", 
                reservations:doc
            });
        }).populate(["car","client"]);
    },

    showReservation: function(req, res){
        var reservationId = req.params.id; 
        Reservation.findById(reservationId)/* .populate(["car","client"]) */
            .exec((error, reservation)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!reservation){
                    return res.status(404).send({
                        message: "Reservación no Encontrado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Esta es una reservación", 
                    reservation
                });
            });
    }
}

module.exports = controller;