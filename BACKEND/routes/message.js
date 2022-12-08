var express = require("express");
var MessageController = require("../controllers/message");

var router = express.Router();

router.post("/save", MessageController.save);
router.post("/login", MessageController.login);
router.put("/update/:id", MessageController.update);
router.delete("/delete/:id", MessageController.delete);
router.get("/all", MessageController.listMessages);
router.get("/:id", MessageController.showMessage);


module.exports = router;
