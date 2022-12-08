var express = require("express");
var CarController = require("../controllers/car");

var router = express.Router();

router.post("/save", CarController.save);
router.post("/login", CarController.login);
router.put("/update/:id", CarController.update);
router.delete("/delete/:id", CarController.delete);
router.get("/all", CarController.listCars);
router.get("/:id", CarController.showCar);


module.exports = router;
