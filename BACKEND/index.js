const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const admin_routes = require("./routes/admin");
const client_routes = require("./routes/client");
const car_routes = require("./routes/car");
const message_routes = require("./routes/message");
const port = 3000;

mongoose.Promise = global.Promise;

app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect("mongodb://localhost:27017/AutosApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})
.then(()=>{
    app.use("/api/client",client_routes);
    app.use("/api/car", car_routes);
    app.use("/api/admin", admin_routes);
    app.use("/api/message", message_routes);
    app.listen(port, () =>{
        console.log("Servidor corriendo en el puerto", port);
    })
})
.catch(error => console.log(error));
