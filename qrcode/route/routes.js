const express = require('express');
const controller = require("../controller/controllers");
const router = express.Router();

router.post('/generate-qr' , controller.generateQrBar);


module.exports = router;