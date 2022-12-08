const mongoose = require("mongoose");

var schema = mongoose.Schema;

var clientSchema = schema({
    name: String,
    age: Number,
    email: String,
    password: String,
});

module.exports = mongoose.model("Client", clientSchema);