const User = require('../models/user');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ work: true })
});

module.exports = router;
