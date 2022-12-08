const mongoose = require("mongoose");

var schema = mongoose.Schema;

var adminSchema = schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("Admin", adminSchema);