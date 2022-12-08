var express = require("express");
var ClientController = require("../controllers/client");

var router = express.Router();

router.post("/save", ClientController.save);
router.post("/login", ClientController.login);
router.put("/update/:id", ClientController.update);
router.delete("/delete/:id", ClientController.delete);
router.get("/all", ClientController.listClients);
router.get("/:id", ClientController.showClient);


module.exports = router;
