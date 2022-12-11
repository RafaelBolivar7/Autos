var express = require("express");
var ReservationController = require("../controllers/reservation");

var router = express.Router();

router.post("/save", ReservationController.save);
router.post("/login", ReservationController.login);
router.put("/update/:id", ReservationController.update);
router.delete("/delete/:id", ReservationController.delete);
router.get("/all", ReservationController.listReservations);
router.get("/:id", ReservationController.showReservation);


module.exports = router;
