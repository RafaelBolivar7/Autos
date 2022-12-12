const mongoose = require("mongoose");
//const Clients = require("./Clients");

var schema = mongoose.Schema;

var carSchema = schema({
    name: String,
    brand: String,
    year: String,
    description: String,
    category: String,
    reservation: {type: schema.ObjectId, ref: "Reservation"}
});

module.exports = mongoose.model("Car", carSchema);