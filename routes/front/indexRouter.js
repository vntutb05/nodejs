const express = require('express');
const router = express.Router();
const { indexController } = require('./../controller/front/index.js');

router.route("/").get(userController.index);

module.exports = router;