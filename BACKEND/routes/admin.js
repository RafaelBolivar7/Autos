var express = require("express");
var AdminController = require("../controllers/admin");

var router = express.Router();

router.post("/save", AdminController.save);
router.post("/login", AdminController.login);
router.put("/update/:id", AdminController.update);
router.delete("/delete/:id", AdminController.delete);
router.get("/all", AdminController.listAdmins);
router.get("/:id", AdminController.showAdmin);


module.exports = router;
