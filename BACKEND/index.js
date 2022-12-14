const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const admin_routes = require("./routes/admin");
const client_routes = require("./routes/client");
const car_routes = require("./routes/car");
const message_routes = require("./routes/message");
const reservation_routes = require("./routes/reservation");
const port = 3000;

mongoose.Promise = global.Promise;

app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/AutosApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})
.then(()=>{
    app.use(express.json());
    app.use("/api/client",client_routes);
    app.use("/api/car", car_routes);
    app.use("/api/admin", admin_routes);
    app.use("/api/message", message_routes);
    app.use("/api/reservation", reservation_routes);
    app.listen(port, () =>{
        console.log("Servidor corriendo en el puerto", port);
    })
})
.catch(error => console.log(error));
