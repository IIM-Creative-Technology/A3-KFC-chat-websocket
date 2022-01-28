require("dotenv").config();
const User = require("../models/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

/* Users */
router.get("/", function (req, res, next) {
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, decoded) {
    User.find({})
      .lean()
      .exec(function (error, records) {
        res.status(200).json({
          users: records,
        });
      });
  });
});

module.exports = router;
