const mongoose = require("mongoose");
//const Clients = require("./Clients");

var schema = mongoose.Schema;

/* var ReservationSchema = schema({
    start_date:{type: Date},
    end_date:{type:Date},
    status: String,
    client: {type: schema.ObjectId, ref: "Client"}
}) */

//var Reservation = mongoose.model("Reservation", ReservationSchema);

var carSchema = schema({
    name: String,
    brand: String,
    year: String,
    description: String,
    category: String,
    reservation: {type: schema.ObjectId, ref: "Reservation"}
});

module.exports = mongoose.model("Car", carSchema);