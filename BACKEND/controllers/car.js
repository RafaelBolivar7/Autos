var validator = require("validator");
var Car = require("../models/Cars");

var controller = {
   
    save: function(req, res){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_brand = !validator.isEmpty(params.brand); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_year =  !validator.isEmpty(params.year);
        var validate_description =  !validator.isEmpty(params.description);
        var validate_category =  !validator.isEmpty(params.category);
       

        console.log(validate_year);

        if(validate_name && validate_brand && validate_year && validate_description && validate_category){
            var car = new Car();
            car.name = params.name;
            car.brand = params.brand;
            car.year = params.year;
            car.description = params.category;
            car.category=params.category;
           // car.reservation=params.reservation;

            console.log(car);

            car.save((error, carSaved)=> {
                if (error || !carSaved){
                    return res.status(404).send({
                        message: "El Carro no se guardó",
                        status: "ERROR"
                    });
                }
                return res.status(200).send({
                    message: "Carro Guardado"
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
        var carId = req.params.id;
        console.log(carId);

        var validate_name = !validator.isEmpty(params.name);
        var validate_brand = !validator.isEmpty(params.brand); // Los params."nombres" son igual a los de la casilla del body en postman, en este caso surname en el 
        var validate_year =  !validator.isEmpty(params.year);
        var validate_description =  !validator.isEmpty(params.description);
        var validate_category =  !validator.isEmpty(params.category);
        var validate_reservation = !validator.isEmpty(params.reservation);

        console.log(validate_year);
      
        if(validate_name && validate_brand && validate_year && validate_description && validate_category && validate_reservation){
            var car = new Car();
            
            var update = {
                name: params.name,
                brand: params.brand,
                year: params.year,
                description: params.description,
                category: params.category,
                reservation: params.reservation
            }

            Car.findOneAndUpdate({_id:carId}, update, {new:true},(error, carUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!carUpdate){
                    return res.status(404).send({
                        message: "Carro no Actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Actualizado Correctamente",
                    carUpdate
                });
            })         
        }else{
            return res.status(200).send({
                message: "Validación Incorrecta"
            });
        } 
    },

    delete: function(req, res){
        var carId = req.params.id;
        Car.findOneAndDelete({_id:carId}, (error, carRemoved)=>{
            if(error){
                return res.status(500).send({
                    message: "Error en la Petición",
                    status:"Error"
                });
            }
            if(!carRemoved){
                return res.status(404).send({
                    message: "Carro no Eliminado",
                    status:"Error"
                });
            }
            return res.status(200).send({
                message: "Eliminado exitosamente",
                status:"Success", 
                car: carRemoved
            });
        })
        
    },

    listCars: function(req, res){
        
        Car.find(function(error, doc){
            console.log(doc);
            return res.status(200).send({
                message: "Carros", 
                doc
            });
        }).populate("reservation");
    },

    showCar: function(req, res){
        var carId = req.params.id;
        Car.findById(carId).populate("reservation")
            .exec((error, car)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error en la Petición",
                        status:"Error"
                    });
                }
                if(!car){
                    return res.status(404).send({
                        message: "Carro no Encontrado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Este es un persona", 
                    car
                });
            });
    }
}

module.exports = controller;