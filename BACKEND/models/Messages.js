const mongoose = require("mongoose");

var schema = mongoose.Schema;

var messageSchema = schema({
    text: String,
    client: {type: schema.ObjectId, ref: "Client"},
    car: {type: schema.ObjectId, ref: "Car"}
});

module.exports = mongoose.model("Message", messageSchema);