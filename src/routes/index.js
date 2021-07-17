const express = require("express");
const router = express();
const ctrl = require("../controllers");

router.get("/:code", ctrl.redirect);
router.post("/create", ctrl.createShortUrl);

module.exports = router;
