const mongoose = require("mongoose");

var schema = mongoose.Schema;

var ReservationSchema = schema({
    start_date:{type: Date},
    end_date:{type: Date, default: Date.now},
    status: String,
    client: {type: schema.ObjectId, ref: "Client"},
    car:{type: schema.ObjectId, ref: "Car"}
})


module.exports = mongoose.model("Reservation", ReservationSchema);